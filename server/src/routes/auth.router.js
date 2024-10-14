import { Router } from 'express';
import '../config/passport';
import { authenticateToken } from '../utils/authMiddleware';
import { AuthController } from '../controller';

const router = Router();

router.get('/login/success', authenticateToken, AuthController.handleLoginSuccess);
router.get('/login/failed', AuthController.handleLoginFailed);
router.post('/logout', AuthController.handleLogout);
router.post('/local', AuthController.handleLocalAuth);
router.get('/google', AuthController.handleGoogleAuth);
router.get('/google/callback', AuthController.handleGoogleAuthCallback);
router.get('/facebook', AuthController.handleFacebookAuth);
router.get('/facebook/callback', AuthController.handleFacebookCallback);

export default router;
