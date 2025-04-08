// const modalWashed = document.getElementById("pengujianWashed");
// modalWashed.addEventListener("submit", (e) => {
//   e.preventDefault();
// });

// const modalHoney = document.getElementById("pengujianHoney");
// modalHoney.addEventListener("submit", (e) => {
//   e.preventDefault();
// });

// Function to handle single checkbox selection within each section
document.addEventListener("DOMContentLoaded", function () {
  // Find all h5 heading elements which represent section headers
  const sections = document.querySelectorAll("#pengujianNatural h5");

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

const formNatural = async (req, res) => {
  try {
    const checkboxesValues = document.querySelectorAll("[type=checkbox]");
    let result = {};

    checkboxesValues.forEach((value) => {
      if (value.checked) result[value.name] = parseInt(value.value);
    });

    console.log(result);
    const selectFormValue = document.querySelector(".form-select").value;
    if (selectFormValue) result[37] = parseInt(selectFormValue);
    console.log(result[37], "ini form select");

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
        output += "Output tidak ada";
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
    return res.status(400).json({ message: e.message });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const modalNatural = document.getElementById("pengujianNatural");
  modalNatural.addEventListener("submit", (e) => {
    e.preventDefault();
    formNatural();
    // console.log("halo natural");
    return false;
  });
});

// formNatural();
// console.log("test");
