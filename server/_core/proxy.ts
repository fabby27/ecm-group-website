/**
 * Reverse Proxy for ecm-group.org → starksec-9auh3ge3.manus.space
 * 
 * This module handles proxying all requests to the target Manus website,
 * bypassing Cloudflare Error 1014 (CNAME Cross-User Banned).
 */

import type { Request, Response } from "express";
import axios from "axios";

const TARGET_HOST = "starksec-9auh3ge3.manus.space";
const TARGET_URL = `https://${TARGET_HOST}`;

export async function handleProxyRequest(req: Request, res: Response) {
  try {
    // Build the target URL with the original path and query string
    const targetUrl = `${TARGET_URL}${req.url}`;

    console.log(`[Proxy] ${req.method} ${req.url} -> ${targetUrl}`);

    // Forward the request to the target server
    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: {
        ...req.headers,
        host: TARGET_HOST, // Override host header
        "x-forwarded-for": req.ip,
        "x-forwarded-proto": req.protocol,
        "x-forwarded-host": req.get("host") || "",
        // Remove headers that might cause issues
        "accept-encoding": "identity", // Disable compression to allow content modification
      },
      data: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
      responseType: "arraybuffer", // Get raw buffer to handle all content types
      validateStatus: () => true, // Accept all status codes
      maxRedirects: 0, // Handle redirects manually
      timeout: 30000, // 30 second timeout
    });

    // Copy response headers
    Object.entries(response.headers).forEach(([key, value]) => {
      // Skip headers that shouldn't be forwarded
      const lowerKey = key.toLowerCase();
      if (
        lowerKey === "transfer-encoding" ||
        lowerKey === "connection" ||
        lowerKey === "content-encoding" ||
        lowerKey === "content-security-policy" || // Remove CSP that might block resources
        lowerKey === "x-frame-options" // Remove frame options
      ) {
        return;
      }
      if (value) {
        res.setHeader(key, value);
      }
    });

    // Add custom header to indicate proxied request
    res.setHeader("X-Proxied-By", "ECM-Group-Proxy");

    // Set status code
    res.status(response.status);

    // Send the response body
    res.send(response.data);
  } catch (error) {
    console.error("[Proxy Error]", error);
    if (axios.isAxiosError(error)) {
      console.error("[Proxy Error Details]", {
        message: error.message,
        code: error.code,
        url: error.config?.url,
      });
    }
    res.status(500).send("Proxy Error: Unable to reach target server");
  }
}
