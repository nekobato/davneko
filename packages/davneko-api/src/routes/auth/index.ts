import { Hono } from "hono";
import { COOKIE_NAME, JWT_SECRET_KEY } from "../../env";
import { jwt, sign } from "hono/jwt";
import { deleteCookie, setCookie } from "hono/cookie";
import type { AppContext } from "../../context";
import { verify } from "../../utils/encryption";
import { db } from "../../database/db";
import { userSigninHistoryTable } from "../../database/schema";
import { nanoid } from "nanoid";
import { getConnInfo } from "@hono/node-server/conninfo";
import { dateStringNow } from "../../utils/date";

const app = new Hono<AppContext>()
  .get("/status", jwt({ secret: JWT_SECRET_KEY }), (c) => {
    // get user from jwt
    const payload = c.get("jwtPayload");
    return c.json({ user: payload });
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
      ipAddress: getConnInfo(c).remote.address || "",
      createdAt: dateStringNow()
    };

    if (!user) {
      await db
        .insert(userSigninHistoryTable)
        .values({
          ...signinHistory,
          status: "failure"
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
          status: "failure"
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
        status: "success"
      })
      .execute();

    setCookie(c, COOKIE_NAME, token);
    return c.json({ token, user: { ...user, password: undefined } });
  })
  .post("/signout", (c) => {
    deleteCookie(c, COOKIE_NAME);
    return c.json({});
  });

export default app;
