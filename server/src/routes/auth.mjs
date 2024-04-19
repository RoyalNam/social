import { Router } from 'express';
import passport from 'passport';
const router = Router();

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'successfully',
            user: req.user,
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failure',
    });
});
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error logging out');
        }
        res.redirect(process.env.CLIENT_URL);
    });
});

router.post(
    '/local',
    passport.authenticate('local', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/auth/login/failed',
    }),
);

router.get('/google', passport.authenticate('google'));
router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/auth/login/failed',
    }),
);

router.get('/facebook', passport.authenticate('facebook'));
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/auth/login/failed',
    }),
);

export default router;
