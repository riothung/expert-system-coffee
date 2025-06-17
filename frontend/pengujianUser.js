// Function to handle single checkbox selection within each section
document.addEventListener("DOMContentLoaded", function () {
  // const allCheckBoxes = document.querySelectorAll('input[type="checkbox"]');
  // allCheckBoxes.
  // Find all h5 heading elements which represent section headers
  const sections = document.querySelectorAll("form h5");

  // Process each section
  sections.forEach((section) => {
    // Get all checkboxes in the current section
    // (all checkboxes between this h5 and the next h5)
    let checkboxes = [];
    let currentElement = section.nextElementSibling;

    while (currentElement && currentElement.tagName !== "H5") {
      // Find checkboxes within this section's elements
      const sectionCheckboxes = currentElement.querySelectorAll('input[type="checkbox"]');
      sectionCheckboxes.forEach((checkbox) => checkboxes.push(checkbox));

      currentElement = currentElement.nextElementSibling;
    }

    // Add click event listeners to each checkbox in this section
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          // If this checkbox is checked, disable all other checkboxes in the section
          checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== this) {
              otherCheckbox.disabled = true;
            }
          });
        } else {
          // If this checkbox is unchecked, enable all checkboxes in the section
          checkboxes.forEach((otherCheckbox) => {
            otherCheckbox.disabled = false;
          });
        }
      });
    });
  });
});

// End of function that handle checkbox

// function that pass the natural's form datas

let naturalModalInstance = null;
let detailModalInstance = null;

const formNatural = async () => {
  try {
    const checkboxesValues = document.querySelectorAll("[type=checkbox]");
    let result = {};

    if (getUsersName) result["pengguna"] = getUsersName;

    checkboxesValues.forEach((value) => {
      if (value.checked) result[value.name] = parseInt(value.value);
    });

    console.log(result);

    const selectFormValue = document.querySelector('.form-select[name="37"]').value;
    if (selectFormValue) result[37] = parseInt(selectFormValue);
    console.log(result[37], "ini form select natural");

    function calcScore(score = 0) {
      let count = 0;
      for (let key in result) {
        if (!isNaN(key)) {
          const val = parseInt(result[key]);
          if (!isNaN(val)) {
            score += val;
            count++;
          }
        }
      }
      return count > 0 ? score / count : 0;
    }

    const totalScore = calcScore();
    console.log(totalScore, "ini total score");

    function theOutput(output) {
      if (totalScore >= 65 && totalScore <= 74) {
        output += "Kurang Memuaskan";
      } else if (totalScore >= 75 && totalScore <= 84) {
        output += "Memuaskan";
      } else if (totalScore >= 85 && totalScore <= 94) {
        output += "Sangat Memuaskan";
      } else {
        output += "Score tidak memenuhi!";
      }

      result["score"] = totalScore;
      result["output"] = output;
      return output;
    }

    const finalOutput = theOutput("");
    console.log(finalOutput, "ini final output");
    console.log(result, "final result sebelum POST");
    console.log(typeof result.score, result.score);

    const postResponse = await fetch("http://localhost:3000/api/data/addPengujianPengguna", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ form: result }),
    });

    if (postResponse.ok) {
      const responseData = await postResponse.json();

      // Tutup modal "pengujianNatural" (manual instance, Bootstrap 4)
      const modalElement = document.getElementById("naturalModal");
      if (!naturalModalInstance) {
        naturalModalInstance = new bootstrap.Modal(modalElement);
      }
      $(modalElement).modal('hide'); // jQuery Bootstrap 4 way

      // Tampilkan hasil
      showHasilModal(responseData.data);
    }
  } catch (e) {
    console.error(e);
    alert(`Terjadi Kesalahan, Error: ${e.message}`);
  }
};

function showHasilModal(data) {
  const modalElement = document.getElementById("detailHasilPengujian");

  if (!detailModalInstance) {
    detailModalInstance = new bootstrap.Modal(modalElement);
  }

  let tableContent = `
    <table class="table">
      <thead>
        <tr>
          <th>Variabel</th>
          <th>Ciri Variabel</th>
          <th>Bobot</th>
        </tr>
      </thead>
      <tbody>`;

  data.pengujian.forEach((item) => {
    tableContent += `
      <tr>
        <td>${item.ciriVariabel?.variabel?.variabel ?? "Data tidak tersedia"}</td>
        <td>${item.ciriVariabel?.ciri ?? "Data tidak tersedia"}</td>
        <td>${item.form}</td>
      </tr>`;
  });

  tableContent += `</tbody></table>`;

  const feedback =
    data.output === "Kurang Memuaskan"
      ? "1. Penting untuk menjaga konsistensi selama proses evaluasi agar hasil lebih mendekati referensi pakar. 2. Lakukan evaluasi menyeluruh terhadap pelaksanaan sistem guna meningkatkan akurasi hasil"
      : data.output === "Memuaskan"
      ? "Kinerja penilaian menunjukkan hasil yang baik. Pertahankan konsistensi evaluasi agar tetap selaras dengan referensi pakar."
      : data.output === "Sangat Memuaskan"
      ? "Hasil yang sangat memuaskan! Pertahankan kualitas dan konsistensi yang telah dicapai!"
      : "Score tidak memenuhi, tidak ada saran";

  tableContent += `
    <hr>
    <div class="container mt-4">
      <div class="row align-items-center">
        <div class="col-md-4 text-center text-md-left">
          <div><strong>OVERALL SCORE:</strong> <span style="color:#F2613F">${data.score}</span></div>
          <div><strong>Kategori:</strong> ${data.output}</div>
        </div>
        <div class="col-md-8 text-center">
          <div class="saran-label font-weight-bold mb-2">Feedback</div>
          <div class="saran-box mx-auto p-3" style="border: 1px solid #000; border-radius: 20px; height: 100px; width: 80%; overflow-y: auto;">
            <p style="text-align: justify;">${feedback}</p>
          </div>
        </div>
      </div>
    </div>`;

  document.querySelector(".modal-body").innerHTML = tableContent;
  document.getElementById("exampleModalLabel").innerText = `Detail Hasil Pengujian #${data.id}`;
  $(modalElement).modal('show'); // Bootstrap 4 way
}

// Listener saat form disubmit
document.addEventListener("DOMContentLoaded", () => {
  const modalNatural = document.getElementById("pengujianNatural");
  modalNatural.addEventListener("submit", (e) => {
    e.preventDefault();

    const sections = modalNatural.querySelectorAll("h5");
    let isValid = true;

    for (let section of sections) {
      const sectionTitle = section.textContent.trim();
      let foundChecked = false;
      let current = section.nextElementSibling;

      while (current && current.tagName !== "H5") {
        const checkboxes = current.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((cb) => {
          if (cb.checked) foundChecked = true;
        });

        if (sectionTitle.includes("Natural Acid")) {
          const selects = current.querySelectorAll("select");
          selects.forEach((select) => {
            if (select.value && select.value !== "") foundChecked = true;
          });
        }

        current = current.nextElementSibling;
      }

      if (!foundChecked) {
        alert(`Bagian "${sectionTitle}" wajib dipilih salah satu.`);
        isValid = false;
        break;
      }
    }

    if (isValid) {
      formNatural();
    }
  });
});


// End of Pasca Panen Natural

// function that pass the honey's form datas

const formHoney = async () => {
  try {
    const checkboxesValues = document.querySelectorAll("[type=checkbox]");
    let result = {};

    if (getUsersName) result["pengguna"] = getUsersName;

    checkboxesValues.forEach((value) => {
      if (value.checked) result[value.name] = parseInt(value.value);
    });

    console.log(result);
    const selectFormValue = document.querySelector('.form-select[name="38"]').value;
    if (selectFormValue) result[38] = parseInt(selectFormValue);
    console.log(result[38], "ini form select honey");

    function calcScore(score = 0) {
      for (let key in result) {
        score += parseInt(result[key]);
      }
      return score / 10;
    }

    const totalScore = calcScore();
    console.log(totalScore, "ini total score");

    function theOutput(output) {
      if (totalScore >= 65 && totalScore <= 73) {
        output += "Kurang Memuaskan";
        result["score"] = totalScore;
        result["output"] = output;
      } else if (totalScore >= 74 && totalScore <= 81) {
        output += "Memuaskan";
        result["score"] = totalScore;
        result["output"] = output;
      } else if (totalScore >= 82 && totalScore <= 88) {
        output += "Sangat Memuaskan";
        result["score"] = totalScore;
        result["output"] = output;
      } else {
        output += "Score tidak memenuhi!";
        result["score"] = totalScore;
        result["output"] = output;
      }
      return output;
    }

    const finalOutput = theOutput("");
    console.log(finalOutput, "ini final output");

    console.log(result.score, "ini score");

    const jsonTest = JSON.stringify(result);
    console.log(jsonTest);

    // const postResponse = await fetch("", {
    const postResponse = await fetch("http://localhost:3000/api/data/addPengujianPengguna", {
      method: "POST",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        form: {
          ...result,
        },
      }),
    });

    const data = await postResponse.json();
    console.log(data, "ini data");
    if (postResponse.ok) return window.location.reload();
  } catch (e) {
    console.error(e);
    alert(`Terjadi Kesalahan, Error: ${e.message}`);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const modalHoney = document.getElementById("pengujianHoney");
  modalHoney.addEventListener("submit", (e) => {
    e.preventDefault();

    const sections = modalHoney.querySelectorAll("h5");
    let isValid = true;

    for (let section of sections) {
      const sectionTitle = section.textContent.trim();
      let foundChecked = false;
      let current = section.nextElementSibling;

      // Loop sampai h5 berikutnya
      while (current && current.tagName !== "H5") {
        // Cek checkbox
        const checkboxes = current.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((cb) => {
          if (cb.checked) foundChecked = true;
        });

        // Jika bagian ini adalah Honey Acid, cek juga select
        if (sectionTitle.includes("Honey Acid")) {
          const selects = current.querySelectorAll("select");
          selects.forEach((select) => {
            if (select.value && select.value !== "") foundChecked = true;
          });
        }

        current = current.nextElementSibling;
      }

      if (!foundChecked) {
        alert(`Bagian "${sectionTitle}" wajib dipilih salah satu.`);
        isValid = false;
        break; // stop looping jika satu saja tidak valid
      }
    }

    if (isValid) {
      formHoney(); // lanjut submit form
    }
  });
});

// End of formHoney function

// function that pass the washed's form datas

const formWashed = async () => {
  try {
    const checkboxesValues = document.querySelectorAll("[type=checkbox]");
    let result = {};

    if (getUsersName) result["pengguna"] = getUsersName;

    checkboxesValues.forEach((value) => {
      if (value.checked) {
        const parsed = parseInt(value.value);
        if (!isNaN(parsed)) result[value.name] = parsed;
      }
    });

    const selectForm = document.querySelector('.form-select[name="39"]');
    if (selectForm && selectForm.value !== "") {
      const parsedSelect = parseInt(selectForm.value);
      if (!isNaN(parsedSelect)) result[39] = parsedSelect;
    }

    function calcScore(score = 0) {
      for (let key in result) {
        if (typeof result[key] === "number") {
          score += result[key];
        }
      }
      return score / 10;
    }

    const totalScore = calcScore();
    result["score"] = totalScore;

    function theOutput(output) {
      if (totalScore >= 65 && totalScore <= 73) {
        output += "Kurang Memuaskan";
      } else if (totalScore >= 74 && totalScore <= 81) {
        output += "Memuaskan";
      } else if (totalScore >= 82 && totalScore <= 88) {
        output += "Sangat Memuaskan";
      } else {
        output += "Score tidak memenuhi!";
      }
      result["output"] = output;
      return output;
    }

    const finalOutput = theOutput("");
    console.log(result, "Final result with score and output");

    const postResponse = await fetch("http://localhost:3000/api/data/addPengujianPengguna", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ form: result }),
    });

    if (postResponse.ok) return window.location.reload();
  } catch (e) {
    console.error(e);
    alert(`Terjadi Kesalahan, Error: ${e.message}`);
  }
};


document.addEventListener("DOMContentLoaded", () => {
  const modalWashed = document.getElementById("pengujianWashed");
  modalWashed.addEventListener("submit", (e) => {
    e.preventDefault();

    const sections = modalWashed.querySelectorAll("h5");
    let isValid = true;

    for (let section of sections) {
      const sectionTitle = section.textContent.trim();
      let foundChecked = false;
      let current = section.nextElementSibling;

      // Loop sampai h5 berikutnya
      while (current && current.tagName !== "H5") {
        // Cek checkbox
        const checkboxes = current.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((cb) => {
          if (cb.checked) foundChecked = true;
        });

        // Jika bagian ini adalah Washed Acid, cek juga select
        if (sectionTitle.includes("Washed Acid")) {
          const selects = current.querySelectorAll("select");
          selects.forEach((select) => {
            if (select.value && select.value !== "") foundChecked = true;
          });
        }

        current = current.nextElementSibling;
      }

      if (!foundChecked) {
        alert(`Bagian "${sectionTitle}" wajib dipilih salah satu.`);
        isValid = false;
        break; // stop looping jika satu saja tidak valid
      }
    }

    if (isValid) {
      formWashed();
    }
  });
});

// End of formWashed function

let getUsersName = "";

function showSlider(event) {
  event.preventDefault(); // stop form submit

  const name = document.getElementById("nameInput").value;
  getUsersName = name;

  if (name.trim() !== "") {
    // sembunyikan form
    document.getElementById("nameForm").classList.add("d-none");

    // tampilkan slider
    document.getElementById("sliderContainer").classList.remove("d-none");
  }

  console.log(getUsersName);
}

// const nameForm = document.getElementById("nameForm");
// // console.log(nameForm);
// nameForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   function getUserName() {
//     const getName = document.getElementById("nameInput").value;
//     let name = "";
//     name += getName;
//     console.log(name);
//   }
//   getUserName();
// });