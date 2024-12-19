import { Hono } from "hono";
import { googleAuth } from "@hono/oauth-providers/google";
import { JWT_SECRET_KEY } from "../../env";
import { jwt, sign } from "hono/jwt";
import { deleteCookie, setCookie } from "hono/cookie";
import type { AppContext } from "../../context";
import { verify } from "../../utils/encryption";
import { db } from "../../database/db";
import {
  userSigninHistoryTable,
  userSigninStatusEnum
} from "../../database/schema";
import { nanoid } from "nanoid";
import { getConnInfo } from "@hono/node-server/conninfo";

const app = new Hono<AppContext>()
  .get("/status", jwt({ secret: JWT_SECRET_KEY }), (c) => {
    console.log(c.env);
    return c.json({ message: "Authenticated" });
  })
  .post("/signin", async (c) => {
    const body = await c.req.json();

    const user = await db.query.userTable.findFirst({
      where(fields, op) {
        return op.and(
          op.eq(fields.email, body.email),
          op.eq(fields.status, "active")
        );
      }
    });

    const signinHistory = {
      id: nanoid(),
      email: body.email,
      userAgent: c.req.header("user-agent") || "",
      ipAddress: getConnInfo(c).remote.address || "",
      createdAt: new Date()
    };

    if (!user) {
      await db
        .insert(userSigninHistoryTable)
        .values({
          ...signinHistory,
          status: userSigninStatusEnum.enumValues[1]
        })
        .execute();

      return c.json({ message: "Invalid username or password" }, 401);
    }

    const isVerified = verify(body.password, user.password);

    if (!isVerified) {
      await db
        .insert(userSigninHistoryTable)
        .values({
          ...signinHistory,
          status: userSigninStatusEnum.enumValues[1]
        })
        .execute();

      return c.json({ message: "Invalid username or password" }, 401);
    }

    const token = await sign(
      { email: body.email, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
      JWT_SECRET_KEY,
      "HS256"
    );

    await db
      .insert(userSigninHistoryTable)
      .values({
        ...signinHistory,
        status: userSigninStatusEnum.enumValues[0]
      })
      .execute();

    setCookie(c, "nn-app", token);
    return c.json({ token });
  })
  .post("/signout", (c) => {
    deleteCookie(c, "nn-app");
    return c.json({ message: "Signed out" });
  })
  .get(
    "/google",
    googleAuth({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      scope: ["openid", "email", "profile"]
    }),
    (c) => {
      const token = c.get("token");
      const grantedScopes = c.get("granted-scopes");
      const user = c.get("user-google");

      return c.json({
        token,
        grantedScopes,
        user
      });
    }
  );

export default app;
