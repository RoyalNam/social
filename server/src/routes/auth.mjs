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
    }
});
router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failure',
    });
});
router.get('/logout', (req, res) => {
    req.logout(), res.redirect(process.env.CLIENT_URL);
});

router.get('/google', passport.authenticate('google'));
router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login/failed',
    }),
);

router.get('/facebook', passport.authenticate('facebook'));

router.get(
    '/facebook/redirect',
    passport.authenticate('facebook', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login/failed',
    }),
);

export default router;
