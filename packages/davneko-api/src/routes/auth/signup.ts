import { Hono } from "hono";
import { encrypt } from "../../utils/encryption";
import type { AppContext } from "../../context";
import { db } from "../../database/db";
import { userStatusEnum, userTable } from "../../database/schema";
import { nanoid } from "nanoid";

const app = new Hono<AppContext>().post("/signup", async (c) => {
  const body = await c.req.json();

  // パスワードのハッシュ化
  const hashedPassword = encrypt(body.password);

  const newUser = {
    id: nanoid(),
    username: body.username,
    email: body.email,
    password: hashedPassword,
    status: userStatusEnum.enumValues[0],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // ユーザーの作成
  const users = await db.insert(userTable).values(newUser).execute();

  return c.json({ message: "User created", users });
});

export default app;
