import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./routers";
import type { Context } from "./_core/context";
import * as notification from "./_core/notification";

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

describe("Contact Form Submission", () => {
  it("should successfully submit booking request and send notification", async () => {
    // Create a mock context
    const mockContext: Context = {
      user: null,
      req: {} as any,
      res: {} as any,
    };

    // Create a caller with the mock context
    const caller = appRouter.createCaller(mockContext);

    // Test booking data
    const bookingData = {
      name: "Test Customer",
      email: "test@example.com",
      phone: "+1 (555) 999-8888",
      company: "Test Corporation",
      serviceType: "Boardroom TSCM Sweep",
      location: "456 Test Street, Suite 100, New York, NY",
      preferredDate: "2026-01-25",
      preferredTime: "Morning (8:00 AM - 12:00 PM)",
      additionalInfo: "This is a test booking request.",
    };

    // Call the mutation
    const result = await caller.contact.submitBooking(bookingData);

    // Verify the result
    expect(result.success).toBe(true);
    expect(result.message).toBe("Booking request submitted successfully");

    // Verify notifyOwner was called
    expect(notification.notifyOwner).toHaveBeenCalledTimes(1);
    
    // Verify the notification content
    const notificationCall = vi.mocked(notification.notifyOwner).mock.calls[0][0];
    expect(notificationCall.title).toContain("Test Corporation");
    expect(notificationCall.content).toContain("Test Customer");
    expect(notificationCall.content).toContain("test@example.com");
    expect(notificationCall.content).toContain("+1 (555) 999-8888");
    expect(notificationCall.content).toContain("Boardroom TSCM Sweep");
  });

  it("should validate required fields", async () => {
    const mockContext: Context = {
      user: null,
      req: {} as any,
      res: {} as any,
    };

    const caller = appRouter.createCaller(mockContext);

    // Test with missing required fields
    const invalidData = {
      name: "",
      email: "invalid-email",
      phone: "",
      company: "",
      serviceType: "",
      location: "",
      preferredDate: "",
      preferredTime: "",
    };

    // This should throw a validation error
    await expect(
      caller.contact.submitBooking(invalidData as any)
    ).rejects.toThrow();
  });
});
