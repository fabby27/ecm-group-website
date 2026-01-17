import { describe, it, expect } from "vitest";
import { sendBookingEmail } from "./_core/email";

describe("Email Notification", () => {
  it("should send booking email to Gmail using Resend", async () => {
    const testBookingData = {
      name: "Test Customer",
      email: "test@example.com",
      phone: "+1 (555) 999-8888",
      company: "Test Corporation",
      serviceType: "Boardroom TSCM Sweep",
      location: "456 Test Street, Suite 100, New York, NY",
      preferredDate: "2026-01-25",
      preferredTime: "Morning (8:00 AM - 12:00 PM)",
      additionalInfo: "This is a test booking to verify email delivery.",
    };

    // Send the email
    const result = await sendBookingEmail(testBookingData);

    // Verify the email was sent successfully
    expect(result).toBe(true);
  }, 30000); // 30 second timeout for email API call
});
