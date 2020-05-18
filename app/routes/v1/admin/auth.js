import { Router } from 'express';
// import AuthMiddleware from '../../../middlewares/auth/basic';
// import RoleMiddleware from '../../../middlewares/auth/role';

// const {
//   authenticate,
//   StaffLoginEmailvalidator,
//   signUpEmailValidator,
//   validateLoginFields,
//   generatePassword
// } = AuthMiddleware;

// const {
//   roleAccessValidator,
//   adminAccessValidator,
//   roleValueValidator
// } = RoleMiddleware;

const router = Router();

// router.post(
//   '/signup',
//   authenticate,
//   adminAccessValidator,
//   roleAccessValidator(['super']),
//   roleValueValidator,
//   generatePassword,
//   signUpEmailValidator,

// );

// router.post(
//   '/login',
//   validateLoginFields,
//   StaffLoginEmailvalidator,
//   roleAccessValidator(['super', 'store'], 'user'),

// );

export default router;
