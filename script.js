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
            let old = textArea.textContent
            document.getElementById(event.key).classList.add('pressed')
            switch(event.key) {
                case "Backspace": textArea.textContent = old.substring(0, old.length-1); break;
                case "Delete": textArea.textContent = "0"; break;
                case "Enter": textArea.textContent = old + "\n"; break;
                
                default: textArea.textContent = `${old}${event.key}`; break;
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
    if (char == "+") {res = firstNum + secondNum}
    if (char == "-") {res = firstNum - secondNum}
    if (char == "*") {res = firstNum * secondNum} 
    if (char == "/") {res = Math.round(firstNum / secondNum * 100000000) / 100000000}   
    return res
}

function calculationPercent(firstNum, secondNum, char) {
    let res
    if (char == "+") {res = firstNum + firstNum * secondNum / 100}
    if (char == "-") {res = firstNum - firstNum * secondNum / 100}
    if (char == "*") {res = firstNum * secondNum / 100} 
    if (char == "/") {res = firstNum / (secondNum / 100)}   
    return res
}

// LISTENER VIRTUAL KEYBOARD
let character = "";
let firstNumber = "";
let secondNumber;

const arr = ["+", "-", "*", "/"]
virtKeyboard.addEventListener('click', event => {
    
    
    if(event.target.classList.contains('letter-key')) {
        event.target.classList.add('pressed');
       
    switch(event.target.id) {
            // CASE "BACKSPACE" 
            case "Backspace":
                let lastSymbol = textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length);
                if(arr.includes(lastSymbol)) { // + <
                    character = ""
                }
                else if (textArea.textContent.length === 1 ||        // 1 <
                    textArea.textContent.length === 2 && textArea.textContent.substring(0, 1) == "-") { // 1- <
                    textArea.textContent = "0";
                    character = "";
                    firstNumber = "";
                } 
                else {
                    textArea.textContent = textArea.textContent.substring(0, textArea.textContent.length-1);
                    if (textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length) == ".") { // 11. <
                        console.log('была точка', character)
                        if (!character) {firstNumber = Number(textArea.textContent.substring(0, textArea.textContent.length));}
                        textArea.textContent = textArea.textContent.substring(0, textArea.textContent.length-1);
                        if (textArea.textContent.length === 0) {
                            textArea.textContent = "0";
                            character = "";
                            firstNumber = "";
                        }
                    } 
                    else {
                        if (!character) {firstNumber = Number(textArea.textContent.substring(0, textArea.textContent.length));}
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
                console.log('- *1') 
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "-";
                firstNumber = Number(0)
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + -
                console.log('- *2') 
                textArea.textContent = `${textArea.textContent.substring(0, textArea.textContent.length-1)}${event.target.id}`;
                character = "-";
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 - 1 
                console.log('- *3')
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character)
                
                textArea.textContent = `${result}${event.target.id}`;
                firstNumber = result;
                character = "-";
            } else { // 2 -
                console.log('- *4')
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "-";
            }; break;

            // CASE +
            case "+": 
            if(firstNumber === "") {// +
                console.log('+ *1') 
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "+";
                firstNumber = Number(0)
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + +
                console.log('+ *2') 
                textArea.textContent = `${textArea.textContent.substring(0, textArea.textContent.length-1)}${event.target.id}`;
                character = "+";
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 + 1 
                console.log('+ *3')
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character)
                textArea.textContent = `${result}${event.target.id}`;
                firstNumber = result;
                character = "+";
            } 
            else { // 2 +
                console.log('+ *4')
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "+";
            }; break;

            // CASE *
            case "*": 
            if(firstNumber === "") {// *
                console.log('* *1') 
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "*";
                firstNumber = Number(0)
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + *
                console.log('* *2') 
                textArea.textContent = `${textArea.textContent.substring(0, textArea.textContent.length-1)}${event.target.id}`;
                character = "*";
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 * 1 
                console.log('* *3')
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character)
                textArea.textContent = `${result}${event.target.id}`;
                firstNumber = result;
                character = "*";
            } else { // 2 *
                console.log('* *4')
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "*";
            }; break;

            // CASE "/"
            case "/": 
            if(firstNumber === "") {// /
                console.log('/ *1') 
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "/";
                firstNumber = Number(0)
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + /
                console.log('/ *2') 
                textArea.textContent = `${textArea.textContent.substring(0, textArea.textContent.length-1)}${event.target.id}`;
                character = "/";
            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 / 1 
                console.log('/ *3')
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character)
                textArea.textContent = `${result}${event.target.id}`;
                firstNumber = result;
                character = "/";
            } else { // 2 /
                console.log('/ *4')
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                character = "/";
            }; break;

            // CASE "="
            case "Enter": 
            if(firstNumber === "") {// =
                console.log('= *1') 
                textArea.textContent = `${textArea.textContent}`;
                firstNumber = Number(0)
                
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + =
                console.log('= *2') 
                result = calculation(firstNumber, firstNumber, character)
                firstNumber = result;
                textArea.textContent = `${result}`;
                character = "";

            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 + 1 =
                console.log('= *3')
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculation(firstNumber, secondNumber, character)
                
                textArea.textContent = `${result}`;
                firstNumber = result;
                character = "";

            } else { // 2 =
                console.log('= *4')
                textArea.textContent = `${textArea.textContent}`;
                character = "";
            }; break;

            // CASE "%"
            case " ": 
            if(firstNumber === "") {// %
                console.log('% *1') 
                textArea.textContent = `${textArea.textContent}`;
                firstNumber = Number(0)
                
            } else if (arr.includes(textArea.textContent.substring(textArea.textContent.length-1, textArea.textContent.length))) {// + %
                console.log('= *2') 
                textArea.textContent = `${textArea.textContent}`;

            } else if (firstNumber && character || firstNumber === 0 && character) { // 2 + 1 %
                console.log('= *3')
                let lengthOfFirst = String(firstNumber).length;
                secondNumber = Number(textArea.textContent.substring(lengthOfFirst+1, textArea.textContent.length));
                result = calculationPercent(firstNumber, secondNumber, character)
                textArea.textContent = `${result}`;
                firstNumber = result;
                character = "";

            } else { // 2 %
                console.log('= *4')
                result = firstNumber < 0 ? Number(0) : firstNumber / 100;
                textArea.textContent = `${result}`;
                firstNumber = result;
                character = "";
            }; break;

            // CASE "."
            // case ".":
            //     console.log('textArea.textContent.length', textArea.textContent.length)
            //     if (textArea.textContent.length === 1 && !firstNumber) {
            //         textArea.textContent = `${textArea.textContent}${event.target.id}`;
            //         firstNumber = Number(textArea.textContent.substring(0, textArea.textContent.length));
            //     }
            //     console.log('textArea.textContent.length', textArea.textContent.length)
            // break;

        default: 
        if (!character) { //22
            if (textArea.textContent == 0  || textArea.textContent === result) {
                textArea.textContent = `${event.target.id}`
                console.log('LETTER 1')
            }
            else {
                textArea.textContent = `${textArea.textContent}${event.target.id}`;
                console.log('LETTER 2')
            }
            firstNumber = Number(textArea.textContent.substring(0, textArea.textContent.length));
        }
        
        else if(character) { // ...+ 22
            textArea.textContent = `${textArea.textContent}${event.target.id}`;
        }
        
        else {
            console.log('else')
            textArea.textContent = "";
            textArea.textContent = (textArea.textContent == 0) ? `${event.target.id}` : `${textArea.textContent}${event.target.id}`;
        }
        break;
    }
    }   
    console.log(`firstNumber${firstNumber} character${character} secondNumber${secondNumber} result${result}`)   
});
