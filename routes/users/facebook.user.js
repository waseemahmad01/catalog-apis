import express from "express";
import passport from "passport";
import "../../app/config/passport";


const router = express.Router();

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail"
  }),
);

router.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

router.get("/", (req, res) => {
  console.log(req.profile, req.isAuthenticated());
  res.send("Success");
});
export default router;