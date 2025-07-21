// routes/stripe.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { evento } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: evento.titulo,
            description: evento.descripcion,
            images: [evento.imagen],
          },
          unit_amount: Math.round(evento.precio * 100), // dólares a centavos
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:4200/success',
      cancel_url: 'http://localhost:4200/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creando sesión de pago:', error);
    res.status(500).json({ error: 'Error creando sesión de pago' });
  }
});

module.exports = router;
