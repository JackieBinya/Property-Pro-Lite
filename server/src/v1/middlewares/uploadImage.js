import { uploader } from './cloudinary';
import { dataUri } from './multer';

const uploadImage = (req, res, next) => {
  if (req.file) {
    const file = dataUri(req).content;
    uploader.upload(file)
      .then((result) => {
        req.imageUrl = result.url;
        next();
      })
      .catch(err => res.status(400).json({
        messge: 'someting went wrong while processing your request',
        data: {
          err,
        },
      }));
  }
};

export default uploadImage;
