const router = require("express").Router();
const auth = require("../../controllers/auth/authController.js");

// POST Method
router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/logout", auth.logout);

module.exports = {
  router,
};
