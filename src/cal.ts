// Types
type Operator = "+" | "-" | "*" | "/" | "%" | null;

// Interfaces
interface IInputHandler {
  appendNumber(num: string): void;
  appendDecimal(): void;
  negate(): void;
  clear(): void;
  getInput(): string;
  setInput(value: string | number): void;
}

interface IOperatorHandler {
  setOperator(operator: Exclude<Operator, null>, currentInput: string): string;
  calculate(currentInput: string): string;
  reset(): void;
  hasOperator(): boolean;
}

interface ICalculatorFacade {
  inputNumber(num: string): void;
  inputDecimal(): void;
  inputNegate(): void;
  inputClear(): void;
  inputOperator(op: Exclude<Operator, null>): void;
  inputEqual(): void;
  updateDisplay(): void;
}

// Subsystem: Handles input
class InputHandler implements IInputHandler {
  private currentInput: string;

  constructor() {
    this.currentInput = "0";
  }

  appendNumber(num: string): void {
    this.currentInput =
      this.currentInput === "0" ? num : this.currentInput + num;
  }

  appendDecimal(): void {
    if (!this.currentInput.includes(".")) {
      this.currentInput += ".";
    }
  }

  negate(): void {
    if (this.currentInput !== "0") {
      this.currentInput = this.currentInput.startsWith("-")
        ? this.currentInput.slice(1)
        : "-" + this.currentInput;
    }
  }

  clear(): void {
    this.currentInput = "0";
  }

  getInput(): string {
    return this.currentInput;
  }

  setInput(value: string | number): void {
    this.currentInput = value.toString();
  }
}

// Subsystem: Handles operations
class OperatorHandler implements IOperatorHandler {
  private previousInput: string;
  private operator: Operator;

  constructor() {
    this.previousInput = "";
    this.operator = null;
  }

  //   exclude works with unions it's like partial in interface
  setOperator(operator: Exclude<Operator, null>, currentInput: string): string {
    if (this.operator !== null) {
      const result = this.calculate(currentInput);
      this.previousInput = result;
    } else {
      this.previousInput = currentInput;
    }

    this.operator = operator;
    return "0";
  }

  calculate(currentInput: string): string {
    const prev = parseFloat(this.previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return "Error";

    let result: number | string;

    switch (this.operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = parseFloat((prev * current).toFixed(3));
        break;
      case "/":
        result = current === 0 ? "Error" : prev / current;
        break;
      case "%":
        result = prev % current;
        break;
      default:
        return currentInput;
    }

    this.operator = null;
    this.previousInput = "";
    return result.toString();
  }

  reset(): void {
    this.previousInput = "";
    this.operator = null;
  }

  hasOperator(): boolean {
    return this.operator !== null;
  }
}

// 🎯 Facade
export class CalculatorFacade implements ICalculatorFacade {
  private displayElement: HTMLElement;
  private inputHandler: IInputHandler;
  private operatorHandler: IOperatorHandler;

  constructor(displayElement: HTMLElement) {
    this.displayElement = displayElement;
    this.inputHandler = new InputHandler();
    this.operatorHandler = new OperatorHandler();
    this.updateDisplay();
  }

  inputNumber(num: string): void {
    this.inputHandler.appendNumber(num);
    this.updateDisplay();
  }

  inputDecimal(): void {
    this.inputHandler.appendDecimal();
    this.updateDisplay();
  }

  inputNegate(): void {
    this.inputHandler.negate();
    this.updateDisplay();
  }

  inputClear(): void {
    this.inputHandler.clear();
    this.operatorHandler.reset();
    this.updateDisplay();
  }

  inputOperator(op: Exclude<Operator, null>): void {
    const result = this.operatorHandler.setOperator(
      op,
      this.inputHandler.getInput()
    );
    this.inputHandler.setInput(result);
    this.updateDisplay();
  }

  inputEqual(): void {
    if (this.operatorHandler.hasOperator()) {
      const result = this.operatorHandler.calculate(
        this.inputHandler.getInput()
      );
      this.inputHandler.setInput(result);
      this.updateDisplay();
    }
  }

  updateDisplay(): void {
    this.displayElement.textContent = this.inputHandler.getInput();
  }
}
