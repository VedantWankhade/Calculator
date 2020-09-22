//------------------ Calculation components -----------------------

let prevOperator = '';
let prevNumber = 0;
let nextNumber = 0;


//------------------ Selecting dom elements -----------------------

const switchButton = document.querySelector(".switch");
const eqn = document.querySelector(".equation");
const buttons = document.querySelectorAll("button");
const output = document.querySelector(".output");
const btns = document.querySelector(".buttons");

let isSwitchON = false;
toggleSwitch();           // turned off by default
output.innerText = "";


//----------------- Event Listners --------------------------------

btns.addEventListener("click", handleButtonEvent);


//----------------- Utility Methods --------------------------------

function toggleSwitch() {

    clearScreen();
    isSwitchON = !isSwitchON;
    console.log("Switched " + (isSwitchON ? 'OFF': 'ON'));
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i] !== switchButton)
            buttons[i].disabled = isSwitchON;
    }
}

function clearScreen() {

    output.innerText = "";
    eqn.innerText = "";
    prevOperator = "";
    prevNumber = 0;
    nextNumber = 0;

}

function deleteLastDigit() {

    output.innerText = output.innerText.slice(0, output.innerText.length - 1);

}

function appendDigit(digit) {

    output.innerText = output.innerText + digit;

}

function showResult() {

    nextNumber = output.innerText;
    let result = 0;
    eqn.innerText += nextNumber;
    switch (prevOperator) {

        case "+":
            result = parseFloat(prevNumber) + parseFloat(nextNumber);
            break;

        case "-":
            result = parseFloat(prevNumber) - parseFloat(nextNumber);
            break;

        case "*":
            result = parseFloat(prevNumber) * parseFloat(nextNumber);
            break;

        case "/":
            result = parseFloat(prevNumber) / parseFloat(nextNumber);
    }

    output.innerText = result;
}

function setOpAndPrevNum(op) {

    eqn.innerText = "";
    prevNumber = output.innerText;  
    eqn.innerText += prevNumber + op;
    output.innerText = "";
    prevOperator = op;
}

function handleButtonEvent(event) {

    let input = event.target.innerText;
    switch (input) {

        case "ON/OFF":
            toggleSwitch();
            break;
        
        case "AC":
            clearScreen();
            break;

        case "DEL":
            deleteLastDigit();
            break;

        case "+": 
        case "-":
        case "*":
        case "/":
            setOpAndPrevNum(input);
            break;
        
        case "=":
            showResult();
            break;

        default:
            appendDigit(input);
    }
}