const router = require("express").Router();
const authRouter = require("./auth/index.js");
const dataRouter = require("./data/index.js");

router.get("/", (req, res) => {
  return res.json("Test API");
});

router.use("/auth", authRouter.router);
router.use("/data", dataRouter.router);

module.exports = router;
