const tipCalculator = document.getElementById("tip-calculator");
const bill = document.getElementById("bill");
const people = document.getElementById("people");
const inputs = document.querySelectorAll("input");
const customBtn = document.getElementById("custom-button");
const resetBtn = document.getElementById("reset");

tipCalculator.addEventListener("click", (event) => {
  event.preventDefault();
});

// validations object
// const inputValues = {

// };

const checkInputs = () => {
  const allEmpty = Array.from(inputs).every((input) => input.value === "");
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
