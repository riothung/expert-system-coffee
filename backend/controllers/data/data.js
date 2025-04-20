const prisma = require("../../db");

// POST Method

// User's Data
const insertUser = async (req, res) => {
  const dataUser = [
    { username: "admin", password: "admin", email: "admin@gmail.com", isAdmin: true },
    { username: "nicky", password: "feel", email: "nicky@gmail.com", isAdmin: false },
  ];
  try {
    const insertData = await prisma.user.createMany({ data: dataUser });
    if (insertData)
      return res.status(200).json({
        insertedData: insertData,
        message: "Data inserted successfully",
      });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: e.message });
  }
};

// Variabel's Data
const insertVariabel = async (req, res) => {
  const dataVariabel = [
    { kode: "K01", variabel: "Fragrance/Aroma Kompleks", pasca_panen: "Umum" },
    { kode: "K02", variabel: "Fragrance/Aroma Sederhana", pasca_panen: "Umum" },
    { kode: "K03", variabel: "Natural Acid", pasca_panen: "Natural" },
    { kode: "K04", variabel: "Honey Acid", pasca_panen: "Honey" },
    { kode: "K05", variabel: "Washed Acid", pasca_panen: "Washed" },
    { kode: "K06", variabel: "Body Heavy", pasca_panen: "Umum" },
    { kode: "K07", variabel: "Body Thin", pasca_panen: "Umum" },
    { kode: "K08", variabel: "Aftertaste nyaman", pasca_panen: "Umum" },
    { kode: "K09", variabel: "Aftertaste tidak nyaman", pasca_panen: "Umum" },
    { kode: "K10", variabel: "Flavor kompleks", pasca_panen: "Umum" },
    { kode: "K11", variabel: "Flavor non-kompleks", pasca_panen: "Umum" },
    { kode: "K12", variabel: "Uniformity/Keseragaman konsisten", pasca_panen: "Umum" },
    { kode: "K13", variabel: "Uniformity/Keseragaman non-konsisten", pasca_panen: "Umum" },
    { kode: "K14", variabel: "Balance/Keseimbangan rasa baik", pasca_panen: "Umum" },
    { kode: "K15", variabel: "Balance/Keseimbangan rasa buruk", pasca_panen: "Umum" },
    { kode: "K16", variabel: "Clean Cup/ steril", pasca_panen: "Umum" },
    { kode: "K17", variabel: "Clean Cup/ non-steril", pasca_panen: "Umum" },
    { kode: "K18", variabel: "Natural Sweetness", pasca_panen: "Natural" },
    { kode: "K19", variabel: "Honey Sweetness", pasca_panen: "Honey" },
    { kode: "K20", variabel: "Washed Sweetness", pasca_panen: "Washed" },
    { kode: "K21", variabel: "Overall/Total keseluruhan baik", pasca_panen: "Umum" },
    { kode: "K22", variabel: "Overall/Total keseluruhan buruk", pasca_panen: "Umum" },
  ];
  try {
    const insertData = await prisma.variabel.createMany({ data: dataVariabel });
    if (insertData)
      return res.status(200).json({
        insertedData: insertData,
        message: "Data inserted successfully",
      });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: e.message });
  }
};

// ciriVariabel's Data
const insertCiriVariabel = async (req, res) => {
  const dataCiriVariabel = [
    { kode: "CK01", ciri: "Aroma menjadi lebih intens dan kaya setelah tahapan break (4 menit setelah terkena air panas)", id_variabel: 1, pasca_panen: "Umum", bobot: 80 },
    {
      kode: "CK02",
      ciri: "Aroma cenderung tetap sama seperti saat pertama terkena air panas tanpa adanya peningkatan intensitas maupun variasi aroma yang signifikan saat tahapan break (4 menit setelah terkena air panas)",
      id_variabel: 2,
      pasca_panen: "Umum",
      bobot: 70,
    },
    { kode: "CK03", ciri: "Rasa asam yang lembut seperti asam stroberi, plum, blueberry, atau winelike acidity", id_variabel: 3, pasca_panen: "Natural", bobot: 0 },
    { kode: "CK04", ciri: "Rasa asam yang seimbang dan cenderung seperti asam aprikot, peach, madu, atau buah tropis", id_variabel: 4, pasca_panen: "Honey", bobot: 0 },
    { kode: "CK05", ciri: "Rasa asam yang tajam seperti asam citrus (jeruk, lemon) dan apel hijau", id_variabel: 5, pasca_panen: "Washed", bobot: 0 },
    { kode: "CK06", ciri: "Meninggalkan jejak rasa tebal yang lebih lama di mulut", id_variabel: 6, pasca_panen: "Umum", bobot: 80 },
    { kode: "CK07", ciri: "Meninggalkan kesan rasa sweetness yang tebal dan lama di mulut", id_variabel: 6, pasca_panen: "Umum", bobot: 90 },
    { kode: "CK08", ciri: "Terasa lebih ringan di mulut dengan sensasi kurang tebal", id_variabel: 7, pasca_panen: "Umum", bobot: 70 },
    { kode: "CK09", ciri: "Tidak meninggalkan jejak rasa yang lama", id_variabel: 7, pasca_panen: "Umum", bobot: 60 },
    { kode: "CK10", ciri: "Rasa yang ditinggalkan halus dan tidak mengganggu di mulut", id_variabel: 8, pasca_panen: "Umum", bobot: 80 },
    { kode: "CK11", ciri: "Rasa yang ditinggalkan menonjolkan nuansa manis, floral, atau fruity yang tidak mendominasi", id_variabel: 8, pasca_panen: "Umum", bobot: 90 },
    { kode: "CK12", ciri: "Rasa yang ditinggalkan cenderung tidak harmonis misalnya rasa asam yang lebih mendominasi ataupun pahit berlebih", id_variabel: 9, pasca_panen: "Umum", bobot: 60 },
    { kode: "CK13", ciri: "Rasa yang ditinggalkan cenderung lebih cepat hilang di mulut", id_variabel: 9, pasca_panen: "Umum", bobot: 70 },
    { kode: "CK14", ciri: "Rasa /flavor menampilkan beragam elemen rasa yang terasa secara bertahan dan berlapis-lapis", id_variabel: 10, pasca_panen: "Umum", bobot: 80 },
    { kode: "CK15", ciri: "Memiliki kombinasi rasa yang kaya seperti buah-buahan, floral, rempah, dan manis", id_variabel: 10, pasca_panen: "Umum", bobot: 90 },
    { kode: "CK16", ciri: "Rasa/flavor memiliki lapisan rasa yang sedikit dan cenderung lebih dominan pada salah satu rasa misalnya asam atau manis", id_variabel: 11, pasca_panen: "Umum", bobot: 70 },
    { kode: "CK17", ciri: "Rasa yang ada cenderung tidak banyak berubah dari awal sampai akhir tegukan", id_variabel: 11, pasca_panen: "Umum", bobot: 60 },
    { kode: "CK18", ciri: "Memiliki rasa yang konsisten pada setiap seduhan", id_variabel: 12, pasca_panen: "Umum", bobot: 90 },
    { kode: "CK19", ciri: "Rasa dari setiap seduhan berubah ubah atau tidak konsisten", id_variabel: 13, pasca_panen: "Umum", bobot: 60 },
    { kode: "CK20", ciri: "Memiliki rasa pahit, manis, dan asam yang seimbang tanpa adanya rasa yang lebih menonjol", id_variabel: 14, pasca_panen: "Umum", bobot: 80 },
    { kode: "CK21", ciri: "Memiliki salah satu rasa yang lebih menonjol dibanding rasa lainnya", id_variabel: 15, pasca_panen: "Umum", bobot: 70 },
    { kode: "CK22", ciri: "Rasa kopi terbebas dari rasa asing, memiliki rasa yang jernih, murni dan tidak ada elemen yang mengganggu", id_variabel: 16, pasca_panen: "Umum", bobot: 90 },
    { kode: "CK23", ciri: "Air, wadah, dan kelengkapan yang digunakan steril dan bersih", id_variabel: 16, pasca_panen: "Umum", bobot: 80 },
    { kode: "CK24", ciri: "Menandakan adanya kontaminasi rasa, seperti rasa tanah atau jamur", id_variabel: 17, pasca_panen: "Umum", bobot: 60 },
    { kode: "CK25", ciri: "Air, wadah, dan kelengkapan yang digunakan tidak steril atau kotor", id_variabel: 17, pasca_panen: "Umum", bobot: 70 },
    { kode: "CK26", ciri: "Memiliki rasa manis yang intens dan cenderung seperti rasa manis buah (fruity)", id_variabel: 18, pasca_panen: "Natural", bobot: 80 },
    { kode: "CK27", ciri: "Rasa manis yang dihasilkan terasa seperti manis stroberi, anggur, kismis", id_variabel: 18, pasca_panen: "Natural", bobot: 90 },
    { kode: "CK28", ciri: "Memiliki rasa manis yang seimbang antara manis buah dan floral", id_variabel: 19, pasca_panen: "Honey", bobot: 80 },
    { kode: "CK29", ciri: "Rasa manis yang dihasilkan seperti manis madu, peach, aprikot, atau karamel", id_variabel: 19, pasca_panen: "Honey", bobot: 90 },
    { kode: "CK30", ciri: "Memiliki rasa manis yang terasa halus dan lembut seperti manis citrus", id_variabel: 20, pasca_panen: "Washed", bobot: 80 },
    { kode: "CK31", ciri: "Rasa manis yang dihasilkan seperti manis apel hijau, bunga jeruk, atau teh bunga yang memberikan rasa manis yang ringan dan segar", id_variabel: 20, pasca_panen: "Washed", bobot: 90 },
    { kode: "CK32", ciri: "Semua elemen dalam kopi memberikan pengalaman minum yang memuaskan", id_variabel: 21, pasca_panen: "Umum", bobot: 80 },
    { kode: "CK33", ciri: "Memiliki kesan keseluruhan yang baik dari segi rasa, keseimbangan, dan konsistensi", id_variabel: 21, pasca_panen: "Umum", bobot: 90 },
    { kode: "CK34", ciri: "Memiliki kesan yang kurang memuaskan seperti rasa yang tidak seimbang dan konsistensi yang buruk", id_variabel: 22, pasca_panen: "Umum", bobot: 70 },
  ];
  try {
    const insertData = await prisma.ciriVariabel.createMany({ data: dataCiriVariabel });
    if (insertData)
      return res.status(200).json({
        insertedData: insertData,
        message: "Data inserted successfully",
      });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: e.message });
  }
};

const insertPengujian = async (req, res) => {
  try {
    const dataPengujian = req.body.form;
    console.log(dataPengujian, "test baru");
    const insertHasilPengujian = await prisma.hasilPengujian.create({
      data: {
        date: new Date(),
        user: { connect: { id: 1 } },
        score: dataPengujian.score,
        output: dataPengujian.output,
      },
    });
    const formattedDate = new Date(insertHasilPengujian.date).toISOString().split("T")[0];
    console.log(dataPengujian);
    const keys = Object.keys(dataPengujian);
    if (dataPengujian) {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = dataPengujian[key];
        console.log(key);
        if (key !== "score" && key !== "output") {
          const pengujianUser = {
            id_ciriVariabel: parseInt(key),
            id_hasilPengujian: insertHasilPengujian.id,
            form: parseInt(value),
          };
          await prisma.pengujian.create({
            data: {
              ...pengujianUser,
            },
          });
          console.log(pengujianUser);
        }
      }
    }
    return res.status(200).json({
      message: "Data inserted successfully",
      data: {
        ...insertHasilPengujian,
        date: formattedDate,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: e.message });
  }
};

// End of POST method

// GET Method

// Variabel data
const getVariabel = async (req, res) => {
  try {
    const variabelData = await prisma.variabel.findMany();

    return res.status(200).json({
      data: variabelData,
      message: "Data retrieved successfully!",
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: e.message });
  }
};

// Get Pasca Panen Natural's data only
const getDataNatural = async (req, res) => {
  try {
    const naturalData = await prisma.ciriVariabel.findMany({
      include: {
        variabel: {
          where: {
            tipe: { in: ["natural", "umum"] },
          },
        },
      },
    });
    return res.status(200).json({
      data: naturalData,
      message: "Data retrieved successfully!",
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: e.message });
  }
};

// Ciri Variabel data
const getCiriVariabel = async (req, res) => {
  try {
    const ciriVariabelData = await prisma.ciriVariabel.findMany();

    return res.status(200).json({
      data: ciriVariabelData,
      message: "Data retrieved successfully!",
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: e.message });
  }
};

// Hasil Pengujian data
const getHasilPengujian = async (req, res) => {
  try {
    const hasilPengujianData = await prisma.hasilPengujian.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
        pengujian: {
          include: {
            ciriVariabel: {
              include: {
                variabel: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      data: hasilPengujianData,
      message: "Data retrieved successfully!",
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: e.message });
  }
};

// End of GET Method

// PUT Method

// End of PUT Method

// DELETE Method

// End of DELETE Method

module.exports = {
  insertUser,
  insertVariabel,
  insertCiriVariabel,
  insertPengujian,
  getVariabel,
  getCiriVariabel,
  getDataNatural,
  getHasilPengujian,
};
