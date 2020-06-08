import { Router } from 'express';
import TankDataController from '../../../controllers/tank.data';
import TankController from '../../../controllers/tank';
import FacilityController from '../../../controllers/facility';
import TankMiddleware from '../../../middlewares/tank';
import DeviceController from '../../../controllers/device';
import DeviceMiddleware from '../../../middlewares/device';
import FacilityMiddleware from '../../../middlewares/facility';

const { addTankData } = TankDataController;
const { addTank } = TankController;
const { addFacility } = FacilityController;
const { addDevice } = DeviceController;

const router = Router();

router.get('/', addTankData);
router.post('/tank', TankMiddleware.validateTankFields, addTank);
router.post(
  '/facility',
  FacilityMiddleware.validateFacilityFields,
  addFacility
);
router.post('/device', DeviceMiddleware.validateDeviceFields, addDevice);

export default router;
