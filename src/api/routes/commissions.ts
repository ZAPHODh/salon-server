import { Router } from "express"
import { CommissionsController } from "../controllers/commission"

const router = Router()

router.get("/", CommissionsController.getAll)
router.post("/", CommissionsController.create)

// PUT /api/v1/commissions/:id (if needed)
router.put("/:id", CommissionsController.update)

// DELETE /api/v1/commissions/:id (if needed)
router.delete("/:id", CommissionsController.delete)

export default router
