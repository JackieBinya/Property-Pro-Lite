import { Router } from 'express';
import { cloudinaryConfig } from '../middlewares/cloudinary';
import { multerUploads } from '../middlewares/multer';
import uploadImage from '../middlewares/uploadImage';
import { createPropertyAd } from '../controllers/property';

const router = Router();

router.post('/', cloudinaryConfig, multerUploads, uploadImage, createPropertyAd);

export default router;
