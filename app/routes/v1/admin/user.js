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

export default router;
