import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/auth/basic';
import RoleMiddleware from '../../../middlewares/auth/role';
import ContactUsController from '../../../controllers/contact.us';
import ContactUsMiddleware from '../../../middlewares/contact.us';

const { addContactUs, fetchContactUs } = ContactUsController;
const {
  validateContactUsFields,
  facilityTypeValueValidator
} = ContactUsMiddleware;
const { authenticate } = AuthMiddleware;
const { adminAccessValidator } = RoleMiddleware;

const router = Router();

router.post(
  '/',
  validateContactUsFields,
  facilityTypeValueValidator,
  addContactUs
);
router.get('/', authenticate, adminAccessValidator, fetchContactUs);
export default router;
