import { Router } from 'express';
import { cloudinaryConfig } from '../middlewares/cloudinary';
import { multerUpload, imageFormatValidator } from '../middlewares/multer';
import { uploadImage } from '../middlewares/uploadImage';
import {
  createPropertyAd,
} from '../controllers/property';
import {
  postPropertyAdValiadator,
} from '../middlewares/inputValidators';
import { verifyAuthUser } from '../middlewares/verify';

const router = Router();

// Auth user all routes for authenticated user/agents
router.use(verifyAuthUser);

router.post('/', multerUpload, imageFormatValidator, uploadImage, postPropertyAdValiadator, cloudinaryConfig, createPropertyAd);

export default router;
