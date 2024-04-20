import passport from 'passport';

class AuthController {
    static handleLoginSuccess(req, res) {
        if (req.user) {
            res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công',
                user: req.user,
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Không được phép',
            });
        }
    }

    static handleLoginFailed(req, res) {
        res.status(401).json({
            success: false,
            message: 'Đăng nhập thất bại',
        });
    }

    static handleLogout(req, res) {
        req.logout((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi đăng xuất');
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
