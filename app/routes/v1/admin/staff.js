import { Router } from 'express';
// import AuthMiddleware from '../../../middlewares/auth/basic';
// import RoleMiddleware from '../../../middlewares/auth/role';

// const { authenticate } = AuthMiddleware;

// const {
//   adminAccessValidator,
//   ownerValidator,
//   roleValueValidator,
//   appOwnerSecureAccessValidator,
//   roleAccessValidator,
//   noStoreToSuperModify
// } = RoleMiddleware;

const router = Router();

// router.use(authenticate, adminAccessValidator);
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
// router.put(
//   '/:staffId',
//   validateId,
//   profileUpdateValidator,
//   profileUpdateCheck,
//   updateStaffById
// );
// router.patch(
//   '/:staffId',
//   validateId,
//   ownerValidator,
//   passwordUpdateValidator,
//   updateStaffPassword
// );
// router.delete(
//   '/:staffId',
//   roleAccessValidator(['super', 'store']),
//   validateId,
//   appOwnerSecureAccessValidator,
//   noStoreToSuperModify,
//   removeStaff
// );

export default router;
