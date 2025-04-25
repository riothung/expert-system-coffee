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
      const modalButton = document.createElement("button");
      modalButton.setAttribute("data-bs-toggle", "modal");
      modalButton.setAttribute("class", "btn btn-warning");
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
        <tfoot>
        <tr>
        <td colspan="2" style="text-align: right;">Total Score:</td>
        <td>${element.score ?? "Data tidak tersedia"}</td>
        </tr>
        </tfoot>
        
        </table>
        <!-- <div class="container" style="display: flex;"> -->
        
        <div class="overall-score" style="font-weight: bold; margin-bottom: 10px; text-align: center;"></div>OVERALL SCORE: ${element.score} </div>
        <div class="saran-label style="text-align: center; font-weight: bold; margin-bottom: 5px;">SARAN</div>
        <div class="saran-box" style="border: 1px solid #000; border-radius: 20px; height: 100px; width: 80%; margin: 0 auto;"></div>
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
      name.innerHTML = element.user.username;

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
