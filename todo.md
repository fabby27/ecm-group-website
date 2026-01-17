# ECM Group Website TODO

## Backend API
- [x] Create contact form submission endpoint in server/routers.ts
- [x] Add email notification using notifyOwner function
- [x] Test API endpoint functionality

## Frontend Pages
- [x] Recreate Home page with TSCM services content
- [x] Create Book/Contact page with functional form
- [x] Add routing for all pages
- [x] Style pages to match original design

## Contact Form
- [x] Build contact form component with all fields
- [x] Connect form to tRPC API endpoint
- [x] Add form validation
- [x] Add success/error messages
- [x] Test form submission and email delivery

## Deployment
- [x] Test website locally
- [x] Save checkpoint
- [x] Verify emails are being received
- [x] Update documentation

## Email Integration
- [x] Research and select email API service (Resend/SendGrid/SMTP)
- [x] Add email service credentials
- [x] Create email sending function in backend
- [x] Update contact form API to send emails
- [x] Test email delivery to elitecountermeasuresgroup@gmail.com
- [x] Save checkpoint with working email notifications

## Email Debugging
- [x] Test email sending with detailed server logs
- [x] Verify Resend API is being called correctly
- [x] Check Gmail inbox and spam folder
- [x] Fix any issues preventing email delivery

## Proxy Configuration
- [x] Configure proxy to forward most routes to starksec website
- [x] Keep /book route local for working email form
- [x] Test all routes work correctly
- [x] Save checkpoint with hybrid proxy setup

## Email Delivery Issue
- [x] Submit test booking through /book form
- [x] Monitor server logs for email sending
- [x] Verify Resend API is being called
- [x] Check for any errors in email sending
- [x] Confirm user receives email in Gmail

## Proxy Routing Fix for ecm-group.org
- [ ] Update proxy configuration to handle /book route locally instead of forwarding to starksec
- [ ] Test booking form submission through ecm-group.org
- [ ] Verify email is sent when form is submitted via ecm-group.org
- [ ] Save checkpoint with working proxy routing

## Permanent Email Delivery Fix
- [ ] Diagnose why published site API calls don't reach email backend
- [ ] Fix API routing to ensure /api/trpc endpoints work on published site
- [ ] Add detailed logging to track email sending
- [ ] Test email delivery through published ecm-group.org
- [ ] Verify user receives email confirmation
- [ ] Save final checkpoint with permanent fix

## Render Deployment Fix
- [ ] Remove Manus-specific dependencies (OAuth, tRPC core) from server
- [ ] Create standalone Express server with only booking API
- [ ] Fix RESEND_API_KEY environment variable reading
- [ ] Remove OAUTH_SERVER_URL dependency
- [ ] Test locally before pushing to GitHub
- [ ] Push fixed code to GitHub
- [ ] Redeploy on Render
- [ ] Verify email functionality works on Render
