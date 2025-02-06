import { z } from "@hono/zod-openapi";

export const scanSchema = z.object({
  directory: z.string().openapi({
    example: "/home/user"
  })
});
