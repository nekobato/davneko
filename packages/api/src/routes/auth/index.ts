import { getConnInfo } from "@hono/node-server/conninfo";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { jwt, sign } from "hono/jwt";
import { nanoid } from "nanoid";
import type { AppContext } from "../../context";
import { db } from "../../database";
import {
  userAuthPasswordTable,
  userAuthRefreshTokenTable,
  userSigninHistoryTable,
  userTable
} from "../../database/schema";
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  JWT_SECRET_KEY
} from "../../env";
import { encrypt, verify } from "../../utils/encryption";
import { signInSchema } from "./index.schema";
import * as op from "drizzle-orm";

const app = new Hono<AppContext>()
  .get(
    "/status",
    jwt({
      secret: JWT_SECRET_KEY,
      cookie: {
        key: ACCESS_TOKEN_NAME
      }
    }),
    (c) => {
      // get user from jwt
      const payload = c.get("jwtPayload");

      return c.json({ user: payload });
    }
  )

  .post("/signin", zValidator("json", signInSchema), async (c) => {
    const body = await c.req.json();

    const results = await db
      .select()
      .from(userTable)
      .innerJoin(
        userAuthPasswordTable,
        op.eq(userTable.id, userAuthPasswordTable.userId)
      )
      .where(
        op.and(
          op.eq(userTable.email, body.email),
          op.eq(userTable.status, "active")
        )
      );

    const signinHistory = {
      id: nanoid(),
      email: body.email,
      ipAddress: getConnInfo(c).remote.address || "",
      createdAt: Date.now()
    };

    // User not found
    if (results.length === 0) {
      await db
        .insert(userSigninHistoryTable)
        .values({
          ...signinHistory,
          status: "failure"
        })
        .execute();

      return c.json({ message: "Invalid username or password" }, 401);
    }

    const result = results[0];

    const isVerified = verify(
      body.password,
      result.user_auth_password.password
    );

    // Password is incorrect
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

    const accessToken = await sign(
      {
        userId: result.user.id,
        expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24 hours
      },
      JWT_SECRET_KEY,
      "HS256"
    );

    const refreshToken = nanoid();

    await db.insert(userAuthRefreshTokenTable).values({
      id: nanoid(),
      userId: result.user.id,
      token: refreshToken,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
      createdAt: Date.now()
    });

    await db
      .insert(userSigninHistoryTable)
      .values({
        ...signinHistory,
        status: "success"
      })
      .execute();

    setCookie(c, ACCESS_TOKEN_NAME, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });
    setCookie(c, REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });

    return c.json({
      user: {
        id: result.user.id,
        email: result.user.email
      }
    });
  })

  .post("/signup", async (c) => {
    const body = await c.req.json();

    // パスワードのハッシュ化
    const hashedPassword = encrypt(body.password);

    const newUser: typeof userTable.$inferInsert = {
      id: nanoid(),
      email: body.email,
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    // ユーザーの作成
    const user = await db.insert(userTable).values(newUser).returning();

    const newUserAuthPassword: typeof userAuthPasswordTable.$inferInsert = {
      userId: newUser.id,
      password: hashedPassword,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    await db
      .insert(userAuthPasswordTable)
      .values(newUserAuthPassword)
      .returning();

    return c.json({ user });
  })

  .post("/refresh", async (c) => {
    const refreshToken = getCookie(c, REFRESH_TOKEN_NAME);

    if (!refreshToken) {
      return c.json({ message: "Invalid refresh token" }, 401);
    }

    const results = await db
      .select()
      .from(userAuthRefreshTokenTable)
      .where(op.eq(userAuthRefreshTokenTable.token, refreshToken));

    if (results.length === 0) {
      return c.json({ message: "Invalid refresh token" }, 401);
    }

    const result = results[0];

    if (result.revokedAt) {
      return c.json({ message: "Refresh token has been revoked" }, 401);
    }

    const accessToken = await sign(
      {
        userId: result.userId,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24 hours
      },
      JWT_SECRET_KEY,
      "HS256"
    );

    setCookie(c, ACCESS_TOKEN_NAME, accessToken);

    return c.json({ accessToken, refreshToken });
  })

  .post("/signout", async (c) => {
    await db
      .update(userAuthRefreshTokenTable)
      .set({
        revokedAt: Date.now()
      })
      .where(op.eq(userAuthPasswordTable.userId, c.get("jwtPayload").userId));

    deleteCookie(c, ACCESS_TOKEN_NAME);
    deleteCookie(c, REFRESH_TOKEN_NAME);

    return c.json({});
  });

export default app;
