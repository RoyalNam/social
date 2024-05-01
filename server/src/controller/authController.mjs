import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();
const CLIENT_URL = process.env.CLIENT_URL;
class AuthController {
    static handleLoginSuccess(req, res) {
        if (req.user) {
            res.cookie('hello', 'world', { maxAge: 30000, signed: true });
            res.status(200).json({
                success: true,
                message: 'Login successfully!',
                user: req.user,
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }
    }

    static handleLoginFailed(req, res) {
        res.status(401).json({
            success: false,
            message: 'Login failure!',
        });
    }

    static handleLogout(req, res) {
        req.logout((err) => {
            if (err) {
                return res.status(500).send('Logout failure!');
            }
            res.redirect(CLIENT_URL);
        });
    }

    static handleLocalAuth = passport.authenticate('local', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/auth/login/failed',
    });

    static handleGoogleAuth = passport.authenticate('google');

    static handleGoogleCallback = passport.authenticate('google', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/auth/login/failed',
    });

    static handleFacebookAuth = passport.authenticate('facebook');

    static handleFacebookCallback = passport.authenticate('facebook', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/auth/login/failed',
    });
}

export default AuthController;
