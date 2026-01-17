import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON bodies
  app.use(express.json());

  // Initialize Resend
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Booking API endpoint
  app.post("/api/booking", async (req, res) => {
    try {
      console.log("[Booking API] Received booking request:", JSON.stringify(req.body, null, 2));

      const { name, email, phone, company, serviceType, location, preferredDate, preferredTime, additionalInfo } = req.body;

      // Validate required fields
      if (!name || !email || !phone || !company || !serviceType || !location || !preferredDate || !preferredTime) {
        console.log("[Booking API] Validation failed - missing required fields");
        return res.status(400).json({ 
          success: false, 
          error: "All required fields must be filled" 
        });
      }

      console.log("[Booking API] Attempting to send email via Resend...");

      // Send email via Resend
      const emailResult = await resend.emails.send({
        from: "ECM Group Booking <bookings@ecm-group.org>",
        to: "elitecountermeasuresgroup@gmail.com",
        subject: `New TSCM Sweep Booking Request from ${company}`,
        html: `
          <h2>New Booking Request</h2>
          <p><strong>Client Information:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Company:</strong> ${company}</li>
          </ul>
          <p><strong>Service Details:</strong></p>
          <ul>
            <li><strong>Service Type:</strong> ${serviceType}</li>
            <li><strong>Location:</strong> ${location}</li>
            <li><strong>Preferred Date:</strong> ${preferredDate}</li>
            <li><strong>Preferred Time:</strong> ${preferredTime}</li>
          </ul>
          ${additionalInfo ? `<p><strong>Additional Information:</strong><br>${additionalInfo}</p>` : ''}
          <hr>
          <p><em>This booking was submitted via ecm-group.org/book</em></p>
        `,
      });

      console.log("[Booking API] Email sent successfully:", JSON.stringify(emailResult, null, 2));

      res.json({ 
        success: true, 
        message: "Booking request submitted successfully" 
      });
    } catch (error) {
      console.error("[Booking API] Error processing booking:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to submit booking request" 
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
