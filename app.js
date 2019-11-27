"use  strict";
const state = {
	isOn: false, 
	isWaiting: false, 
	isCalculating: false, 
	isComplexCalculating: false, 
};

const isWaiting = () => {
	state.isWaiting = true;
};

const isCalculating = () => {
	state.isCalculating = true;
};

const isComplexCalculating = () => {
    state.isComplextCalculating = true;
};

const powerBtn = document.querySelector("#power");
const turnOn = () => {
	state.isOn = true;
powerBtn.style.backgroundColor = "rgb(0, 255, 64)";
};

const turnOnCalculator = (function() {
    if (state.isOn === false) {
    powerBtn.addEventListener("click", turnOn);}
    })();

let firstValue;
let secondValue;
let thirdValue;
let displayValue;
let operator;
let priorityOperator;
let numbersArray = [];

const displayBox = document.querySelector("#displayBox");
const clearBtn = document.querySelector("#clear");
const operatorBtns = document.querySelectorAll(".operators");
const calculatingBox = document.querySelector("#calculatingBox");

const addNumbersToArray = (number) => {
	numbersArray.push(number);
	return numbersArray;};

const removeNumbersFromArray = () => {
	numbersArray.pop();
	return numbersArray;};

document.querySelectorAll(".numbers").forEach((item) => {
        item.addEventListener("click", (event) => {
            if (state.isOn === true) {        
                displayValue = Number(addNumbersToArray(event.target.value).join(""));
                displayBox.textContent = displayValue;
                state.isWaiting = true;} 
                });
            });

const decimalBtn = document.querySelector(".decimal");
let decimalPressed = false;
decimalBtn.addEventListener("click", () => {
	if (decimalPressed === false) {
		displayValue = Number(addNumbersToArray(decimalBtn.value).join(""));
		displayBox.textContent = displayValue;
		decimalPressed = true;
		} else {return null;}
});

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
            
const operate = (obj) => {
    if (obj.operation === "+") {
        return add(obj.firstNumber, obj.secondNumber);
    } else if (obj.operation === "-") {
        return subtract(obj.firstNumber, obj.secondNumber);
    } else if (obj.operation === "*") {
        return multiply(obj.firstNumber, obj.secondNumber);
    } else if (obj.operation === "/") {
        return divide(obj.firstNumber, obj.secondNumber);
    } else {
        return "Error!";
        };
    };
            
const MathObject = function (operation, firstNumber, secondNumber) {
    this.operation = operation;
    this.firstNumber = firstNumber;
    this.secondNumber = secondNumber;
    };

operatorBtns.forEach((item) => {
    item.addEventListener("click", (event) => {
	decimalPressed = false;
        if (state.isWaiting === true && state.isCalculating === false && state.isComplexCalculating === false) {
            // we have one number and we need one operator to set to the value "operator"
            operator = event.target.id;
            if (operator === "=") {return null;}
            else {
            // numbers we have are pushed into "firstValue"
            firstValue = displayValue;
            calculatingBox.textContent = `${firstValue} ${operator}`;
            displayValue = 0;
            numbersArray = [];
            displayBox.textContent = "";
            state.isCalculating = true;};
        }
        else if (state.isWaiting === true && state.isCalculating === true && state.isComplexCalculating === false) {
            // we have one number, one operator and a second number
            secondValue = displayValue;
            calculatingBox.textContent = `${firstValue} ${operator} ${secondValue}`;
            priorityOperator = event.target.id;
            // if equal is pressed then we evaluate the first two numbers with the operator, 
            if (priorityOperator === "=") {
                    let calcObject = new MathObject(operator, firstValue, secondValue);
                    let result = Number((operate(calcObject)).toFixed(2));
                // display the result and then set that number equal to the firstValue and change isCalculating to false
                    displayBox.textContent = result;
                    displayValue = result;
                    firstValue = result;
                    state.isCalculating = false;
                    secondValue = 0;
                    numbersArray = [];
                    priorityOperator = "";
            } else if (priorityOperator === "+" || priorityOperator === "-") {
            // if + or - is pressed then we evaluate the first two numbers with the operator, 
                    let calcObject = new MathObject(operator, firstValue, secondValue);
                    let result = Number((operate(calcObject)).toFixed(2))
                    displayBox.textContent = result;
                    displayValue = result;
                    firstValue = result;
                    secondValue = 0;
                    numbersArray = [];
                    operator = event.target.id;
                    calculatingBox.textContent = `${firstValue} ${operator}`;
                    priorityOperator = "";
            } else if (priorityOperator === "*" || priorityOperator === "/") {           
            // if * or / is pressed then we set that to the priorityOperator value and change isComplexCalculating to true 
                    calculatingBox.textContent = `${firstValue} ${operator} ${secondValue} ${priorityOperator}`;
                    numbersArray = [];
                    displayBox.textContent = "";
                    displayValue = 0;
                    state.isComplexCalculating = true;
            }
        }
        else if (state.isWaiting === true && state.isCalculating === true && state.isComplexCalculating === true) {
            // we have firstValue, operator, secondValue, priorityOperator and now should have a third value
            thirdValue = displayValue;
            let thirdOperator = event.target.id;
            // if = is pressed then evalaute priorityOperator with secondValue and thirdValue then evaluate result with operator and firstValue
            // if operator is pressed after this then set result to firstValue and change isComplexCalculating === false
            // if number is pressed then clear everything, set isCalculating & isComplexCalculating to false and start from beginning
            if (thirdOperator === "=") {
                calculatingBox.textContent = `${firstValue} ${operator} ${secondValue} ${priorityOperator} ${displayValue}`;
                let calcObject = new MathObject(priorityOperator, secondValue, thirdValue);
                let firstStepResult = operate(calcObject);
                let finalCalcObject = new MathObject(operator, firstValue, firstStepResult);
                let result = Number((operate(finalCalcObject)).toFixed(2));
                displayBox.textContent = result;
                displayValue = result;
                secondValue = 0;
                thirdValue = 0;
                firstValue = result;
                state.isCalculating = false;
                state.isComplexCalculating = false;
                numbersArray = [];
            } else if (thirdOperator === "+" || thirdOperator === "-") {
            // if + or - is pressed then do above but set final result to the new firstValue, change isComplexCalculating === false
                let calcObject = new MathObject(priorityOperator, secondValue, thirdValue);
                let firstStepResult = operate(calcObject);
                let finalCalcObject = new MathObject(operator, firstValue, firstStepResult);
                let result = Number((operate(finalCalcObject)).toFixed(2));
                displayBox.textContent = result;
                displayValue = result;
                calculatingBox.textContent = `${result} ${operator}`;
                secondValue = 0;
                thirdValue = 0;
                firstValue = result;
                state.isComplexCalculating = false;
                numbersArray = [];
                operator = event.target.id;
            } else if (thirdOperator === "*" || thirdOperator === "/") {            
            // if * or / is pressed then evaluate priorityOperator with secondValue and thirdValue and set result to new secondValue, 
            // no state change
                let calcObject = new MathObject(priorityOperator, secondValue, thirdValue);
                let firstStepResult = Number((operate(calcObject)).toFixed(2));
                secondValue = firstStepResult;
                priorityOperator = thirdOperator;
                calculatingBox.textContent = `${firstValue} ${operator} ${secondValue} ${priorityOperator}`;
                displayBox.textContent = "";
                thirdValue = 0;
                numbersArray = [];
            }
        }
});
});

clearBtn.addEventListener("click", () => {
    displayBox.textContent = "";
    displayValue = 0;
    numbersArray = [];
    firstValue = 0;
    secondValue = 0;
    thirdValue = 0;
    state.isCalculating = false;
    calculatingBox.textContent = "";
    state.isComplexCalculating = false;
	decimalPressed = false;
});

const backspaceBTN = document.querySelector("#backspace");
backspaceBTN.addEventListener("mouseup", () => {
	displayValue = removeNumbersFromArray();
        displayBox.textContent = displayValue;
});

powerBtn.addEventListener("click", () => {
	if (state.isWaiting === true) {
		state.isOn = false;
		state.isWaiting = false
		state.isCalculating = false;
		state.isComplexCalculating = false;
		powerBtn.style.backgroundColor = "red";
	}});
