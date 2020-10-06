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
import LogController from '../../../controllers/log';
import UserMiddleware from '../../../middlewares/user';
import RequestController from '../../../controllers/request';
import RequestMiddleware from '../../../middlewares/request';

const {
  addCompany,
  fetchAllCompany,
  updateCompanyProfile,
  getCompanyProfile,
  getCompanyUserProfile,
  editCompanyUserRole,
  deleteUserFromCompany
} = CompanyController;
const {
  validateCompanyFields,
  checkCompanyEmailData,
  checkCompanyPhoneData,
  checkCompanyIdData,
  checkIfCompanyIdPresent
} = CompanyMiddleware;

const {
  addTank,
  fetchTankByFacilityId,
  updateTankById,
  fetchTankById,
  updateTankPriceById
} = TankController;
const {
  validateTankFields,
  calcTotalTankVolume,
  checkIfSerialNumberExistsInFacility,
  checkTankById,
  checkIfTankIdPresent
} = TankMiddleware;

const {
  validateFacilityFields,
  fetchFacilityBasedOnAccess,
  checkFacilityById,
  checkIfFacilityIdPresent
} = FacilityMiddleware;
const {
  addFacility,
  fetchAllFacility,
  updateFacilityById,
  fetchFacilityById,
  updateFacilityCloseAndOpenTimeById
} = FacilityController;

const { fetchTankDataByTankIdDaily } = TankDataController;

const { addDevice, updateDeviceById, fetchDeviceById } = DeviceController;
const {
  validateDeviceFields,
  checkIfSerialNumberExists,
  checkIfTankHasDevice,
  checkIfDeviceIdPresent
} = DeviceMiddleware;

const { fetchLoginLog } = LogController;
const { checkUserIdData } = UserMiddleware;

const { addComplaint, addExpansion } = RequestController;
const { validateComplaintFields, validateExpansionFields } = RequestMiddleware;

const { authenticate } = AuthMiddleware;
const { adminAccessValidator } = RoleMiddleware;

const router = Router();

router.use(authenticate);
router.use('/:companyId', checkIfCompanyIdPresent, checkCompanyIdData);
router.use(
  '/:companyId/facility/:facilityId',
  checkIfFacilityIdPresent,
  checkFacilityById
);
router.use(
  '/:companyId/facility/:facilityId/tank/:tankId',
  checkIfTankIdPresent,
  checkTankById
);
router.use(
  '/:companyId/facility/:facilityId/tank/:tankId/device/:deviceId',
  checkIfDeviceIdPresent,
  checkIfTankHasDevice
);
router.use('/:companyId/user/:userId', checkUserIdData);
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
router.get('/:companyId/facility/:facilityId', fetchFacilityById);
router.put('/:companyId/facility/:facilityId', updateFacilityById);
router.patch(
  '/:companyId/facility/:facilityId',
  updateFacilityCloseAndOpenTimeById
);

router.post(
  '/:companyId/facility/:facilityId/tank',
  adminAccessValidator,
  validateTankFields,
  calcTotalTankVolume,
  checkIfSerialNumberExistsInFacility,
  addTank
);
router.get('/:companyId/facility/:facilityId/tank', fetchTankByFacilityId);
router.get('/:companyId/facility/:facilityId/tank/:tankId', fetchTankById);
router.put(
  '/:companyId/facility/:facilityId/tank/:tankId',
  adminAccessValidator,
  updateTankById
);
router.patch(
  '/:companyId/facility/:facilityId/tank/:tankId',
  updateTankPriceById
);

router.get(
  '/:companyId/facility/:facilityId/tank/:tankId/tank-data/daily',
  fetchTankDataByTankIdDaily
);

router.post(
  '/:companyId/facility/:facilityId/tank/:tankId/device',
  adminAccessValidator,
  validateDeviceFields,
  checkIfSerialNumberExists,
  addDevice
);
router.get(
  '/:companyId/facility/:facilityId/tank/:tankId/device/:deviceId',
  fetchDeviceById
);
router.put(
  '/:companyId/facility/:facilityId/tank/:tankId/device/:deviceId',
  adminAccessValidator,
  updateDeviceById
);

router.get('/:companyId/log', fetchLoginLog);
router.get('/:companyId/user', getCompanyUserProfile);
router.patch('/:companyId/user/:userId/role', editCompanyUserRole);
router.delete('/:companyId/user/:userId', deleteUserFromCompany);

router.post('/:companyId/request/expansion', validateExpansionFields, addExpansion);
router.post('/:companyId/request/complaint', validateComplaintFields, addComplaint);

export default router;
