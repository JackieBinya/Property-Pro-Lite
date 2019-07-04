import { Router } from 'express';
import { cloudinaryConfig } from '../middlewares/cloudinary';
import { multerUploads } from '../middlewares/multer';
import uploadImage from '../middlewares/uploadImage';
import {
  createPropertyAd,
  fetchAllProperties,
  fetchSpecificProperty,
  deletePropertyAd,
  fetchMyads,
  findAdsOfSpecificType,
  updatePropertyAd,
  markPropertySold,
} from '../controllers/property';
import { postPropertyAdValiadator, updatePropertyAdValidator } from '../middlewares/inputValidators';
import { verifyAuthUser } from '../middlewares/verify';

const router = Router();

router.get('/', fetchAllProperties);
router.get('/prop', fetchSpecificProperty);
router.get('/type', findAdsOfSpecificType);

// Auth user all routes for authenticated user/agents
router.use(verifyAuthUser);

router.post('/', cloudinaryConfig, multerUploads, uploadImage, postPropertyAdValiadator, createPropertyAd);
router.get('/my-ads', fetchMyads);
router.delete('/:id', deletePropertyAd);
router.patch('/:id', updatePropertyAdValidator, updatePropertyAd);
router.patch('/:id/sold', markPropertySold);


export default router;
