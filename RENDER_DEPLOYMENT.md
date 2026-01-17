# Deploy ECM Group Booking Form to Render

This guide will help you deploy the ECM Group website with working email notifications to Render.

## Prerequisites

- Render account (free tier works)
- GitHub account
- Resend API key: `re_2WevK16b_NzssT2TGB8UHn6D9KWuLibuv`

## Step 1: Push Code to GitHub

1. Create a new GitHub repository (e.g., `ecm-group-website`)
2. Push this code to GitHub:

```bash
cd /home/ubuntu/ecm-group-proxy
git init
git add .
git commit -m "Initial commit with booking form and email integration"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ecm-group-website.git
git push -u origin main
```

## Step 2: Deploy to Render

1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** `ecm-group-proxy` (or any name you prefer)
   - **Environment:** `Node`
   - **Build Command:** `pnpm install && pnpm run build`
   - **Start Command:** `node dist/index.js`
   - **Instance Type:** Free

5. Add environment variable:
   - Click **"Advanced"** → **"Add Environment Variable"**
   - **Key:** `RESEND_API_KEY`
   - **Value:** `re_2WevK16b_NzssT2TGB8UHn6D9KWuLibuv`

6. Click **"Create Web Service"**

## Step 3: Update Cloudflare DNS

After Render deploys your service, you'll get a URL like `ecm-group-proxy.onrender.com`

1. Go to Cloudflare DNS settings for ecm-group.org
2. Find the CNAME record for `ecm-group.org`
3. Update the **Content** field to your new Render URL
4. Keep **Proxy status** as "DNS only" (gray cloud)
5. Save

## Step 4: Test

1. Wait 2-3 minutes for DNS to propagate
2. Visit https://ecm-group.org/book
3. Fill out and submit the booking form
4. Check elitecountermeasuresgroup@gmail.com for the email

## Troubleshooting

### Email not sending
- Check Render logs: Dashboard → Your Service → Logs
- Verify RESEND_API_KEY is set correctly in Render environment variables
- Confirm ecm-group.org is verified in Resend dashboard

### Website not loading
- Check Render deployment status (should show "Live")
- Verify Cloudflare CNAME points to correct Render URL
- Check Render logs for errors

### Cloudflare Error 1014
- Ensure Proxy status is "DNS only" (gray cloud), not "Proxied" (orange cloud)

## Files Modified

- `server/index.ts` - Added `/api/booking` endpoint with Resend email integration
- `client/src/pages/Book.tsx` - Updated to use REST API instead of tRPC
- `package.json` - Added `resend` package
- `render.yaml` - Render deployment configuration

## Email Configuration

- **From:** bookings@ecm-group.org
- **To:** elitecountermeasuresgroup@gmail.com
- **Domain verified in Resend:** ecm-group.org
- **DNS records required:** MX, TXT (resend._domainkey), TXT (send) - already configured in Cloudflare

## Support

If you encounter issues, check:
1. Render deployment logs
2. Browser console for frontend errors
3. Resend dashboard for email delivery status
