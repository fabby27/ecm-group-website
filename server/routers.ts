import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Contact form submission endpoint
  contact: router({
    submitBooking: publicProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string(),
          company: z.string(),
          serviceType: z.string(),
          location: z.string(),
          preferredDate: z.string(),
          preferredTime: z.string(),
          additionalInfo: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Send notification email to owner
        const emailContent = `
New Booking Request Received!

📋 Contact Information:
━━━━━━━━━━━━━━━━━━━━
Name: ${input.name}
Email: ${input.email}
Phone: ${input.phone}
Company: ${input.company}

🔧 Service Details:
━━━━━━━━━━━━━━━━━━━━
Service Type: ${input.serviceType}
Location: ${input.location}
Preferred Date: ${input.preferredDate}
Preferred Time: ${input.preferredTime}

💬 Additional Information:
━━━━━━━━━━━━━━━━━━━━
${input.additionalInfo || 'None provided'}

━━━━━━━━━━━━━━━━━━━━
Please respond to this customer within 2 hours as promised on the website.
        `;

        try {
          await notifyOwner({
            title: `🚨 New Booking: ${input.company}`,
            content: emailContent,
          });

          return {
            success: true,
            message: "Booking request submitted successfully",
          };
        } catch (error) {
          console.error("Failed to send notification:", error);
          throw new Error("Failed to submit booking request. Please try again or email us directly.");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
