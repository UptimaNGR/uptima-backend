import { Router } from 'express';
import TankDataController from '../../../controllers/tank.data';

const { addTankData } = TankDataController;

const router = Router();


router.get('/', addTankData);
export default router;
