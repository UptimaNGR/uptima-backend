import { Router } from 'express';
import ContactUsController from '../../../controllers/contact.us';
import ContactUsMiddleware from '../../../middlewares/contact.us';

const { addContactUs, getUnavailableItems } = ContactUsController;
const { validateContactUsFields } = ContactUsMiddleware;

const router = Router();

router.post('/', validateContactUsFields, addContactUs);
router.get('/', getUnavailableItems);
export default router;
