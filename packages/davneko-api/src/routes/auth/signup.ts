import { Hono } from "hono";
import { encrypt } from "../../utils/encryption";
import type { AppContext } from "../../context";
import { db } from "@davneko/shared/database";
import { userTable } from "@davneko/shared/database/schema";
import { nanoid } from "nanoid";
import { dateStringNow } from "../../utils/date";

const app = new Hono<AppContext>().post("/signup", async (c) => {
  const body = await c.req.json();

  // パスワードのハッシュ化
  const hashedPassword = encrypt(body.password);

  const newUser: typeof userTable.$inferInsert = {
    id: nanoid(),
    email: body.email,
    password: hashedPassword,
    status: "active",
    createdAt: dateStringNow(),
    updatedAt: dateStringNow()
  };

  // ユーザーの作成
  const user = await db.insert(userTable).values(newUser).returning();

  return c.json({ user });
});

export default app;
