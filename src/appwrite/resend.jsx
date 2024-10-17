// src/appwrite/resend.jsx
import { Resend } from 'resend';

// Initialize Resend with API Key
const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);


// Function to send an email
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const response = await fetch('/api/emails', {  // Use the proxy path
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to,
        subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
