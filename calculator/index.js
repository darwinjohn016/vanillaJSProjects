const previousOperand = document.querySelector('.previous-operand');
const currentOperand = document.querySelector('.current-operand');

const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');

const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');

const equalsBtn = document.querySelector('[data-equals]');

numberBtn.forEach(btn => btn.addEventListener('click',inputNumber));
operatorBtn.forEach(btn => btn.addEventListener('click',inputOperator));
equalsBtn.addEventListener('click', doArithmeticOperation);

clearBtn.addEventListener('click',allClear);
deleteBtn.addEventListener('click',inputDelete);

function allClear()
{
    previousOperand.value = "";
    currentOperand.value = "";
}

function inputDelete()
{
    currentOperand.value = currentOperand.value.slice(0,currentOperand.value.length-1); 
}

function inputNumber(e)
{
    let number = e.target.textContent;
    let negativeSign = e.target.value;

    if(number === "." ) inputDecimalPoint(number)
    
    else if(negativeSign) inputNegativeSign(negativeSign); 

    else if(number === "%") percentage();

    else displayCurrent(number);

}

function inputDecimalPoint(number)
{
    currentOperand.value.includes(number) ? 
        currentOperand.value = currentOperand.value.replace(".", "")
        : currentOperand.value += number;
}

function inputNegativeSign(negativeSign)
{
    if(currentOperand.value !== "")
        currentOperand.value.includes(negativeSign) ? 
            currentOperand.value = currentOperand.value.replace(negativeSign,"")
            : currentOperand.value = negativeSign + currentOperand.value;

    else if(previousOperand.value !== "")
        previousOperand.value.indexOf(negativeSign) === 0 ? 
            previousOperand.value = previousOperand.value.replace(negativeSign,"")
            : previousOperand.value = negativeSign + previousOperand.value;
}

function percentage()
{
    if(currentOperand.value !== "") currentOperand.value = currentOperand.value / 100;
    else if(previousOperand.value !== "") previousOperand.value = (parseFloat(previousOperand.value) / 100).toString();
}

function inputOperator(e)
{
    let operator = e.target.textContent;
    
    if(previousOperand.value === "" && currentOperand.value === "") return;
    
    if(previousOperand.value === "") displayPrevious(operator);

    if(currentOperand.value !== "") doArithmeticOperation(operator);

    if(previousOperand.value.includes("+") || previousOperand.value.includes("-") || previousOperand.value.includes("*") 
    || previousOperand.value.includes("/") || previousOperand.value.indexOf("-") === 0)
        previousOperand.value = previousOperand.value.slice(0,previousOperand.value.length-1) + operator;
    
    else previousOperand.value += operator;
}

function numberFormat(value)
{
    return new Intl.NumberFormat('en-US',{maximumFractionDigits:20}).format(value);
}

function reverseNumberFormat(value)
{
    return value.replaceAll(',','');
}

function doArithmeticOperation(operator)
{

    if(currentOperand.value === "") return;

    let operatorSign = previousOperand.value.slice(previousOperand.value.length-1,previousOperand.value.length);

    if(operatorSign !== "+" && operatorSign !== "-" && operatorSign !== "*" && operatorSign !== "/") return;

    previousOperand.value = reverseNumberFormat(previousOperand.value);
    currentOperand.value = reverseNumberFormat(currentOperand.value);

    previousOperand.value = previousOperand.value.slice(0,previousOperand.value.length-1);


    if(operatorSign === "+") previousOperand.value = parseFloat(previousOperand.value) + parseFloat(currentOperand.value);

    else if(operatorSign === "-") previousOperand.value = parseFloat(previousOperand.value) - parseFloat(currentOperand.value);

    else if(operatorSign === "*") previousOperand.value = parseFloat(previousOperand.value) * parseFloat(currentOperand.value);
        
    else if(operatorSign === "/") previousOperand.value = parseFloat(previousOperand.value) / parseFloat(currentOperand.value);
    
    previousOperand.value = numberFormat(previousOperand.value);

    if(operator === "+" || operator === "-" || operator === "*" || operator === "/" ) previousOperand.value += operator;

    currentOperand.value = "";

}

function displayPrevious(operator)
{
    previousOperand.value = currentOperand.value;
    previousOperand.value += operator;
    currentOperand.value = "";
}

function displayCurrent(number)
{
    currentOperand.value += number;
    currentOperand.value = reverseNumberFormat(currentOperand.value);
    currentOperand.value = numberFormat(currentOperand.value);
}




