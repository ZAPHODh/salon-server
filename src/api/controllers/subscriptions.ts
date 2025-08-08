import { prisma } from "../../../lib/prisma";
import { asyncHandler } from "../../helper";

export const subscriptionsController = {
    getSubscription: asyncHandler(async (req, res) => {
      const { id } = req.params;
      try {
         const user = await prisma.user.findFirst({
          where: {
            id,
          },
          select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
          },
        });
        res.status(200).json(user);
      } catch  {
        res.status(500).json({ error: "Failed to retrieve subscription" });
      }
    }),
  
    updateSubscriptionAsync: asyncHandler(async (req, res) => {
      const { id } = req.params;
      const body = req.body;
     try {
      await prisma.user.update({
                where: {
                    id,
              },
                data: {
                    stripeSubscriptionId: body.subscription.id,
                    stripeCustomerId: body.subscription.customer as string,
                    stripePriceId: body.subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(
                         body.subscription.items.data[0].current_period_end! * 1000
                    ),
                 },
            });
            res.status(200).json({ message: "Subscription updated successfully" });
     } catch {
      res.status(500).json({ error: "Failed to update subscription" });
     }
  
    }),
  
    updateSubscription: asyncHandler(async (req, res) => {
      const { id } = req.params;
      const body = req.body;
      try {
          await prisma.user.update({
                where: {
                    stripeSubscriptionId: id,
                },
                data: {
                    stripePriceId: body.subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(
                        body.subscription.items.data[0].current_period_end! * 1000
                    ),
                },
            });
        res.status(200).json({ message: "Subscription updated successfully" });
      } catch {
        res.status(500).json({ error: "Failed to update subscription" });
      }
    }),
  };