import { Router } from 'express';
import { cloudinaryConfig } from '../middlewares/cloudinary';
import { multerUpload, imageFormatValidator } from '../middlewares/multer';
import {uploadImage, editImage } from '../middlewares/uploadImage';
import {
  createPropertyAd,
  fetchAllProperties,
  fetchSpecificProperty,
  deletePropertyAd,
  fetchMyads,
  findAdsOfSpecificType,
  markPropertySold,
  editPropertyAd,
} from '../controllers/property';
import {
  postPropertyAdValiadator,
  editAdValidator,
} from '../middlewares/inputValidators';
import { verifyAuthUser, verifyExistingProperty, verifyPropertyBelongsToUser } from '../middlewares/verify';

const router = Router();

router.get('/', fetchAllProperties);
router.get('/:id/specific-property', fetchSpecificProperty);
router.get('/type', findAdsOfSpecificType);

// Auth user all routes for authenticated user/agents
router.use(verifyAuthUser);

router.post('/', cloudinaryConfig, multerUpload, imageFormatValidator, uploadImage, postPropertyAdValiadator, createPropertyAd);
router.get('/my-ads', fetchMyads);
router.delete('/:id', verifyExistingProperty, verifyPropertyBelongsToUser, deletePropertyAd);
router.patch('/:id/sold', verifyExistingProperty, verifyPropertyBelongsToUser, markPropertySold);
router.patch('/:id', verifyExistingProperty, verifyPropertyBelongsToUser, editAdValidator, editPropertyAd );

export default router;
