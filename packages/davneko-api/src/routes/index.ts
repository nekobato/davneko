import { Hono } from "hono";
import authRoute from "./auth";
import adminRoute from "./admin";

const app = new Hono();

app.route("/auth", authRoute);
app.route("/admin", adminRoute);

export default app;
export type AppType = typeof app;
