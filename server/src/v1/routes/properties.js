import { Router } from 'express';
import { cloudinaryConfig } from '../middlewares/cloudinary';
import { multerUploads } from '../middlewares/multer';
import uploadImage from '../middlewares/uploadImage';
import {
  createPropertyAd, fetchAllProperties, fetchSpecificProperty, deletePropertyAd, fetchMyads,
} from '../controllers/property';
import { postPropertyAdValiadator } from '../middlewares/inputValidators';
import { verifyAuthUser } from '../middlewares/verify';

const router = Router();

router.get('/', fetchAllProperties);
router.get('/prop', fetchSpecificProperty);

// Auth user all routes for authenticated user/agents
router.use(verifyAuthUser);

router.post('/', cloudinaryConfig, multerUploads, uploadImage, postPropertyAdValiadator, createPropertyAd);
router.get('/my-ads', fetchMyads);
router.delete('/:id', deletePropertyAd);

export default router;
