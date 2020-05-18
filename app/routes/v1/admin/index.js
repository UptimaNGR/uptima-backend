import { Router } from 'express';
import authRoutes from './auth';
import staffRoutes from './staff';

const router = Router();

router.use('/auth', authRoutes);

router.use('/staff', staffRoutes);

export default router;
