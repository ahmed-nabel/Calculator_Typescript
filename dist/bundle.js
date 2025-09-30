/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cal.ts":
/*!********************!*\
  !*** ./src/cal.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalculatorFacade: () => (/* binding */ CalculatorFacade)
/* harmony export */ });
// Subsystem: Handles input
class InputHandler {
    currentInput;
    constructor() {
        this.currentInput = "0";
    }
    appendNumber(num) {
        this.currentInput =
            this.currentInput === "0" ? num : this.currentInput + num;
    }
    appendDecimal() {
        if (!this.currentInput.includes(".")) {
            this.currentInput += ".";
        }
    }
    negate() {
        if (this.currentInput !== "0") {
            this.currentInput = this.currentInput.startsWith("-")
                ? this.currentInput.slice(1)
                : "-" + this.currentInput;
        }
    }
    clear() {
        this.currentInput = "0";
    }
    getInput() {
        return this.currentInput;
    }
    setInput(value) {
        this.currentInput = value.toString();
    }
}
// Subsystem: Handles operations
class OperatorHandler {
    previousInput;
    operator;
    constructor() {
        this.previousInput = "";
        this.operator = null;
    }
    //   exclude works with unions it's like partial in interface
    setOperator(operator, currentInput) {
        if (this.operator !== null) {
            const result = this.calculate(currentInput);
            this.previousInput = result;
        }
        else {
            this.previousInput = currentInput;
        }
        this.operator = operator;
        return "0";
    }
    calculate(currentInput) {
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current))
            return "Error";
        let result;
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
    reset() {
        this.previousInput = "";
        this.operator = null;
    }
    hasOperator() {
        return this.operator !== null;
    }
}
// 🎯 Facade
class CalculatorFacade {
    displayElement;
    inputHandler;
    operatorHandler;
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.inputHandler = new InputHandler();
        this.operatorHandler = new OperatorHandler();
        this.updateDisplay();
    }
    inputNumber(num) {
        this.inputHandler.appendNumber(num);
        this.updateDisplay();
    }
    inputDecimal() {
        this.inputHandler.appendDecimal();
        this.updateDisplay();
    }
    inputNegate() {
        this.inputHandler.negate();
        this.updateDisplay();
    }
    inputClear() {
        this.inputHandler.clear();
        this.operatorHandler.reset();
        this.updateDisplay();
    }
    inputOperator(op) {
        const result = this.operatorHandler.setOperator(op, this.inputHandler.getInput());
        this.inputHandler.setInput(result);
        this.updateDisplay();
    }
    inputEqual() {
        if (this.operatorHandler.hasOperator()) {
            const result = this.operatorHandler.calculate(this.inputHandler.getInput());
            this.inputHandler.setInput(result);
            this.updateDisplay();
        }
    }
    updateDisplay() {
        this.displayElement.textContent = this.inputHandler.getInput();
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cal */ "./src/cal.ts");

const display = document.getElementById("display");
const calculator = new _cal__WEBPACK_IMPORTED_MODULE_0__.CalculatorFacade(display);
// Handle button clicks
document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        if (!value)
            return;
        if (!isNaN(parseInt(value))) {
            calculator.inputNumber(value);
        }
        else if (value === ".") {
            calculator.inputDecimal();
        }
        else if (value === "AC") {
            calculator.inputClear();
        }
        else if (value === "=") {
            calculator.inputEqual();
        }
        else if (value === "+/-") {
            calculator.inputNegate();
        }
        else if (["+", "-", "*", "/", "%"].includes(value)) {
            calculator.inputOperator(value);
        }
    });
});
// Optional: Keyboard support
document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isNaN(Number(key))) {
        calculator.inputNumber(key);
    }
    else if (key === ".") {
        calculator.inputDecimal();
    }
    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculator.inputEqual();
    }
    else if (key.toLowerCase() === "c" || key === "Escape") {
        calculator.inputClear();
    }
    else if (["+", "-", "*", "/", "%"].includes(key)) {
        calculator.inputOperator(key);
    }
    else if (key === "n") {
        calculator.inputNegate();
    }
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map