import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import type { AppContext } from "./context";
import authRoute from "./routes/auth";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { trimTrailingSlash } from "hono/trailing-slash";

export const app = new Hono<AppContext>();

app.use(cors());
app.use(compress());
app.use(logger());
app.use(trimTrailingSlash());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.route("/auth", authRoute);

const port = 3000;

serve({
  fetch: app.fetch,
  port
});
