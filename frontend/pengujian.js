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

const formNatural = async () => {
  try {
    const checkboxesValues = document.querySelectorAll("[type=checkbox]");
    let result = {};

    checkboxesValues.forEach((value) => {
      if (value.checked) result[value.name] = parseInt(value.value);
    });

    console.log(result);
    const selectFormValue = document.querySelector('.form-select[name="37"]').value;
    if (selectFormValue) result[37] = parseInt(selectFormValue);
    console.log(result[37], "ini form select natural");

    function calcScore(score = 0) {
      for (let key in result) {
        score += parseInt(result[key]);
      }
      return score / 10;
    }

    const totalScore = calcScore();
    console.log(totalScore, "ini total score");

    function theOutput(output) {
      if (totalScore >= 65 && totalScore <= 74) {
        output += "Kurang Memuaskan";
        result["score"] = totalScore;
        result["output"] = output;
      } else if (totalScore >= 75 && totalScore <= 84) {
        output += "Memuaskan";
        result["score"] = totalScore;
        result["output"] = output;
      } else if (totalScore >= 85 && totalScore <= 94) {
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

    // const jsonTest = JSON.stringify(result);
    // console.log(jsonTest);

    // const postResponse = await fetch("", {
    const postResponse = await fetch("http://localhost:3000/api/data/addPengujian", {
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

    // const data = await postResponse.json();
    // console.log(data, "ini data");
    if (postResponse.ok) return (window.location.href = "./hasilPengujian.html");
  } catch (e) {
    console.error(e);
    alert(`Terjadi Kesalahan, Error: ${e.message}`);
  }
};

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

      // Loop sampai h5 berikutnya
      while (current && current.tagName !== "H5") {
        // Cek checkbox
        const checkboxes = current.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((cb) => {
          if (cb.checked) foundChecked = true;
        });

        // Jika bagian ini adalah Natural Acid, cek juga select
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
        break; // stop looping jika satu saja tidak valid
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
    const postResponse = await fetch("http://localhost:3000/api/data/addPengujian", {
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
    if (postResponse.ok) window.location.reload();
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

    checkboxesValues.forEach((value) => {
      if (value.checked) result[value.name] = parseInt(value.value);
    });

    console.log(result);
    const selectFormValue = document.querySelector('.form-select[name="39"]').value;
    if (selectFormValue) result[39] = parseInt(selectFormValue);
    console.log(result[39], "ini form select washed");

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
        1;
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

    // const jsonTest = JSON.stringify(result);
    // console.log(jsonTest);

    // const postResponse = await fetch("", {
    const postResponse = await fetch("http://localhost:3000/api/data/addPengujian", {
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

    // const data = await postResponse.json();
    // console.log(data, "ini data");
    if (postResponse.ok) window.location.reload();
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
