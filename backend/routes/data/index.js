const router = require("express").Router();
const data = require("../../controllers/data/data.js");

// Method GET
router.get("/variabel", data.getVariabel);
router.get("/ciriVariabel", data.getCiriVariabel);
router.get("/dataNatural", data.getDataNatural);
router.get("/hasilPengujian", data.getHasilPengujian);

// Method POST
router.post("/addUser", data.insertUser);
router.post("/addVariabel", data.insertVariabel);
router.post("/addCiriVariabel", data.insertCiriVariabel);
router.post("/addPengujian", data.insertPengujian);

// Method PUT

// Method DELETE

module.exports = {
  router,
};
