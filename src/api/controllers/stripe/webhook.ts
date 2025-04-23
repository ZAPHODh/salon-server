import { Request, Response } from 'express';
import { constructWebhookEvent } from '../../../../lib/stripe/webhook';
import { SubscriptionService } from '../../services/subscription';
import Stripe from 'stripe';


export class WebhookController {
  static async handle(req: Request, res: Response) {
    try {
      const event = constructWebhookEvent(req);
      
      switch (event.type) {
        case 'customer.subscription.updated':
          await SubscriptionService.updateUserSubscription(event.data.object as Stripe.Subscription);
          break;
        case 'customer.subscription.deleted':
          await SubscriptionService.updateUserSubscription(event.data.object as Stripe.Subscription);
          break;
      }

      res.status(200).json({ received: true });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }
}