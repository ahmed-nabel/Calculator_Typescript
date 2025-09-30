type Operator = "+" | "-" | "*" | "/" | "%" | null;
interface ICalculatorFacade {
    inputNumber(num: string): void;
    inputDecimal(): void;
    inputNegate(): void;
    inputClear(): void;
    inputOperator(op: Exclude<Operator, null>): void;
    inputEqual(): void;
    updateDisplay(): void;
}
export declare class CalculatorFacade implements ICalculatorFacade {
    private displayElement;
    private inputHandler;
    private operatorHandler;
    constructor(displayElement: HTMLElement);
    inputNumber(num: string): void;
    inputDecimal(): void;
    inputNegate(): void;
    inputClear(): void;
    inputOperator(op: Exclude<Operator, null>): void;
    inputEqual(): void;
    updateDisplay(): void;
}
export {};
//# sourceMappingURL=cal.d.ts.map