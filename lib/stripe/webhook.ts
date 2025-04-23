import { stripe, webhookSecret } from '.';
import { Request } from 'express';

export const constructWebhookEvent = (req: Request) => {
  return stripe.webhooks.constructEvent(
    req.rawBody!,
    req.headers['stripe-signature'] as string,
    webhookSecret
  );
};