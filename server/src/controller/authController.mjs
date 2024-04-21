import passport from 'passport';

class AuthController {
    static handleLoginSuccess(req, res) {
        if (req.user) {
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
            res.redirect(process.env.CLIENT_URL);
        });
    }

    static handleLocalAuth = passport.authenticate('local', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/auth/login/failed',
    });

    static handleGoogleAuth = passport.authenticate('google');

    static handleGoogleCallback = passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/auth/login/failed',
    });

    static handleFacebookAuth = passport.authenticate('facebook');

    static handleFacebookCallback = passport.authenticate('facebook', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/auth/login/failed',
    });
}

export default AuthController;
