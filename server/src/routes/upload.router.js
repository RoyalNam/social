import express from 'express';
import multer from 'multer';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { config } from '../config/config.js';

initializeApp(config.firebase);
const storage = getStorage();

const router = express.Router();

const uploadImage = async (req, res) => {
    try {
        const dateTime = getCurrentDateTime();
        const storageRef = ref(storage, `files/${req.file.originalname} ${dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return res.send({
            message: 'File uploaded to Firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL,
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const getCurrentDateTime = () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    return `${date} ${time}`;
};

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

router.post('/uploadImage', upload.single('filename'), uploadImage);

export default router;
