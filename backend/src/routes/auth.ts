import express from "express";

const router = express.Router();

router.get(
  "/",
  function (req, res, next) {
    if (!req.user) {
      return res.render("authentication", { user: null });
    }
    next();
  },
  function (req, res) {
    res.locals.filter = null;
    res.render("authentication", { user: req.user });
  }
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      console.warn(err);
      return next(err);
    }
    res.redirect("/_auth");
  });
});

export default router;
