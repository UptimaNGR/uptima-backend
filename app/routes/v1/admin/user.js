import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/auth/basic';
import UserController from '../../../controllers/user';
import UserMiddleware from '../../../middlewares/user';
import RoleMiddleware from '../../../middlewares/auth/role';

const { authenticate } = AuthMiddleware;
const { updateUserPassword, updateUserProfile } = UserController;
const { checkUserIdData, validateUserPasswordField } = UserMiddleware;

const { ownerValidator } = RoleMiddleware;

const router = Router();

router.use(authenticate);

router.patch(
  '/:userId',
  ownerValidator,
  checkUserIdData,
  validateUserPasswordField,
  updateUserPassword
);

router.put('/:userId', checkUserIdData, updateUserProfile);

// profileUpdateValidator,
// profileUpdateCheck,

// router.get('/', fetchStaffs);
// router.patch(
//   '/:staffId/access',
//   roleAccessValidator(['super']),
//   validateId,
//   appOwnerSecureAccessValidator,
//   accessValueValidator,
//   updateStaffAccess
// );
// router.patch(
//   '/:staffId/role',
//   roleAccessValidator(['super']),
//   validateId,
//   appOwnerSecureAccessValidator,
//   roleValueValidator,
//   updateRole
// );
// router.patch(
//   '/:staffId/location',
//   roleAccessValidator(['super']),
//   validateId,
//   appOwnerSecureAccessValidator,
//   validateLocationId('body'),
//   locationExistValidator('body'),
//   updateStaffLocation
// );
// router.get('/:staffId', validateId, fetchStaff);

// router.delete(
//   '/:staffId',
//   roleAccessValidator(['super', 'store']),
//   validateId,
//   appOwnerSecureAccessValidator,
//   noStoreToSuperModify,
//   removeStaff
// );

export default router;
