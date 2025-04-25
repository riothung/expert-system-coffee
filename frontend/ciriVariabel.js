const ciriVariabelTable = document.getElementById("ciriVariabel");
const getVariabelData = async () => {
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
      const action = document.createElement("td");

      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("class", "btn btn-danger");
      deleteButton.setAttribute("data-id", element.id);
      deleteButton.style.width = "80px";
      deleteButton.innerHTML = "Delete";
      const modalEdit = document.createElement("button");
      modalEdit.style.marginBottom = "5px";
      modalEdit.style.width = "80px";
      modalEdit.setAttribute("data-bs-toggle", "modal");
      modalEdit.setAttribute("class", "btn btn-primary");
      modalEdit.setAttribute("data-bs-target", "#editFaktor");
      modalEdit.setAttribute("data-id", element.id);
      modalEdit.innerHTML = "Edit";
      no.innerText = i++;
      kode.innerText = element.kode;
      ciriVariabel.innerText = element.ciri;
      jenisPascaPanen.innerText = element.pasca_panen;
      bobot.innerText = element.bobot === 0 ? "60-90" : element.bobot;
      action.appendChild(modalEdit);
      action.appendChild(deleteButton);
      tableRow.appendChild(no);
      tableRow.appendChild(kode);
      tableRow.appendChild(ciriVariabel);
      tableRow.appendChild(jenisPascaPanen);
      tableRow.appendChild(bobot);
      tableRow.appendChild(action);
      tableRow.style.textAlign = "center";
      ciriVariabelTable.appendChild(tableRow);
    });
  } catch (e) {
    console.error(e);
    alert(`Terjadi kesalahan: ${e.message}`);
  }
};

getVariabelData();

const centerTh = document.querySelectorAll("th");
centerTh.forEach((th) => (th.style.textAlign = "center"));
