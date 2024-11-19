import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/index.js';
import { config } from './config.js';

const JWT_SECRET = config.jwtSecret;
passport.use(
    'google',
    new GoogleStrategy(
        {
            clientID: config.googleClientId,
            clientSecret: config.googleClientSecret,
            callbackURL: '/api/auth/google/callback',
            scope: ['profile', 'email'],
        },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                const user = await User.findOne({
                    'account.type': 'google',
                    'account.account_id': profile.id,
                });
                if (!user) {
                    console.log('Adding new Google user to DB..');
                    const newUser = new User({
                        email: profile.email,
                        name: `${profile.name.givenName} ${profile.name.familyName}`,
                        avatar: profile.picture,
                        account: {
                            type: 'google',
                            account_id: profile.id,
                        },
                    });
                    await newUser.save();
                    cb(null, newUser);
                } else {
                    console.log('Google User already exists in DB..');
                    cb(null, user);
                }
            } catch (error) {
                cb(error, null);
            }
        },
    ),
);

passport.use(
    'facebook',
    new FacebookStrategy(
        {
            clientID: config.facebookClientId,
            clientSecret: config.facebookClientSecret,
            callbackURL: '/api/auth/facebook/callback',
            scope: ['email'],
        },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                const user = await User.findOne({
                    'account.type': 'facebook',
                    'account.account_id': profile.id,
                });
                if (!user) {
                    console.log('Adding new Facebook user to DB..');
                    const newUser = new User({
                        email: profile.emails,
                        name: profile.displayName,
                        avatar: profile.profileUrl,
                        account: {
                            type: 'facebook',
                            account_id: profile.id,
                        },
                    });
                    await newUser.save();
                    cb(null, newUser);
                } else {
                    console.log('Facebook User already exists in DB..');
                    cb(null, user);
                }
            } catch (error) {
                cb(error, null);
            }
        },
    ),
);

// JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
};

passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
            const user = await User.findById(payload.id);
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (err) {
            done(err, false);
        }
    }),
);

export default passport;
