import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controller';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only JPEG, PNG, and GIF are allowed.'), false);
        }
    },
});

router.post('/api/uploadImage', upload.single('filename'), uploadImage);

export default router;
