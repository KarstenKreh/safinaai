const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

app.post('/create-checkout-session', async (req, res) => {
  const { planName } = req.body;
  
  // Define your product IDs in Stripe
  const PRODUCT_IDS = {
    'Mini': 'price_1234567890',
    'Basic': 'price_2345678901',
    'Pro': 'price_3456789012'
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: PRODUCT_IDS[planName],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.DOMAIN}/success`,
      cancel_url: `${process.env.DOMAIN}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
