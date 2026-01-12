/**
 * Cloudflare Worker - Reverse Proxy for ecm-group.org
 * 
 * This worker intercepts requests to ecm-group.org and proxies them
 * to starksec-9auh3ge3.manus.space, bypassing the Error 1014 issue.
 */

const TARGET_HOST = 'starksec-9auh3ge3.manus.space';

export default {
  async fetch(request, env, ctx) {
    try {
      // Get the original URL
      const url = new URL(request.url);
      
      // Replace the hostname with the target
      url.hostname = TARGET_HOST;
      
      // Create a new request with the modified URL
      const modifiedRequest = new Request(url.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'manual'
      });
      
      // Update the Host header to match the target
      const headers = new Headers(modifiedRequest.headers);
      headers.set('Host', TARGET_HOST);
      
      // Fetch from the target server
      const response = await fetch(url.toString(), {
        method: modifiedRequest.method,
        headers: headers,
        body: modifiedRequest.body,
        redirect: 'manual'
      });
      
      // Create a new response with modified headers
      const newResponse = new Response(response.body, response);
      
      // Add CORS headers if needed
      const responseHeaders = new Headers(newResponse.headers);
      
      // Remove headers that might cause issues
      responseHeaders.delete('content-security-policy');
      responseHeaders.delete('x-frame-options');
      
      // Add custom header to indicate proxied request
      responseHeaders.set('X-Proxied-By', 'Cloudflare-Worker');
      
      return new Response(newResponse.body, {
        status: newResponse.status,
        statusText: newResponse.statusText,
        headers: responseHeaders
      });
      
    } catch (error) {
      return new Response(`Error: ${error.message}`, {
        status: 500,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
  }
};
