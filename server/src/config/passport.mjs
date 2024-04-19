import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as LocalStrategy } from 'passport-local';
import { comparePassword } from '../utils/helpers.mjs';
import { User } from '../mongoose/schemas/user.mjs';
dotenv.config();

passport.use(
    'google',
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
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
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: '/auth/facebook/callback',
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

passport.use(
    'local',
    new LocalStrategy(async (email, password, done) => {
        try {
            const findUser = await User.findOne({ email });
            if (!findUser) throw new Error('User not found');
            if (!comparePassword(password, findUser.password)) throw new Error('Bad Credentials');
            done(null, findUser);
        } catch (err) {
            done(err, null);
        }
    }),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const findUser = await User.findById(id);
        return findUser ? done(null, findUser) : done(null, null);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
