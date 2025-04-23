import { Request, Response } from 'express';
import { CheckoutService } from '../../services/checkout';


export class CheckoutController {
  static async create(req: Request, res: Response) {
    try {
      const session = await CheckoutService.createSession(req.user.id, req.body.priceId);
      res.json({ sessionId: session.id });
    } catch {
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  }

  static async verify(req: Request, res: Response) {
    try {
      const session = await CheckoutService.verifySession(req.body.sessionId);
      res.json(session);
    } catch {
      res.status(400).json({ error: 'Invalid session ID' });
    }
  }
}