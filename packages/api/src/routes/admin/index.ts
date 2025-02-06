import { Hono } from "hono";
import { JWT_SECRET_KEY } from "../../env";
import { jwt } from "hono/jwt";
import type { AppContext } from "../../context";
import { zValidator } from "@hono/zod-validator";
import { scanSchema } from "./index.schema";
import { scanAudioFiles } from "./lib/scan";

const app = new Hono<AppContext>()
  .all("/*", jwt({ secret: JWT_SECRET_KEY }))
  .post("/scan", zValidator("form", scanSchema), async (c) => {
    const body = await c.req.json();
    c.executionCtx.waitUntil(scanAudioFiles(body.directory));

    return c.json({ message: "Scanning..." });
  });

export default app;
