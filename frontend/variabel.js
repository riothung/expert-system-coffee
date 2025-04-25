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
      const action = document.createElement("td");

      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("class", "btn btn-danger");
      deleteButton.setAttribute("data-id", element.id);
      deleteButton.style.marginLeft = "10px";
      deleteButton.style.width = "80px";
      deleteButton.innerHTML = "Delete";
      const modalEdit = document.createElement("button");
      modalEdit.style.marginLeft = "10px";
      modalEdit.style.width = "80px";
      modalEdit.setAttribute("data-bs-toggle", "modal");
      modalEdit.setAttribute("class", "btn btn-dark");
      modalEdit.setAttribute("data-bs-target", "#editFaktor");
      modalEdit.setAttribute("data-id", element.id);
      modalEdit.innerHTML = "Edit";

      no.innerText = i++;
      kode.innerText = element.kode;
      variabel.innerText = element.variabel;
      jenisPascaPanen.innerText = element.pasca_panen;
      action.appendChild(modalEdit);
      action.appendChild(deleteButton);
      tableRow.appendChild(no);
      tableRow.appendChild(kode);
      tableRow.appendChild(variabel);
      tableRow.appendChild(jenisPascaPanen);
      tableRow.appendChild(action);
      tableRow.style.textAlign = "center";
      variabelTable.appendChild(tableRow);
    });
  } catch (e) {
    console.error(e);
    alert(`Terjadi kesalahan: ${e.message}`);
  }
};

getVariabelData();
