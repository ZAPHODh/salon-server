import { Router } from 'express';
import { asyncHandler } from '../../helper';
import { commissionRulesController } from '../controllers/commission-rule';


const router = Router();

router.post('/', asyncHandler(commissionRulesController.createCommissionRule));
router.get('/', asyncHandler(commissionRulesController.listCommissionRules));
router.get('/:id', asyncHandler(commissionRulesController.getCommissionRule));
router.put('/:id', asyncHandler(commissionRulesController.updateCommissionRule));
router.delete('/:id', asyncHandler(commissionRulesController.deleteCommissionRule));

export default router;