const tipCalculator = document.getElementById("tip-calculator");
const bill = document.getElementById("bill");
const people = document.getElementById("people");
const resetBtn = document.getElementById("reset");

tipCalculator.addEventListener("click", (event) => {
  event.preventDefault();
});

// validations object
const validations = {
  bill: (value) => value.length > 0,
  people: (value) => value.length > 0,
};

bill.addEventListener("input", () => {
  resetBtn.disabled = bill.value === "";
});

const clearInputFields = () => {
  bill.value = "";
  people.value = "";
};

resetBtn.addEventListener("click", clearInputFields);
