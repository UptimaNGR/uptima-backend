import { Router } from 'express';
import CompanyController from '../../../controllers/company';
import CompanyMiddleware from '../../../middlewares/company';
import FacilityController from '../../../controllers/facility';
import FacilityMiddleware from '../../../middlewares/facility';
import TankController from '../../../controllers/tank';
import TankMiddleware from '../../../middlewares/tank';
import TankDataController from '../../../controllers/tank.data';
import DeviceController from '../../../controllers/device';
import DeviceMiddleware from '../../../middlewares/device';
import AuthMiddleware from '../../../middlewares/auth/basic';
import RoleMiddleware from '../../../middlewares/auth/role';

const {
  addCompany,
  fetchAllCompany,
  updateCompanyProfile,
  getCompanyProfile
} = CompanyController;
const {
  validateCompanyFields,
  checkCompanyEmailData,
  checkCompanyPhoneData,
  checkCompanyIdData
} = CompanyMiddleware;

const { addTank, fetchTankByFacilityId } = TankController;
const {
  validateTankFields,
  calcTotalTankVolume,
  checkIfSerialNumberExistsInFacility,
  fetchTankById
} = TankMiddleware;

const {
  validateFacilityFields,
  fetchFacilityBasedOnAccess,
  fetchFacilityById
} = FacilityMiddleware;
const { addFacility, fetchAllFacility } = FacilityController;

const { fetchTankDataByTankIdDaily } = TankDataController;

const { addDevice } = DeviceController;
const {
  validateDeviceFields,
  checkIfSerialNumberExists,
  checkIfTankHasDevice
} = DeviceMiddleware;

const { authenticate } = AuthMiddleware;
const { adminAccessValidator } = RoleMiddleware;

const router = Router();

router.use(authenticate);
router.use('/:companyId', checkCompanyIdData);
router.use('/:companyId/facility/:facilityId', fetchFacilityById);
router.use('/:companyId/facility/:facilityId/tank/:tankId', fetchTankById);

router.post(
  '/',
  adminAccessValidator,
  validateCompanyFields,
  checkCompanyEmailData,
  checkCompanyPhoneData,
  addCompany
);
router.get('/', adminAccessValidator, fetchAllCompany);
router.get('/:companyId', getCompanyProfile);
router.put('/:companyId', adminAccessValidator, updateCompanyProfile);

router.post(
  '/:companyId/facility',
  adminAccessValidator,
  validateFacilityFields,
  addFacility
);
router.get(
  '/:companyId/facility',
  fetchFacilityBasedOnAccess,
  fetchAllFacility
);

router.post(
  '/:companyId/facility/:facilityId/tank',
  adminAccessValidator,
  checkIfSerialNumberExistsInFacility,
  calcTotalTankVolume,
  validateTankFields,
  addTank
);
router.get('/:companyId/facility/:facilityId/tank', fetchTankByFacilityId);

router.get(
  '/:companyId/facility/:facilityId/tank/:tankId/tank-data/daily',
  fetchTankDataByTankIdDaily
);

router.post(
  '/:companyId/facility/:facilityId/tank/:tankId/device',
  adminAccessValidator,
  validateDeviceFields,
  checkIfTankHasDevice,
  checkIfSerialNumberExists,
  addDevice
);

export default router;
