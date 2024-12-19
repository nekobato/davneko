import { Hono } from "hono";
import Stripe from "stripe";
import type { AppContext } from "../../context";

const app = new Hono<AppContext>().post("/create-setup-intent", async (c) => {
  const stripe = new Stripe("sk_test_BKJtahHqbn9tE1LZVEgaqUIt006ubYFb4N");

  try {
    const setupIntent = await stripe.setupIntents.create();
    return c.json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    return c.json({ error }, 500);
  }
});

export default app;
