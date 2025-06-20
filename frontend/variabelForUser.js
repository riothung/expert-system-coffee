// GET variabel data and inserted in table
const variabelTable = document.getElementById("variabel");
const getVariabelData = async () => {
  try {
    const variabelData = await fetch("http://localhost:3000/api/data/variabel");
    const convertToJson = await variabelData.json();
    console.log(convertToJson);
    let i = 1;
    convertToJson.data.forEach((element) => {
      const tableRow = document.createElement("tr");
      const no = document.createElement("td");
      const kode = document.createElement("td");
      const variabel = document.createElement("td");
      const jenisPascaPanen = document.createElement("td");

      no.innerText = i++;
      kode.innerText = element.kode;
      variabel.innerText = element.variabel;
      jenisPascaPanen.innerText = element.pasca_panen;
      tableRow.appendChild(no);
      tableRow.appendChild(kode);
      tableRow.appendChild(variabel);
      tableRow.appendChild(jenisPascaPanen);
      // tableRow.style.textAlign = "center";
      variabelTable.appendChild(tableRow);
    });
  } catch (e) {
    console.error(e);
    alert(`Terjadi kesalahan: ${e.message}`);
  }
};

getVariabelData();
//

// GET ciri variabel data and inserted in table
const ciriVariabelTable = document.getElementById("ciriVariabel");
const getCiriVariabelData = async () => {
  try {
    const ciriVariabelData = await fetch("http://localhost:3000/api/data/ciriVariabel");
    const convertToJson = await ciriVariabelData.json();
    console.log(convertToJson);
    let i = 1;
    convertToJson.data.forEach((element) => {
      const tableRow = document.createElement("tr");
      const no = document.createElement("td");
      const kode = document.createElement("td");
      const ciriVariabel = document.createElement("td");
      const jenisPascaPanen = document.createElement("td");
      const bobot = document.createElement("td");

      no.innerText = i++;
      kode.innerText = element.kode;
      ciriVariabel.innerText = element.ciri;
      jenisPascaPanen.innerText = element.pasca_panen;
      bobot.innerText = element.bobot === 0 ? "60-90" : element.bobot;
      tableRow.appendChild(no);
      tableRow.appendChild(kode);
      tableRow.appendChild(ciriVariabel);
      tableRow.appendChild(jenisPascaPanen);
      tableRow.appendChild(bobot);
      //   tableRow.style.textAlign = "center";
      ciriVariabelTable.appendChild(tableRow);
    });
  } catch (e) {
    console.error(e);
    alert(`Terjadi kesalahan: ${e.message}`);
  }
};

getCiriVariabelData();
//
