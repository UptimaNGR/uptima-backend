import { Router } from 'express';
import UserController from '../../../controllers/user';
import AuthController from '../../../controllers/auth';
import AuthMiddleware from '../../../middlewares/auth/basic';
import RoleMiddleware from '../../../middlewares/auth/role';
import UserMiddleware from '../../../middlewares/user';

const { addUser } = UserController;
const { signIn } = AuthController;

const {
  validateUserFields,
  checkUserEmailData,
  checkUserPhoneData,
  checkUsernameData
} = UserMiddleware;

const {
  authenticate,
  loginEmailValidator,
  validateLoginFields,
  generatePassword
} = AuthMiddleware;

const {
  adminAccessValidator
} = RoleMiddleware;

const router = Router();

router.post('/login', validateLoginFields, loginEmailValidator, signIn);

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

export default router;
