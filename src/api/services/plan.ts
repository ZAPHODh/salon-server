import Stripe from "stripe";
import { stripe } from "../../../lib/stripe";


export class PlanService {
  static async getActivePlans() {
    const prices = await stripe.prices.list({
      expand: ['data.product'],
      active: true,
      type: 'recurring'
    });

    return prices.data.map(price => ({
      id: price.id,
      name: (price.product as Stripe.Product).name,
      price: price.unit_amount,
      interval: price.recurring?.interval,
      currency: price.currency
    }));
  }
}