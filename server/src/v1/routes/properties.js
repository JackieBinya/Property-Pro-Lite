import { Router } from 'express';
import { cloudinaryConfig } from '../middlewares/cloudinary';
import { multerUpload, imageFormatValidator } from '../middlewares/multer';
import { uploadImage } from '../middlewares/uploadImage';
import {
  createPropertyAd,
  fetchAllProperties,
  fetchSpecificProperty,
  deletePropertyAd,
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
router.get('/:propertyId/specific-property', fetchSpecificProperty);
router.get('/type', findAdsOfSpecificType);

// Auth user all routes for authenticated user/agents
router.use(verifyAuthUser);

router.post('/', cloudinaryConfig, multerUpload, imageFormatValidator, uploadImage, postPropertyAdValiadator, createPropertyAd);
router.delete('/:propertyId', verifyExistingProperty, verifyPropertyBelongsToUser, deletePropertyAd);
router.patch('/:propertyId/sold', verifyExistingProperty, verifyPropertyBelongsToUser, markPropertySold);
router.patch('/:propertyId', verifyExistingProperty, verifyPropertyBelongsToUser, editAdValidator, editPropertyAd);

export default router;
