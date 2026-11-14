import { z } from "zod";

export const newPostSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters.").max(100),
  body: z.string().trim().min(10, "Body must be at least 10 characters.").max(500),
});