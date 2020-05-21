import { Router } from 'express';
import ContactUsController from '../../../controllers/contact.us';
import ContactUsMiddleware from '../../../middlewares/contact.us';

const { addContactUs, fetchContactUs } = ContactUsController;
const { validateContactUsFields } = ContactUsMiddleware;

const router = Router();

router.post('/', validateContactUsFields, addContactUs);
router.get('/', fetchContactUs);
export default router;
