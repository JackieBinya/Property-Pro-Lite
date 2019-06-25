import { Router } from 'express';
import { cloudinaryConfig } from '../middlewares/cloudinary';
import { multerUploads } from '../middlewares/multer';
import uploadImage from '../middlewares/uploadImage';
import { createPropertyAd, fetchAllProperties } from '../controllers/property';
import { postPropertyAdValiadator } from '../middlewares/inputValidators';

const router = Router();

router.get('/', fetchAllProperties);

// Auth user all routes for authenticated user/agents

router.post('/', cloudinaryConfig, multerUploads, uploadImage, postPropertyAdValiadator, createPropertyAd);

export default router;
