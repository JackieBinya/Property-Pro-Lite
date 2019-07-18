import multer from 'multer';
import fileType from 'file-type';

const acceptedExtensions = ['jpg', 'png'];

const storage = multer.memoryStorage();

const imageFormatValidator = (req, res, next) => {
  if (req.file) {
    if (req.file.buffer) {
      // For MemoryStorage, validate the format using `req.file.buffer`
      const mime = fileType(req.file.buffer);

      // if can't be determined or format not accepted
      if (!mime || !acceptedExtensions.includes(mime.ext)) {
        return res.status(400).json({
          status: 400,
          error: `The uploaded file is not in  ${acceptedExtensions.join(',')} format!`,
        });
      }
    }
    next();
  }
};

const multerUpload = multer({ storage }).single('image');


export { multerUpload, imageFormatValidator };
