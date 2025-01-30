import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import type { AppContext } from "./context";
import appRoutes from "./routes";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { trimTrailingSlash } from "hono/trailing-slash";

export const app = new Hono<AppContext>();

app.use(cors());
app.use(compress());
app.use(logger());
app.use(trimTrailingSlash());

app.route("/", appRoutes);

const port = 3001;

serve({
  fetch: app.fetch,
  port
});
