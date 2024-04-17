import { Router } from "express";
import passport from "passport";
const router = Router();

router.get('/api/auth/facebook/', passport.authenticate('facebook', { scope: 'email' }));


router.get(
  "/api/auth/facebook/redirect",
  passport.authenticate("facebook"),
  (request, response) => {
    console.log(request.session);
    console.log(request.user);

    response.sendStatus(200)
  }
);

export default router;