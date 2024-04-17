import { Router } from "express";
import { Strategy } from "passport-google-oauth2"; // Import Google OAuth2 strategy
import { GGdUser } from "../mongoose/schemas/google-user.mjs";
import passport from "passport";

const router = Router();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await GGdUser.findById(id);
    return findUser ? done(null, findUser) : done(null, null);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: "1098964589318-t3vprd4u4355trt64dp618gp1c8fg5j2.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/api/auth/google/redirect",
      scope:['profile', 'email']
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await GGdUser.findOne({
          gg_id: profile.id,
        });
        if (!user) {
          console.log("Adding new Google user to DB..");
          const newUser = new GGdUser({
            gg_id: profile.id,
            username: profile.username,
          });
          await newUser.save();
          // Serialize only the user ID into the session
          cb(null, newUser);
        } else {
          console.log("Google User already exists in DB..");
          // Serialize only the user ID into the session
          cb(null, user);
        }
      } catch (error) {
        cb(error, null);
      }
    }
  )
);

router.get('/api/auth/google/', passport.authenticate('google'));


router.get(
  "/api/auth/google/redirect",
  passport.authenticate("google"),
  (request, response) => {
    console.log(request.session);
    console.log(request.user);

    response.sendStatus(200)
  }
);

export default router; // Export the router with the name 'default'
