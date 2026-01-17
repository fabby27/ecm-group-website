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
- [ ] Save checkpoint with hybrid proxy setup
