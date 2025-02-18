const router = require("express").Router();

router.get("/", (req, res) => {
  return res.json("Test");
});

module.exports = router;
