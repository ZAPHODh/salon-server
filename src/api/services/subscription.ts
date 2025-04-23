import Stripe from "stripe";
import { prisma } from "../../../lib/prisma";
import { stripe } from "../../../lib/stripe";


export class SubscriptionService {
  static async updateUserSubscription(subscription: Stripe.Subscription) {
    await prisma.user.updateMany({
      where: { subscriptionId: subscription.id },
      data: {
        subscriptionStatus: subscription.status,
        subscriptionRole: subscription.items.data[0].price.nickname || null
      }
    });
  }

  static async cancelSubscription(subscriptionId: string) {
    return stripe.subscriptions.cancel(subscriptionId);
  }
}