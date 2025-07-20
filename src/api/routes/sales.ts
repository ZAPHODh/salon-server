import { Router } from "express"
import { SalesController } from "../controllers/sales"

const router = Router()

router.get("/", SalesController.getAll)

router.post("/", SalesController.create)

// PUT /api/v1/sales/:id (if needed)
// router.put("/:id", SalesController.update)

// DELETE /api/v1/sales/:id (if needed)
// router.delete("/:id", SalesController.delete)

export default router
