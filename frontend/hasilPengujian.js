const hasilPengujian = document.getElementById("hasilPengujian");
const getHasilPengujian = async () => {
  try {
    const hasilPengujianData = await fetch("http://localhost:3000/api/data/hasilPengujian");
    const jsonData = await hasilPengujianData.json();
    console.log(jsonData);
    let i = 1;
    jsonData.data.forEach((element) => {
      const tableRow = document.createElement("tr");
      const no = document.createElement("td");
      const date = document.createElement("td");
      const name = document.createElement("td");
      const jenisPascaPanen = document.createElement("td");
      const score = document.createElement("td");
      const output = document.createElement("td");
      const action = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("class", "btn btn-danger");
      deleteButton.setAttribute("data-id", element.id);
      deleteButton.style.width = "80px";
      deleteButton.style.marginLeft = "10px";
      deleteButton.innerHTML = "Delete";
      // Delete hasil pengujian data event listener
      deleteButton.addEventListener("click", async () => {
        const confirmed = window.confirm("Anda yakin ingin menghapus data ini?");
        if (!confirmed) return; // Jika user klik "Batal", hentikan proses

        try {
          const idToDelete = deleteButton.getAttribute("data-id");
          const deleteData = await fetch(`http://localhost:3000/api/data/deleteHasilPengujian/${idToDelete}`, {
            method: "DELETE",
          });
          if (deleteData.ok) window.location.reload();
        } catch (e) {
          console.error(e);
        }
      });
      const modalButton = document.createElement("button");
      modalButton.setAttribute("data-bs-toggle", "modal");
      modalButton.setAttribute("class", "btn btn-dark");
      modalButton.setAttribute("data-bs-target", "#detailHasilPengujian");
      modalButton.setAttribute("data-id", element.id);
      modalButton.innerHTML = "Detail";

      // Event listener untuk mempassing data ke modal
      modalButton.addEventListener("click", () => {
        document.getElementById("exampleModalLabel").innerText = `Detail Hasil Pengujian #${element.id}`;

        // Buat tabel hanya sekali
        let tableContent = `
        <table class="table">
        <thead>
        <tr>
        <th>Variabel</th>
        <th>Ciri Variabel</th>
        <th>Bobot</th>
        <!-- <th>Overall Score</th> -->
        <!-- <th>Saran</th> -->
        </tr>
        </thead>
        <tbody>`;

        // Isi `tbody` dengan data dari `element.jsonData`
        element.pengujian.forEach((pengujian) => {
          tableContent += `
          <tr>
          <td style="text-align: justify;">${pengujian.ciriVariabel.variabel.variabel ?? "Data tidak tersedia"}</td>
          <td style="text-align: justify;">${pengujian.ciriVariabel.ciri ?? "Data tidak tersedia"}</td>
          <td style="text-align: justify;">${pengujian.form ?? "Data tidak tersedia"}</td>
          <!-- <td style="text-align: justify;">${element.score ?? "Data tidak tersedia"}</td> -->
          <!-- <td style="text-align: justify;">Saran</td> -->
          </tr>`;
        });

        tableContent += `</tbody>
        
        </table>
        <!-- <div class="container" style="display: flex;"> -->
        <hr style="border-top: 5px solid #481E14; width: 850px; margin: 20px auto;">
        
        <div class="container mt-4">
          <div class="row align-items-center">
            <!-- OVERALL SCORE di kiri -->
            <div class="col-md-4 text-center text-md-left">
              <div class="overall-score font-weight-bold mb-2">
                OVERALL SCORE: <span id="overall-score" style="color: #F2613F;">${element.score}</span>
                </div>
                <div class="saran-label font-weight-bold mb-2">Kategori: ${
                  element.output === "Sangat Memuaskan" ? "Sangat Memuaskan" : element.output === "Memuaskan" ? "Memuaskan" : element.output === "Kurang Memuaskan" ? "Kurang Memuaskan" : "Score tidak memenuhi"
                }</div>
                </div>
                
                <!-- SARAN di tengah -->
                <div class="col-md-8 text-center">
                <div class="saran-label font-weight-bold mb-2">Feedback</div>
              <div class="saran-box mx-auto p-3"
                  style="border: 1px solid #000; border-radius: 20px; height: 100px; width: 80%; overflow-y: auto; max-height: 100px;">
                  ${
                    element.output === "Kurang memuaskan"
                      ? "1.Penting untuk menjaga konsistensi selama proses evaluasi agar hasil lebih mendekati referensi pakar. 2. Lakukan evaluasi menyeluruh terhadap pelaksanaan sistem guna meningkatkan akurasi hasil"
                      : element.output === "Memuaskan"
                      ? "Kinerja penilaian menunjukkan hasil yang baik. Pertahankan konsistensi evaluasi agar tetap selaras dengan referensi pakar."
                      : element.output === "Sangat Memuaskan"
                      ? "Hasil yang sangat memuaskan! Pertahankan kualitas dan konsistensi yang telah dicapai!"
                      : element.output === "Score tidak memenuhi!"
                      ? "Score tidak memenuhi, tidak ada saran"
                      : "Kualitas kopi sudah baik"
                  }
                <p class="mb-0" style="text-align: justify;"></p>
              </div>
            </div>
          </div>
        </div>



        <!-- </div> -->
        `;

        // Masukkan tabel ke dalam modal-body
        document.querySelector(".modal-body").innerHTML = tableContent;
      });

      // Format the date in 'YYYY-MM-DD' format
      const formattedDate = new Date(element.date).toISOString().split("T")[0];

      // Use the formatted date in your table
      no.innerHTML = i++;
      date.innerHTML = formattedDate;
      name.innerHTML = name.innerHTML = (element.user?.username || element.pengguna || "Nama tidak tersedia");

      // Ambil pasca_panen selain "Umum"
      const jenisPasca = element.pengujian.find((value) => ["natural", "honey", "washed"].includes(value.ciriVariabel.pasca_panen.toLowerCase()));

      if (jenisPasca) {
        const pasca = jenisPasca.ciriVariabel.pasca_panen.toLowerCase();
        if (pasca === "natural") {
          jenisPascaPanen.innerHTML = "Natural";
        } else if (pasca === "honey") {
          jenisPascaPanen.innerHTML = "Honey";
        } else if (pasca === "washed") {
          jenisPascaPanen.innerHTML = "Washed";
        }
      } else {
        jenisPascaPanen.innerHTML = "Data tidak tersedia";
      }

      score.innerHTML = element.score;
      output.innerHTML = element.output;
      action.appendChild(modalButton);
      action.appendChild(deleteButton);
      tableRow.appendChild(no);
      tableRow.appendChild(date);
      tableRow.appendChild(name);
      tableRow.appendChild(jenisPascaPanen);
      tableRow.appendChild(score);
      tableRow.appendChild(output);
      tableRow.appendChild(action);
      hasilPengujian.appendChild(tableRow);
    });
  } catch (e) {
    console.error(e);
    alert(`Terjadi kesalahan: ${e.message}`);
  }
};

getHasilPengujian();
