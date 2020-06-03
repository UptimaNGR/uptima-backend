import { Router } from 'express';
import TankDataController from '../../../controllers/tank.data';
import TankController from '../../../controllers/tank';
import FacilityController from '../../../controllers/facility';

const { addTankData } = TankDataController;
const { addTank } = TankController;
const { addFacility } = FacilityController;

const router = Router();

router.get('/', addTankData);
router.post('/tank', addTank);
router.post('/facility', addFacility);

export default router;
