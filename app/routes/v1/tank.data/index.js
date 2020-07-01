import { Router } from 'express';
import TankDataController from '../../../controllers/tank.data';
import TankDataMiddleware from '../../../middlewares/tank.data';

const { addTankData } = TankDataController;
const {
  fetchDeviceBySerialNumber,
  checkMinLevel,
  checkOperationTime,
  checkTank,
  checkVolume
} = TankDataMiddleware;

const router = Router();

router.post(
  '/',
  fetchDeviceBySerialNumber,
  checkTank,
  checkVolume,
  checkOperationTime,
  checkMinLevel,
  addTankData
);

export default router;
