import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/auth/basic';
import RoleMiddleware from '../../../middlewares/auth/role';
import ContactUsController from '../../../controllers/contact.us';
import ContactUsMiddleware from '../../../middlewares/contact.us';

const { addContactUs, fetchContactUs, addContactUsHomepage } = ContactUsController;
const {
  validateContactUsFields,
  facilityTypeValueValidator,
  validateContactUsHomepageFields
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
router.post('/home', validateContactUsHomepageFields, addContactUsHomepage);
export default router;
