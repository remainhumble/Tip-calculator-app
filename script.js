const tipCalculator = document.getElementById("tip-calculator");
const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people-input");
const inputs = document.querySelectorAll("input");
const cantBeZero = document.getElementsByClassName("zeroless"); // Needs work
const customBtn = document.getElementById("custom-button");
const resetBtn = document.getElementById("reset");

tipCalculator.addEventListener("click", (event) => {
  event.preventDefault();
});

const checkInputs = () => {
  const allEmpty = Array.from(inputs).every((input) => {
    const value = input.value.trim();
    const numericValue = Number(value);

    // Set red border ONLY if value is exactly zero
    if (value !== "" && numericValue === 0) {
 
      input.style.outline = "2px solid red";
    } else {
      input.style.outline = ""; // Reset to default
    }

    return value === "" || numericValue <= 0;
  });

  resetBtn.disabled = allEmpty;
};

inputs.forEach((input) => {
  input.addEventListener("input", checkInputs);
});

const clearInputFields = () => {
  inputs.forEach((input) => (input.value = ""));
  resetBtn.disabled = true;
};

const customizeTip = () => {
  const customInput = document.createElement("input");
  customInput.id = "custom-tip";
  customBtn.replaceWith(customInput);
  customInput.focus();

  // reverts back to custom button when it loses it's clicked input focus
  customInput.onblur = function () {
    customInput.replaceWith(customBtn);
  };
};

customBtn.addEventListener("click", customizeTip);

resetBtn.addEventListener("click", clearInputFields);
