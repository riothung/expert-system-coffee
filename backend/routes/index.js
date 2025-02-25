const router = require("express").Router();

const authRouter = require("./auth/index.js")

router.get("/", (req, res) => {
  return res.json("Test");
});

router.use("/auth", authRouter.router)

module.exports = router;
