import { Router } from 'express';
import adminRoutes from './admin';
import contactUsRoutes from './contact.us';
import companyRoutes from './company';
import tankDataRoutes from './tank.data';
import contactUsHomepageRoutes from './contact.us.homepage';

const router = Router();
router.use('/admin', adminRoutes);
router.use('/contact-us', contactUsRoutes);
router.use('/company', companyRoutes);
router.use('/tank-data', tankDataRoutes);
router.use('/connect', contactUsHomepageRoutes);

export default router;
