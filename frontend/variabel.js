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

      // delete function
      deleteButton.addEventListener("click", async () => {
        const confirmDelete = window.confirm("Anda yakin ingin menghapus data ini?");
        if (!confirmDelete) return; // Jika user klik "Batal", hentikan proses

        try {
          const idToDelete = deleteButton.getAttribute("data-id");
          const deleteData = await fetch(`http://localhost:3000/api/data/deleteVariabel/${idToDelete}`, {
            method: "DELETE",
          });
          if (deleteData.ok) window.location.reload();
        } catch (e) {
          console.error(e);
          alert(`Terjadi kesalahan: ${e.message}`);
        }

      })
      
      const modalEdit = document.createElement("button");
      modalEdit.style.marginLeft = "10px";
      modalEdit.style.width = "80px";
      modalEdit.setAttribute("data-bs-toggle", "modal");
      modalEdit.setAttribute("class", "btn btn-dark");
      modalEdit.setAttribute("data-bs-target", "#editVariabel");
      modalEdit.setAttribute("data-id", element.id);
      modalEdit.innerHTML = "Edit";
      // Edit Ciri Variabel data event listener
      modalEdit.addEventListener("click", () => {
      document.getElementById("exampleModalLabel").innerText = `Edit Variabel #${element.id}`;
      const editedVariabelId = element.id;
      console.log(editedVariabelId);

      let editContent = `
      <div style="margin-left: 10px; margin-right: 10px;">
        <form id="variabelEditForm">
        <div class="mb-3">
          <label class="form-label">Kode</label>
          <input type="text" name="kode" id="kodeVariabel" class="form-control" value="${element.kode}" required>
      </div>
        <div class="mb-3">
          <label class="form-label">Variabel</label>
          <input type="text" id="variabelText" name="variabel" class="form-control" value="${element.variabel}" required>
      </div>
        <div class="mb-3">
              <label for="jenisPascaPanen" class="form-label">Jenis Pasca Panen</label>
              <select name="pasca_panen" class="form-control" id="idJenis" class="addOption" required> 
                  <option value="" disabled selected hidden>Pilih Jenis Pasca Panen</option>
                  <option value="umum">Umum</option>
                  <option value="natural">Natural</option>
                  <option value="honey">Honey</option>
                  <option value="washed">Washed</option>
              </select>
          </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
        </form>
      </div>
      `;

        document.querySelector(".modal-body").innerHTML = editContent;

        let formEditData = document.getElementById("variabelEditForm")
        formEditData.addEventListener("submit", (e) => {
          try{
            const variabelData = Object.fromEntries(new FormData(formEditData));
            console.log(variabelData);
  
            const updateData = fetch(`http://localhost:3000/api/data/updateVariabel/${editedVariabelId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(variabelData),
            });
            if (updateData.ok) window.location.reload();
          } catch (e){
            console.error(e);
            alert(`Terjadi kesalahan: ${e.message}`);
          }
        })
      });

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


let formData = document.getElementById("variabelForm");
const tambahDataVariabel = async () => {
  try{
    const variabelData = Object.fromEntries(new FormData(formData));
    console.log(variabelData);

    const insertData = await fetch("http://localhost:3000/api/data/addVariabelReal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variabelData),
    });
    
    if(insertData.ok) window.location.reload();
  }catch(e){
    console.error(e);
    alert(`Terjadi kesalahan: ${e.message}`);
  }
}

formData.addEventListener("submit", (e) => {
  e.preventDefault();
  tambahDataVariabel();
})
