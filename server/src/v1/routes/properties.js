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
  markPropertySold,
  editPropertyAdImage,
  editPropertyAd,
} from '../controllers/property';
import {
  postPropertyAdValiadator,
  editPropertyAdPriceValidator,
  editPropertyAdTitleValidator,
} from '../middlewares/inputValidators';
import { verifyAuthUser } from '../middlewares/verify';

const router = Router();

router.get('/', fetchAllProperties);
router.get('/:id/specific-property', fetchSpecificProperty);
router.get('/type', findAdsOfSpecificType);

// Auth user all routes for authenticated user/agents
router.use(verifyAuthUser);

router.post('/', cloudinaryConfig, multerUploads, uploadImage, postPropertyAdValiadator, createPropertyAd);
router.get('/my-ads', fetchMyads);
router.delete('/:id', deletePropertyAd);
router.patch('/:id/sold', markPropertySold);
router.patch('/:id/image', cloudinaryConfig, multerUploads, uploadImage, editPropertyAdImage);
router.patch('/:id/price', editPropertyAdPriceValidator, editPropertyAd);
router.patch('/:id/title', editPropertyAdTitleValidator, editPropertyAd);


export default router;
