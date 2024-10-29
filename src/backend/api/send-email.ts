import { Request, Response } from 'express';

export const sendEmail = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, message } = req.body;

  console.log('Received request body:', req.body); // Debug log

  try {
    // Create/update contact in Brevo
    const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || ''
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

    const contactData = await contactResponse.json();
    console.log('Brevo contact response:', contactData); // Debug log

    if (!contactResponse.ok) {
      console.error('Brevo Contact API Error:', contactData);
      return res.status(500).json({ 
        error: 'Failed to create contact',
        details: contactData
      });
    }

    // Send notification email
    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || ''
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
      const errorData = await emailResponse.json();
      console.error('Brevo Email API Error:', errorData);
      throw new Error(errorData.message || 'Failed to send email');
    }

    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Failed to process contact form submission' });
  }
}; 