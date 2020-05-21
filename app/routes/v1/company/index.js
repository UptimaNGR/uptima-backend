import { Router } from 'express';
import CompanyController from '../../../controllers/company';
import CompanyMiddleware from '../../../middlewares/company';

const { addCompany } = CompanyController;
const {
  validateCompanyFields,
  checkCompanyEmailData,
  checkCompanyPhoneData
} = CompanyMiddleware;

const router = Router();

router.post(
  '/',
  validateCompanyFields,
  checkCompanyEmailData,
  checkCompanyPhoneData,
  addCompany
);
// router.get('/', getUnavailableItems);
export default router;
