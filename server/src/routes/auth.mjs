import { Router } from 'express';
import AuthController from '../controller/authController.mjs';

const router = Router();

router.get('/login/success', AuthController.handleLoginSuccess);
router.get('/login/failed', AuthController.handleLoginFailed);
router.get('/logout', AuthController.handleLogout);
router.post('/local', AuthController.handleLocalAuth);
router.get('/google', AuthController.handleGoogleAuth);
router.get('/google/callback', AuthController.handleGoogleCallback);
router.get('/facebook', AuthController.handleFacebookAuth);
router.get('/facebook/callback', AuthController.handleFacebookCallback);

export default router;
