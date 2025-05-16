// GET ciri variabel data and inserted in table
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
      // Delete ciri variabel data event listener
      deleteButton.addEventListener("click", async () => {
        try {
          const idToDelete = deleteButton.getAttribute("data-id");
          const deleteData = await fetch(`http://localhost:3000/api/data/deleteCiriVariabel/${idToDelete}`, {
            method: "DELETE",
          });
          if (deleteData.ok) window.location.reload();
        } catch (e) {
          console.error(e);
          alert(`Terjadi kesalahan: ${e.message}`);
        }
      });
      //

      const modalEdit = document.createElement("button");
      modalEdit.style.marginBottom = "5px";
      modalEdit.style.width = "80px";
      modalEdit.setAttribute("data-bs-toggle", "modal");
      modalEdit.setAttribute("class", "btn btn-dark");
      modalEdit.setAttribute("data-bs-target", "#editCiriVariabel");
      modalEdit.setAttribute("data-id", element.id);
      modalEdit.innerHTML = "Edit";
      // Edit Ciri Variabel data event listener
      modalEdit.addEventListener("click", async () => {
        document.getElementById("editId").value = modalEdit.getAttribute("data-id");
      });

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
//

// styling all text in table
const centerTh = document.querySelectorAll("th");
centerTh.forEach((th) => (th.style.textAlign = "center"));
//

// GET variabel data and inserted in select option
const getVariabel = async () => {
  const response = await fetch("http://localhost:3000/api/data/variabel");
  const result = await response.json();

  const select = document.getElementById("variabel");

  result.data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.variabel;
    option.dataset.id = item.id;
    select.appendChild(option);
  });
};

getVariabel();
//

// Add ciri variabel data function
const tambahDataCiriVariabel = async () => {
  try {
    const form = document.getElementById("ciriVariabelForm");
    const data = new FormData(form);
    console.log(data);

    const ciriVariabelData = Object.fromEntries(data.entries());
    console.log(ciriVariabelData);

    const insertData = await fetch("http://localhost:3000/api/data/addCiriVariabelReal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ciriVariabelData),
    });

    if (insertData.ok) window.location.reload();
  } catch (e) {
    console.error(e);
    alert(`Terjadi kesalahan: ${e.message}`);
  }
};

const form = document.getElementById("ciriVariabelForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  tambahDataCiriVariabel();
});
//
