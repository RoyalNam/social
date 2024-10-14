import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export const uploadImage = async (req, res) => {
    try {
        console.log('File:', req.file);

        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + ' ' + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return res.send({
            message: 'File uploaded to Firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL,
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

// Helper function to get current date and time
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
};
