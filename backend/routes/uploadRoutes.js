import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { buildImageVariants } from '../utils/imageUtils.js';

const router = express.Router();
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ShopSphere',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error('Only JPG, PNG, and WEBP images are allowed'));
  },
});

// Upload single image
router.post('/', protect, admin, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Image must be 2MB or smaller' });
    }

    if (err) {
      return res.status(400).json({ message: err.message || 'Image upload failed' });
    }

    return next();
  });
}, (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: 'Image upload failed' });
  }

  res.status(200).json({
    message: 'Image uploaded successfully',
    image: req.file.path,
    imageVariants: buildImageVariants(req.file.path),
  });
});

export default router;
