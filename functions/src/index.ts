import * as functions from 'firebase-functions';
import * as cors from 'cors';

const corsHandler = cors({ origin: true });

export const sendEmail = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).send('Method Not Allowed');
      return;
    }

    const { firstName, lastName, email, phone, message } = request.body;

    try {
      // Create/update contact in Brevo
      const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': functions.config().brevo.key
        },
        body: JSON.stringify({
          email,
          attributes: {
            FIRSTNAME: firstName,
            LASTNAME: lastName,
            PHONE: phone || '',
            MESSAGE: message,
            SUBMITTED_AT: new Date().toISOString()
          },
          updateEnabled: true
        })
      });

      if (!contactResponse.ok) {
        throw new Error('Failed to create contact');
      }

      // Send notification email
      const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': functions.config().brevo.key
        },
        body: JSON.stringify({
          sender: {
            name: "Safina AI Website",
            email: "no-reply@safinaai.com"
          },
          to: [{
            email: "karsten@safinaai.com",
            name: "Karsten"
          }],
          replyTo: {
            email,
            name: `${firstName} ${lastName}`
          },
          subject: "New Contact Form Submission - Safina AI",
          htmlContent: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
          `
        })
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }

      response.status(200).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
      console.error('Error:', error);
      response.status(500).json({ error: 'Failed to process submission' });
    }
  });
}); 