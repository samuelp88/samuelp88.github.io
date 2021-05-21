let display = '00000000';
let lastNumber = '0';
let operator = '';
const outFunctions = {}

function onload() {
    const displayElement = document.getElementById('display');
    outFunctions.updateDisplay = updateDisplay;
    outFunctions.updateOperator = updateOperator;
    outFunctions.solve = solve;
    outFunctions.clearAll = clearAll;
    outFunctions.clear = clearDisplay;

    console.log(filterZeros('36171+0271773'))

    function filterLeftZeros(string) {
        let startIndex = 0;

        for(let i = 0; i < string.length; i++) {
            if(string[i] != '0') {
                startIndex = i;
                break;
            }
        }
        return string.substring(startIndex);
    }

    function filterZeros(string) {
        let filtered = '';
        let canFilter = true;
        for(let i = 0; i < string.length; i++) {
            if(string[i].match(/[1-9]/) && canFilter) {
                filtered += string[i];
                canFilter = false;
                
            } 
            else if(!canFilter) {
                if(string[i].match(/[^0-9,.]/)) canFilter = true;
                filtered += string[i]
            }
        }

        return filtered
    }

    function updateDisplayElement() {
        displayElement.innerHTML = display;
    }
    
    function updateDisplay(stringNumber) {
        if(display[0] != 0) return false; 
        display = display.substring(stringNumber.length, display.length) + stringNumber;
    
        updateDisplayElement();
    }
    
    function clearDisplay() {
        display = '00000000';
    
        updateDisplayElement()
    }

    function clearAll() {
        lastNumber = '0';
        operator = '';
        clearDisplay();
    }

    function updateOperator(stringOperator) {
        if(operator) solve();
        lastNumber = display;
        operator = stringOperator;
        clearDisplay();
    }

    function solve() {
        if(!lastNumber || !operator) return;
        let firstNumber = Number(filterZeros(lastNumber));
        let secondNumber = Number(filterZeros(display));
        let result = 0;
        switch(operator) {
            case '+': result = addition(firstNumber, secondNumber);
            break;
            case '-': result = subtraction(firstNumber, secondNumber);
            break;
            case '/': result = division(firstNumber, secondNumber);
            break;
            case '*': result = multiplication(firstNumber, secondNumber);
        }
        
        if(String(result).length > 8) result = "ERR0";
        operator = '';
        clearDisplay();
        updateDisplay(`${result}`);
    }

    function addition(one, two) {
        return one + two;
    }

    function subtraction(one, two) {
        return one - two
    }

    function multiplication(one, two) {
        return one * two
    }

    function division(one, two) {
        return one / two
    }
}
