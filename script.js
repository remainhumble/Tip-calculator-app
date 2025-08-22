const tipCalculator = document.getElementById("tip-calculator");
const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people-input");
const inputs = document.querySelectorAll("input");
const cantBeZero = document.getElementById("zeroless"); // Needs work
const customBtn = document.getElementById("custom-button");
const resetBtn = document.getElementById("reset");
const tipAmount = document.getElementById("tip-amount-value");
const totalAmount = document.getElementById("total-amount-value");
const billSection = document.getElementById("bill-section");
const billDiv = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".tip-button");
let selectedTip = 0; // default tip
totalAmount.innerText = "$0.00";
tipAmount.innerText = "$0.00";

tipCalculator.addEventListener("click", (event) => {
  event.preventDefault();
});

// Calculate per person
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");
    selectedTip = parseFloat(button.getAttribute("data-percentage")) / 100;
    calculateTipAndTotal();
  });
});

const calculateTipAndTotal = () => {
  const bill = parseFloat(billInput.value) || 0;
  const people = parseInt(peopleInput.value) || 1;
  const tipPercent = selectedTip || 0;

  const totalTip = bill * tipPercent;
  const tipPerPerson = people > 0 ? totalTip / people : 0;
  const totalPerPerson = people > 0 ? (bill + totalTip) / people : 0;

  tipAmount.innerText = `$${tipPerPerson.toFixed(2)}`;
  totalAmount.innerText = `$${totalPerPerson.toFixed(2)}`;
};

const checkInputs = (input) => {
  const allEmpty = Array.from(inputs).every((input) => {
    const value = input.value.trim();
    let numericValue = Number(value);

    // bill input
    if (input === billInput && value !== "" && numericValue === 0) {
      input.style.outline = "2px solid hsl(39, 100%, 50%)";
      // Show warning for zero
      let existingMsg = billDiv.querySelector(".bill-warning");
      if (!existingMsg) {
        const warning = document.createElement("h3");
        warning.className = "bill-warning";
        warning.innerText = "positive numbers only";
        billDiv.appendChild(warning);
      }
    } else if (input === billInput && numericValue < 0) {
      input.style.outline = "2px solid hsl(39, 100%, 50%)";
      // Show warning for negative
      let existingMsg = billDiv.querySelector(".bill-warning");
      if (!existingMsg) {
        const warning = document.createElement("h3");
        warning.className = "bill-warning";
        warning.innerText = "positive numbers only";
        billDiv.appendChild(warning);
      }
    } else if (input === billInput) {
      input.style.outline = ""; // Reset to default
      // Remove the warning if input is valid
      let existingMsg = billDiv.querySelector(".bill-warning");
      if (existingMsg) {
        existingMsg.remove();
      }
    }

    // people input
    if (input === peopleInput && value !== "" && numericValue === 0) {
      input.style.outline = "2px solid hsl(39, 100%, 50%)";
      cantBeZero.innerText = "Can't be zero";
    } else if (input === peopleInput && numericValue < 0) {
      input.style.outline = "2px solid hsl(39, 100%, 50%)";
      cantBeZero.innerText = "positive integers only";
    } else if (input === peopleInput) {
      input.style.outline = ""; // Reset to default
      cantBeZero.innerText = "";
    }

    return value === "" || numericValue <= 0;
  });

  calculateTipAndTotal(); // <-- call the separated function here
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
