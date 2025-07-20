import { Router } from "express"
import { TransactionsController } from "../controllers/transactions"

const router = Router()

router.get("/", TransactionsController.getAll)

router.post("/", TransactionsController.create)

router.put("/:id", TransactionsController.update)

router.delete("/:id", TransactionsController.delete)

export default router
