import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-facebook";
import { FacebookUser } from "../mongoose/schemas/facebook-user.mjs";

const router = Router();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await FacebookUser.findById(id);
    return findUser ? done(null, findUser) : done(null, null);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: "946559456960093",
      clientSecret: "58a9e26bbb0fd675e59b9901b8e3af47",
      callbackURL: "http://localhost:3000/api/auth/facebook/redirect",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await FacebookUser.findOne({
          accountId: profile.id,
          provider: "facebook",
        });
        if (!user) {
          console.log("Adding new Facebook user to DB..");
          const newUser = new FacebookUser({
            accountId: profile.id,
            name: profile.displayName,
            provider: profile.provider,
          });
          await newUser.save();
          // Serialize only the user ID into the session
          cb(null, newUser);
        } else {
          console.log("Facebook User already exists in DB..");
          // Serialize only the user ID into the session
          cb(null, user);
        }
      } catch (error) {
        cb(error, null);
      }
    }
  )
);

router.get(
  "/api/auth/facebook/",
  passport.authenticate("facebook", { scope: "email" })
);

router.get(
  "/api/auth/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect: "/login", // Redirect to login page if authentication fails
  }),
  (request, response) => {
    // Redirect to success page after successful authentication
    response.redirect("/success");
  }
);

export default router; // Export the router with the name 'default'
