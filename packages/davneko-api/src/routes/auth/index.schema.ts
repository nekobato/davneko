import { z } from "@hono/zod-openapi";

export const signInSchema = z.object({
  email: z.string().min(3).openapi({
    example: "nekobato@example.com"
  }),
  password: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: "password",
        in: "path"
      },
      example: "password"
    })
});
