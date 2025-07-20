import { Router } from "express"
import { ExpensesController } from "../controllers/expenses"

const router = Router()

router.get("/", ExpensesController.getAll)

router.post("/", ExpensesController.create)

router.put("/:id", ExpensesController.update)

router.delete("/:id", ExpensesController.delete)

export default router
