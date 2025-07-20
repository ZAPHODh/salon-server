import { Router } from "express"
import { FinanceController } from "../controllers/finance"

const router = Router()

router.get("/summary", FinanceController.get)


export default router
