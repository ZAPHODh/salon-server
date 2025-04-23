// controllers/stripe/plans.ts
import { Request, Response } from 'express';
import { stripe } from '../../../../lib/stripe';


export class PlansController {
  static async listPrices(req: Request, res: Response) {
    try {
      const prices = await stripe.prices.list({
        lookup_keys: ['mensal', 'anual'], 
        expand: ['data.product']
      });
      res.json(prices);
    } catch {
      res.status(500).json({ error: 'Cannot fetch prices' });
    }
  }
}
