import { Router } from 'express';
import AuthController from '../../../controllers/auth';
import AuthMiddleware from '../../../middlewares/auth/basic';
import RoleMiddleware from '../../../middlewares/auth/role';
import UserController from '../../../controllers/user';
import UserMiddleware from '../../../middlewares/user';

const { addUser, updateUserPassword } = UserController;
const { signIn, resetPassword } = AuthController;

const {
  validateUserFields,
  checkUserEmailData,
  checkUserPhoneData,
  checkUsernameData,
  validateResetPasswordField,
  validateUserPasswordField
} = UserMiddleware;

const {
  authenticate,
  emailValidator,
  loginEmailValidator,
  validateLoginFields,
  generatePassword,
  generateToken,
  compareUserPassword
} = AuthMiddleware;

const { adminAccessValidator } = RoleMiddleware;

const router = Router();

router.post(
  '/login',
  validateLoginFields,
  loginEmailValidator,
  compareUserPassword,
  signIn
);

router.post(
  '/signup',
  authenticate,
  adminAccessValidator,
  validateUserFields,
  checkUserEmailData,
  checkUserPhoneData,
  checkUsernameData,
  generatePassword,
  addUser
);

router.post(
  '/reset-password',
  validateResetPasswordField,
  emailValidator,
  generateToken,
  resetPassword
);

router.patch(
  '/reset-password',
  authenticate,
  validateUserPasswordField,
  updateUserPassword
);

export default router;
