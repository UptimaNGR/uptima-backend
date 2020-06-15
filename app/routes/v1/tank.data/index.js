import { Router } from 'express';
import TankDataController from '../../../controllers/tank.data';
import TankDataMiddleware from '../../../middlewares/tank.data';

const { addTankData } = TankDataController;
const { fetchDeviceBySerialNumber } = TankDataMiddleware;

const router = Router();

router.get('/', fetchDeviceBySerialNumber, addTankData);


export default router;
