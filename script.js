console.log("JavaScript-filen har laddats!");


let storedValue = null;
let storedOperator = null;


function calculate(value1, operator, value2) {
  const num1 = parseFloat(value1);
  const num2 = parseFloat(value2);

  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) {
        alert("Error: Division by zero");
        return null; 
      }
      return num1 / num2;
    default:
      return NaN;
  }
}


const displayInput = document.querySelector('.display input');
const buttons = document.querySelectorAll('.button');


buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.value;
    processInput(value);
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const displayInput = document.querySelector('.display input');
    const buttons = document.querySelectorAll('.button');

    
    function processInput(value) {
        if (/\d|\./.test(value)) { 
            if (displayInput.value === '0' || resetDisplay) {
                displayInput.value = '';
                resetDisplay = false;
            }
            if (value === '.' && displayInput.value.includes('.')) return; 
            displayInput.value += value;
        } else if (value === 'AC') {
            displayInput.value = '0'; 
            resetDisplay = true;
        } else if (value === 'DE') {
            displayInput.value = displayInput.value.slice(0, -1);
            if (displayInput.value === '') displayInput.value = '0';
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (lastOperator && !resetDisplay) {
                displayInput.value = calculate(currentValue, lastOperator, displayInput.value);
            }
            currentValue = displayInput.value;
            lastOperator = value;
            resetDisplay = true;
        } else if (value === '=') {
            if (lastOperator) {
                displayInput.value = calculate(currentValue, lastOperator, displayInput.value);
                lastOperator = null;
                resetDisplay = true;
            }
        }
    }

    
    function calculate(value1, operator, value2) {
        const num1 = parseFloat(value1);
        const num2 = parseFloat(value2);
        switch (operator) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case '*': return num1 * num2;
            case '/': return num2 !== 0 ? num1 / num2 : 'Error: Division by zero';
            default: return NaN;
        }
    }

    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            processInput(button.value);
        });
    });

    
    let currentValue = '';
    let lastOperator = null;
    let resetDisplay = false;

    
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Backspace'];
        if (allowedKeys.includes(key)) {
            event.preventDefault();
            let keyValue = key;
            if (key === 'Enter') keyValue = '=';
            if (key === 'Backspace') keyValue = 'DE';
            processInput(keyValue);
        }
    });
});