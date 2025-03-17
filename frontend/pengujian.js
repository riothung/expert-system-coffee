const modalNatural = document.getElementById("pengujianNatural");
modalNatural.addEventListener("submit", (e) => {
  e.preventDefault();
  // pengujianNatural();
});

// const modalWashed = document.getElementById("pengujianWashed");
// modalWashed.addEventListener("submit", (e) => {
//   e.preventDefault();
// });

// const modalHoney = document.getElementById("pengujianHoney");
// modalHoney.addEventListener("submit", (e) => {
//   e.preventDefault();
// });

const formNatural = async (req, res) => {
  try {
    const ciriVariabelNatural = await fetch("http://localhost:3000/api/data/dataNatural");
    const naturalDataJson = await ciriVariabelNatural.json();
    console.log(naturalDataJson);

    // naturalDataJson.forEach((element) => {
    //   const aroma = document.createElement("select");
    //   aroma.setAttribute("class", "form-control");
    //   const aromaOption = document.createElement("option");
    //   aromaOption.setAttribute;
    //   aroma.appendChild(aromaOption);
    // });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: e.message });
  }
};

// pengujianNatural();

// console.log("test");
