import { CalculatorFacade } from "./cal";

const display = document.getElementById("display") as HTMLElement;
const calculator = new CalculatorFacade(display);

// Handle button clicks
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (!value) return;

    if (!isNaN(parseInt(value))) {
      calculator.inputNumber(value);
    } else if (value === ".") {
      calculator.inputDecimal();
    } else if (value === "AC") {
      calculator.inputClear();
    } else if (value === "=") {
      calculator.inputEqual();
    } else if (value === "+/-") {
      calculator.inputNegate();
    } else if (["+", "-", "*", "/", "%"].includes(value)) {
      calculator.inputOperator(value as "+" | "-" | "*" | "/" | "%");
    }
  });
});

// Optional: Keyboard support
document.addEventListener("keydown", (event: KeyboardEvent) => {
  const key = event.key;

  if (!isNaN(Number(key))) {
    calculator.inputNumber(key);
  } else if (key === ".") {
    calculator.inputDecimal();
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculator.inputEqual();
  } else if (key.toLowerCase() === "c" || key === "Escape") {
    calculator.inputClear();
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    calculator.inputOperator(key as "+" | "-" | "*" | "/" | "%");
  } else if (key === "n") {
    calculator.inputNegate();
  }
});
