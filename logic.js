/* eslint-disable no-else-return */
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const displayBox = document.querySelector("#displayBox");
const clearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");
const operatorBtns = document.querySelectorAll(".operators");

let firstNumber;
let operator;

const operate = (obj) => {
    if (obj.operation === "plus") {
        return add(obj.x, obj.y);
    } else if (obj.operation === "minus") {
        return subtract(obj.x, obj.y);
    } else if (obj.operation === "multiply") {
        return multiply(obj.x, obj.y);
    } else if (obj.operation === "divide") {
        return divide(obj.x, obj.y);
    } else {
        return "Error!";
    // eslint-disable-next-line no-extra-semi
    };
};

// show numbers in display box
let displayValue;
let numbersArray = [];
const addNumbersToArray = (number) => {
    numbersArray.push(number);
    return numbersArray;
};

document.querySelectorAll(".numbers").forEach((item) => {
    item.addEventListener("click", (event) => {
        displayValue = Number(addNumbersToArray(event.target.value).join(""));
        displayBox.textContent = displayValue;
    });
});

// clear screen
const clearScreen = () => {
    displayBox.textContent = "";
    numbersArray = [];
    displayValue = 0;
};

const reset = () => {
    displayBox.textContent = "";
    numbersArray = [];
    displayValue = 0;
    firstNumber = 0;
};

clearBtn.addEventListener("click", reset);

operatorBtns.forEach((item) => {
    item.addEventListener("click", (event) => {
        firstNumber = displayValue;
        operator = event.target.value;
        console.log(firstNumber + " " + operator);
        clearScreen();
    });
});

const MathObject = function (operation, x, y) {
    this.operation = operation;
    this.x = x;
    this.y = y;
};

equalsBtn.addEventListener("click", () => {
    let calcObject = new MathObject(operator, firstNumber, displayValue);
    let result = operate(calcObject);
    displayBox.textContent = "";
    displayValue = 0;
    numbersArray = [];
    displayBox.textContent = result;
});
