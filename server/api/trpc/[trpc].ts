import { createNuxtApiHandler } from "trpc-nuxt";
import { publicProcedure, router } from "~/server/trpc/trpc";
import { sendEmailSchema } from "~/schemas/sendEmail";
import { createTransport } from "nodemailer";
import { z } from "zod";

console.log({
  host: process.env.SMTP_ENDPOINT,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const transporter = createTransport(
  z
    .object({
      host: z.string(),
      port: z.number(),
      secure: z.boolean(),
      auth: z.object({
        user: z.string(),
        pass: z.string(),
      }),
    })
    .parse({
      host: process.env.SMTP_ENDPOINT,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    }),
);

export const appRouter = router({
  sendEmail: publicProcedure
    .input(sendEmailSchema)
    .mutation(
      async ({
        input: { name, email, message, "cf-turnstile-response": cftr },
      }) => {
        console.log({ name, email, message, cftr });

        const validation = await verifyTurnstileToken(cftr);
        if (!validation.success) return { success: false };

        const success = await transporter
          .sendMail({
            from: `"${name}" <contactform@enesgenc.dev>`,
            replyTo: email,
            to: "Enes Genç <hello@enesgenc.dev>",
            subject: "enesgenc.dev Contact Form Submission",
            text: message,
          })
          .then(() => true)
          .catch(e => {
            console.error(e);
            return false;
          });

        return { success };
      },
    ),
});

export type AppRouter = typeof appRouter;

export default createNuxtApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
