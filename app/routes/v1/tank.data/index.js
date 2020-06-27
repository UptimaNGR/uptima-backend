import { Router } from 'express';
import TankDataController from '../../../controllers/tank.data';
import TankDataMiddleware from '../../../middlewares/tank.data';

const { addTankData } = TankDataController;
const { fetchDeviceBySerialNumber } = TankDataMiddleware;

const router = Router();

router.post('/', fetchDeviceBySerialNumber, addTankData);


export default router;
