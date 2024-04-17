import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/api/auth/google", passport.authenticate("google"));


router.get(
  "/api/auth/google/redirect",
  passport.authenticate("google"),
  (request, response) => {
    console.log(request.session);
    console.log(request.user);

    response.sendStatus(200)
  }
);

export default router;