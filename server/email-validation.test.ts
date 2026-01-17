import { describe, it, expect } from 'vitest';
import { sendBookingEmail } from './server/_core/email';

describe('Email Service Validation', () => {
  it('should successfully send booking email with valid API key', async () => {
    const testBookingData = {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Test Corp',
      serviceType: 'Boardroom TSCM Sweep',
      location: '123 Test St, City, State',
      preferredDate: '2026-01-25',
      preferredTime: 'Morning (8:00 AM - 12:00 PM)',
      additionalInfo: 'Test booking to validate email integration'
    };

    const result = await sendBookingEmail(testBookingData);
    
    expect(result).toBe(true);
  }, 15000); // 15 second timeout for API call
});
