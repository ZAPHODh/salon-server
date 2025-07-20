import { Router } from "express"
import { PaymentMethodsController } from "../controllers/payment-method"

const router = Router()

router.get("/", PaymentMethodsController.getAll)

router.post("/", PaymentMethodsController.create)

router.put("/:id", PaymentMethodsController.update)

router.delete("/:id", PaymentMethodsController.delete)

export default router
