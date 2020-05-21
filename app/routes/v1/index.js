import { Router } from 'express';
import adminRoutes from './admin';
import contactUsRoutes from './contact.us';
import companyRoutes from './company';

const router = Router();
router.use('/admin', adminRoutes);
router.use('/contact-us', contactUsRoutes);
router.use('/company', companyRoutes);

export default router;
