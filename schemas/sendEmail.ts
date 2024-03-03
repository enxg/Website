import * as z from "zod";

export const sendEmailSchema = z.object({
  "name": z.string().min(1).max(50),
  "email": z.string().email().max(100),
  "message": z.string().min(1).max(500),
  "cf-turnstile-response": z.string(),
});
