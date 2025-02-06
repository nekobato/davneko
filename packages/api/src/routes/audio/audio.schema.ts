import { z } from "@hono/zod-openapi";

export const GetAudioRequest = z.object({
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

export type GetAudioResponse = {
  id: string;
  type: "audio" | "podcast" | "youtube";
  path: string;
  title: string;
  track?: number;
  duration: number;
  artist: {
    id: string;
    name: string;
  };
  album?: {
    id: string;
    title: string;
  };
  directory: {
    id: string;
    path: string;
  };
};
