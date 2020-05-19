import { Router } from 'express';
import adminRoutes from './admin';
import contactUsRoutes from './contact.us';

const router = Router();
router.use('/admin', adminRoutes);
router.use('/contact-us', contactUsRoutes);

export default router;
