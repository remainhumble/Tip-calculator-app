const tipCalculator = document.getElementById("tip-calculator");
const bill = document.getElementById("bill");
const people = document.getElementById("people");
const resetBtn = document.getElementById("reset");

// validations object
// const validations = {
//   bill: (value) => value.length > 0,
//   people: (value) => value.length > 0,
// };

const dataIsValid = (key, value) => {
  return validations[key](value);
};

const clearInputFields = () => {
  bill.value = "";
  people.value = "";
};

resetBtn.addEventListener("click", clearInputFields);
