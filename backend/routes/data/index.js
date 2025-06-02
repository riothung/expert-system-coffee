const router = require("express").Router();
const data = require("../../controllers/data/data.js");
const { verifyToken, isAdmin } = require("../../middleware/authMiddleware.js");

// Method GET
router.get("/variabel", data.getVariabel);
router.get("/ciriVariabel", data.getCiriVariabel);
router.get("/dataNatural", data.getDataNatural);
router.get("/hasilPengujian", data.getHasilPengujian);
//

// Method POST
router.post("/addUser", data.insertUser);
router.post("/addVariabel", data.insertVariabel);
router.post("/addCiriVariabel", data.insertCiriVariabel);
router.post("/addPengujian", data.insertPengujian);
router.post("/addCiriVariabelReal", data.insertCiriVariabelReal);
//

// Method PUT

//

// Method DELETE
router.delete("/deleteCiriVariabel/:id", data.deleteCiriVariabel);
router.delete("/deleteHasilPengujian/:id", data.deleteHasilPengujian);
//

module.exports = {
  router,
};
