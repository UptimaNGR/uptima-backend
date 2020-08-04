import { Router } from 'express';
import ContactUsController from '../../../controllers/contact.us';
import ContactUsMiddleware from '../../../middlewares/contact.us';

const { addContactUsHomepage } = ContactUsController;
const {
  validateContactUsHomepageFields
} = ContactUsMiddleware;

const router = Router();

router.post('/', validateContactUsHomepageFields, addContactUsHomepage);
export default router;
