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
totalAmount.innerText = "$0.00";
tipAmount.innerText = "$0.00";

tipCalculator.addEventListener("click", (event) => {
  event.preventDefault();
});

const checkInputs = () => {
  const allEmpty = Array.from(inputs).every((input) => {
    const value = input.value.trim();
    let numericValue = Number(value);
    let n = parseFloat(numericValue.toFixed(2));
 const tip = n * 0.15; // should be times selected btn

    tipAmount.innerText = `$${tip.toFixed(2)}`;
    totalAmount.innerText = `$${(n + tip).toFixed(2)}`; // <-- updated calculation


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
