const router = require("express").Router();
const data = require("../../controllers/data/data.js");
// const { verifyToken, isAdmin } = require("../../middleware/authMiddleware.js");

// Method GET
router.get("/variabel", data.getVariabel);
router.get("/ciriVariabel", data.getCiriVariabel);
router.get("/dataNatural", data.getDataNatural);
router.get("/hasilPengujian", data.getHasilPengujian);
// router.get("hasilPengujianUser", data.getHasilPengujianUser);

// router.get("/variabel", verifyToken, data.getVariabel);
// router.get("/ciriVariabel", verifyToken, data.getCiriVariabel);
// router.get("/dataNatural", verifyToken, data.getDataNatural);
// router.get("/hasilPengujian", verifyToken, isAdmin, data.getHasilPengujian);
//

// Method POST
router.post("/addUser", data.insertUser);
router.post("/addVariabel", data.insertVariabel);
router.post("/addCiriVariabel", data.insertCiriVariabel);
router.post("/addPengujian", data.insertPengujian);
router.post("/addPengujianPengguna", data.insertPengujianPengguna);
router.post("/addCiriVariabelReal", data.insertCiriVariabelReal);

// router.post("/addUser", data.insertUser);
// router.post("/addVariabel", data.insertVariabel);
// router.post("/addCiriVariabel", data.insertCiriVariabel);
// router.post("/addPengujian", data.insertPengujian);
// router.post("/addCiriVariabelReal", data.insertCiriVariabelReal);
//

// Method PUT

//

// Method DELETE
router.delete("/deleteCiriVariabel/:id", data.deleteCiriVariabel);
router.delete("/deleteHasilPengujian/:id", data.deleteHasilPengujian);

// router.delete("/deleteCiriVariabel/:id", verifyToken, isAdmin, data.deleteCiriVariabel);
// router.delete("/deleteHasilPengujian/:id", verifyToken, isAdmin, data.deleteHasilPengujian);
//

module.exports = {
  router,
};
