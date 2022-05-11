// CALCULATOR JS

const WRAP = document.querySelector('.wrap');
const BTNS = ['Delete', 'Backspace', ' ', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', 'Enter'];

let textArea = document.createElement('textarea');
textArea.classList.add('display');
textArea.setAttribute("readonly", "readonly"); 
WRAP.appendChild(textArea);

let virtKeyboard = document.createElement('div');
virtKeyboard.id = 'keyboard';
WRAP.appendChild(virtKeyboard);

initKeyboard ();
let result = 0;

// INITKEYBOARD 
function initKeyboard () {
    textArea.textContent = "0";
    virtKeyboard.classList.add('keyboard');
    BTNS.forEach(el => {virtKeyboard.appendChild(createButtons(el));});    
}
// CREATEBUTTONS
function createButtons (key) {
    let btnGenerated = document.createElement('div');
    btnGenerated.classList.add('letter-key');
    if(key === 'Enter') {btnGenerated.classList.add('big-btn')};
    btnGenerated.id = key;
    if(key === 'Delete') {btnGenerated.textContent = "AC"}
    else if(key === 'Backspace') {btnGenerated.textContent = "\u21E6"}
    else if(key === ' ') {btnGenerated.textContent = "\u0025"}
    else if(key === '*') {btnGenerated.textContent = "\u00D7"}
    else if(key === 'Enter') {btnGenerated.textContent = "\u003D"}
    else {btnGenerated.textContent = key};
    return btnGenerated;
}; 

// LISTENER KEYBOARD
document.addEventListener('keydown', event => {  
    if(BTNS.includes(event.key)) {
            document.getElementById(event.key).classList.add('pressed');

        switch(event.key) {
            case "Backspace":
                let lastSymbol = textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length);
                if(arr.includes(lastSymbol)) { // + <
                    character = "";
                }
                if (textArea.textContent.length === 1 ||                                                // 1 <
                    textArea.textContent.length === 2 && textArea.textContent.substring(0, 1) == "-") { // -1 <
                    textArea.textContent = "0";
                    character = "";
                    firstNumber = "";
                } 
                else {
                    textArea.textContent = textArea.textContent.substring(0, textArea.textContent.length-1);
                    if (textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length) == ".") { // 11. <
                        if (!character) {
                            firstNumber = Number(textArea.textContent.substring(0, textArea.textContent.length));
                        }
                        textArea.textContent = textArea.textContent.substring(0, textArea.textContent.length-1);
                    } 
                    else {                                                                                                    // 11 <
                        if (!character) {
                            firstNumber = Number(textArea.textContent.substring(0, textArea.textContent.length));
                            if(firstNumber == 0) {                                                                           // 0.00001 <
                                textArea.textContent = "0";
                            }
                        }
                    }
                }
            break;
            case "Delete":
                textArea.textContent = "0";
                character = "";
                firstNumber = "";
            break;
            case "Enter":
                if(firstNumber === "") {// =
                    textArea.textContent = `${textArea.textContent}`;
                    firstNumber = Number(0);    
                } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + =
                    result = calculation(firstNumber, firstNumber, character);
                    firstNumber = result;
                    textArea.textContent = `${result}`;
                    character = "";
                } else if (firstNumber && character || firstNumber === 0 && character) { // 2 + 1 =
                    let lengthOfFirst = String(firstNumber).length;
                    secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                    result = calculation(firstNumber, secondNumber, character);
                    textArea.textContent = `${result}`;
                    firstNumber = result;
                    character = "";
                } else { // 2 =
                    textArea.textContent = `${textArea.textContent}`;
                    character = "";
                };
            break;
            case "-": 
            if(firstNumber === "") {// -
                textArea.textContent = `${textArea.textContent}${event.key}`;
                character = "-";
                firstNumber = Number(0);
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + -
                textArea.textContent = `${textArea.textContent.substring(0, textArea.textContent.length-1)}${event.key}`;
                character = "-";
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 - 1 
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character);
                textArea.textContent = `${result}${event.key}`;
                firstNumber = result;
                character = "-";
            } else { // 2 -
                textArea.textContent = `${textArea.textContent}${event.key}`;
                character = "-";
            }; break;
            case "+": 
            if(firstNumber === "") {// +
                textArea.textContent = `${textArea.textContent}${event.key}`;
                character = "+";
                firstNumber = Number(0);
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + +
                textArea.textContent = `${textArea.textContent.substring(0, textArea.textContent.length-1)}${event.key}`;
                character = "+";
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 + 1 
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character);
                textArea.textContent = `${result}${event.key}`;
                firstNumber = result;
                character = "+";
            } 
            else { // 2 +
                textArea.textContent = `${textArea.textContent}${event.key}`;
                character = "+";
            }; break;
            case "*": 
            if(firstNumber === "") {// *
                textArea.textContent = `${textArea.textContent}${event.key}`;
                character = "*";
                firstNumber = Number(0);
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + *
                textArea.textContent = `${textArea.textContent.substring(0, textArea.textContent.length-1)}${event.key}`;
                character = "*";
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 * 1 
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character);
                textArea.textContent = `${result}${event.key}`;
                firstNumber = result;
                character = "*";
            } else { // 2 *
                textArea.textContent = `${textArea.textContent}${event.key}`;
                character = "*";
            }; break;
            case "/": 
            if(firstNumber === "") {// /
                textArea.textContent = `${textArea.textContent}${event.key}`;
                character = "/";
                firstNumber = Number(0);
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + /
                textArea.textContent = `${textArea.textContent.substring(0, textArea.textContent.length-1)}${event.key}`;
                character = "/";
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 / 1 
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character);
                textArea.textContent = `${result}${event.key}`;
                firstNumber = result;
                character = "/";
            } else { // 2 /
                textArea.textContent = `${textArea.textContent}${event.key}`;
                character = "/";
            };
            break;
            // CASE "%"
            case " ": 
            if(firstNumber === "") {// %
                textArea.textContent = `${textArea.textContent}`;
                firstNumber = Number(0)    
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + %
                textArea.textContent = `${textArea.textContent}`;
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 + 1 %
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculationPercent(firstNumber, secondNumber, character);
                textArea.textContent = `${result}`;
                firstNumber = result;
                character = "";
            } else { // 2 %
                result = firstNumber < 0 ? Number(0) : firstNumber / 100;
                textArea.textContent = `${result}`;
                firstNumber = result;
                character = "";
            };
            break;
            default:
                    if (!character) { //22
                        if (event.key === "." && textArea.textContent.substring(0, 1) == 0) { // 0.
                            firstNumber = 0;
                            textArea.textContent = `${textArea.textContent}${event.key}`;
                        }
                        else if (textArea.textContent == 0 && textArea.textContent.length > 1) { // 0.1 или 0.001
                            textArea.textContent = `${textArea.textContent}${event.key}`;
                        }
                        else if (textArea.textContent == 0 || textArea.textContent == result) { // zeroing
                            textArea.textContent = `${event.key}`
                        }
                        else {
                            textArea.textContent = `${textArea.textContent}${event.key}`; // default
                        }
                        firstNumber = Number(textArea.textContent.substring(0, textArea.textContent.length));
                    }
                    else {                                                                           // ...+ 22
                        textArea.textContent = `${textArea.textContent}${event.key}`;
                    };
                 break;
            }               
    }   
});

//ANIMATION END
virtKeyboard.addEventListener('animationend', (animationEvent) => {
    animationEvent.target.classList.remove('pressed');
})
// CALCULATION FUNCTIONS
function calculation(firstNum, secondNum, char) {
    let res
    if (char == "+") {res = firstNum + secondNum};
    if (char == "-") {res = firstNum - secondNum};
    if (char == "*") {res = firstNum * secondNum}; 
    if (char == "/") {
        if (secondNum === 0) {
            return "divizion by null!"
        } 
        res = Math.round(firstNum / secondNum * 100000000) / 100000000;
    };   
    return res;
};
function calculationPercent(firstNum, secondNum, char) {
    let res
    if (char == "+") {res = firstNum + firstNum * secondNum / 100}
    if (char == "-") {res = firstNum - firstNum * secondNum / 100}
    if (char == "*") {res = firstNum * secondNum / 100} 
    if (char == "/") {res = firstNum / (secondNum / 100)}   
    return res
};

// LISTENER VIRTUAL KEYBOARD
let character = "";
let firstNumber = "";
let secondNumber;
const arr = ["+", "-", "*", "/"];

virtKeyboard.addEventListener('click', event => {
    if(event.target.classList.contains('letter-key')) {
        event.target.classList.add('pressed');
       
    switch(event.target.id) {
            // CASE "BACKSPACE" 
            case "Backspace":
                let lastSymbol = textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length);
                if(arr.includes(lastSymbol)) { // + <
                    character = "";
                }
                if (textArea.textContent.length === 1 ||                                                // 1 <
                    textArea.textContent.length === 2 && textArea.textContent.substring(0, 1) == "-") { // -1 <
                    textArea.textContent = "0";
                    character = "";
                    firstNumber = "";
                } 
                else {
                    textArea.textContent = textArea.textContent.substring(0, textArea.textContent.length-1);
                    if (textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length) == ".") { // 11. <
                        if (!character) {
                            firstNumber = Number(textArea.textContent.substring(0, textArea.textContent.length));
                        }
                        textArea.textContent = textArea.textContent.substring(0, textArea.textContent.length-1);
                    } 
                    else {                                                                                                    // 11 <
                        if (!character) {
                            firstNumber = Number(textArea.textContent.substring(0, textArea.textContent.length));
                            if(firstNumber == 0) {                                                                           // 0.00001 <
                                textArea.textContent = "0";
                            }
                        }
                    }
                }
            break;
   
            // CASE "DELETE"
            case "Delete":
                 textArea.textContent = "0";
                 character = "";
                 firstNumber = "";
            break;
        
            // CASE -
            case "-": 
            if(firstNumber === "") {// -
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "-";
                firstNumber = Number(0);
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + -
                textArea.textContent = `${textArea.textContent.substring(0, textArea.textContent.length-1)}${event.target.id}`;
                character = "-";
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 - 1 
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character);
                textArea.textContent = `${result}${event.target.id}`;
                firstNumber = result;
                character = "-";
            } else { // 2 -
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "-";
            }; break;

            // CASE +
            case "+": 
            if(firstNumber === "") {// +
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "+";
                firstNumber = Number(0);
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + +
                textArea.textContent = `${textArea.textContent.substring(0, textArea.textContent.length-1)}${event.target.id}`;
                character = "+";
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 + 1 
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character);
                textArea.textContent = `${result}${event.target.id}`;
                firstNumber = result;
                character = "+";
            } 
            else { // 2 +
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "+";
            }; break;

            // CASE *
            case "*": 
            if(firstNumber === "") {// *
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "*";
                firstNumber = Number(0);
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + *
                textArea.textContent = `${textArea.textContent.substring(0, textArea.textContent.length-1)}${event.target.id}`;
                character = "*";
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 * 1 
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character);
                textArea.textContent = `${result}${event.target.id}`;
                firstNumber = result;
                character = "*";
            } else { // 2 *
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "*";
            }; break;

            // CASE "/"
            case "/": 
            if(firstNumber === "") {// /
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "/";
                firstNumber = Number(0);
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + /
                textArea.textContent = `${textArea.textContent.substring(0, textArea.textContent.length-1)}${event.target.id}`;
                character = "/";
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 / 1 
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character);
                textArea.textContent = `${result}${event.target.id}`;
                firstNumber = result;
                character = "/";
            } else { // 2 /
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "/";
            };
            break;

            // CASE "="
            case "Enter": 
            if(firstNumber === "") {// =
                textArea.textContent = `${textArea.textContent}`;
                firstNumber = Number(0);    
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + =
                result = calculation(firstNumber, firstNumber, character);
                firstNumber = result;
                textArea.textContent = `${result}`;
                character = "";
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 + 1 =
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character);
                textArea.textContent = `${result}`;
                firstNumber = result;
                character = "";
            } else { // 2 =
                textArea.textContent = `${textArea.textContent}`;
                character = "";
            };
            break;

            // CASE "%"
            case " ": 
            if(firstNumber === "") {// %
                textArea.textContent = `${textArea.textContent}`;
                firstNumber = Number(0)    
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + %
                textArea.textContent = `${textArea.textContent}`;
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 + 1 %
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculationPercent(firstNumber, secondNumber, character);
                textArea.textContent = `${result}`;
                firstNumber = result;
                character = "";
            } else { // 2 %
                result = firstNumber < 0 ? Number(0) : firstNumber / 100;
                textArea.textContent = `${result}`;
                firstNumber = result;
                character = "";
            };
            break;

        default: 
        if (!character) { //22
            if (event.target.id === "." && textArea.textContent.substring(0, 1) == 0) { // 0.
                firstNumber = 0;
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
            }
            else if (textArea.textContent == 0 && textArea.textContent.length > 1) { // 0.1 или 0.001
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
            }
            else if (textArea.textContent == 0 || textArea.textContent == result) { // zeroing
                textArea.textContent = `${event.target.id}`
            }
            else {
                textArea.textContent = `${textArea.textContent}${event.target.id}`; // default
            }
            firstNumber = Number(textArea.textContent.substring(0, textArea.textContent.length));
        }
        else {                                                                           // ...+ 22
            textArea.textContent = `${textArea.textContent}${event.target.id}`;
        };
        break;
    }
    }     
});