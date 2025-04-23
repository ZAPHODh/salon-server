import { stripe } from "../../../lib/stripe";


export class CheckoutService {
  static async createSession(userId: string, priceId: string) {
    return stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: userId,
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscriptions`,
      metadata: { userId }
    });
  }

  static async verifySession(sessionId: string) {
    return stripe.checkout.sessions.retrieve(sessionId);
  }
}