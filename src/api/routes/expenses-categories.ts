import { Router } from "express"
import { ExpenseCategoriesController } from "../controllers/expense-categories"

const router = Router()

router.get("/", ExpenseCategoriesController.getAll)

router.post("/", ExpenseCategoriesController.create)

router.put("/:id", ExpenseCategoriesController.update)

router.delete("/:id", ExpenseCategoriesController.delete)

export default router
