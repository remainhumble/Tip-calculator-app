const tipCalculator = document.getElementById("tip-calculator");
const bill = document.getElementById("bill");
const people = document.getElementById("people");
const inputs = document.querySelectorAll("input");
const resetBtn = document.getElementById("reset");

tipCalculator.addEventListener("click", (event) => {
  event.preventDefault();
});

// validations object
// const inputValues = {

// };

// const disableResetBtn = (input) => {
// resetBtn.disabled = input.value === '';
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

resetBtn.addEventListener("click", clearInputFields);
