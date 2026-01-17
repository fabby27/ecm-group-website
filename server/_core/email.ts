import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RECIPIENT_EMAIL = "elitecountermeasuresgroup@gmail.com";

if (!RESEND_API_KEY) {
  console.warn("[Email] RESEND_API_KEY not configured - email notifications will not work");
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export interface BookingEmailData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  additionalInfo?: string;
}

export async function sendBookingEmail(data: BookingEmailData): Promise<boolean> {
  console.log("[Email] sendBookingEmail called with data:", { company: data.company, email: data.email });
  console.log("[Email] RESEND_API_KEY exists:", !!RESEND_API_KEY);
  console.log("[Email] Resend client initialized:", !!resend);
  
  if (!resend) {
    console.error("[Email] Resend not initialized - missing API key");
    return false;
  }

  try {
    console.log("[Email] Attempting to send email to:", RECIPIENT_EMAIL);
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
          New TSCM Booking Request
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
          <p><strong>Company:</strong> ${data.company}</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Service Details</h3>
          <p><strong>Service Type:</strong> ${data.serviceType}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
          <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
          ${data.additionalInfo ? `<p><strong>Additional Information:</strong><br/>${data.additionalInfo.replace(/\n/g, '<br/>')}</p>` : ''}
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>This booking request was submitted through ecm-group.org</p>
          <p>Please respond to the customer within 2 hours as promised on the website.</p>
        </div>
      </div>
    `;

    const { data: result, error } = await resend.emails.send({
      from: "ECM Group Bookings <bookings@ecm-group.org>",
      to: [RECIPIENT_EMAIL],
      subject: `New Booking Request from ${data.company} - ${data.serviceType}`,
      html: emailHtml,
      replyTo: data.email,
    });

    if (error) {
      console.error("[Email] Failed to send booking email:", error);
      return false;
    }

    console.log("[Email] Booking email sent successfully:", result?.id);
    return true;
  } catch (error) {
    console.error("[Email] Error sending booking email:", error);
    return false;
  }
}
