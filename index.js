const billInput = document.getElementById('bill-input');
const tipButtons = document.querySelectorAll('.tips-container button');
const peopleInput = document.getElementById('people-input');
const resetBtn = document.querySelector('.resetBtn');
const tipInput = document.getElementById('tip-input');
const amountElement = document.querySelector('.amount');
const totalElement = document.querySelector('.total');



//events
billInput.addEventListener('input', calcMoney);
peopleInput.addEventListener('input', () => {
    checkPeopleInput();
    calcMoney();
});
tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('selected')) {
            button.classList.remove('selected')
        } else {
            tipButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.toggle('selected');
        }
        tipInput.value = "";
        calcMoney();
    });
});
tipInput.addEventListener('input', () => {
    tipButtons.forEach(button => {
        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
        }
    });
    calcMoney();
});
resetBtn.addEventListener('click', () => {
    billInput.value = "";//
    peopleInput.value = "";//
    tipButtons.forEach(button => button.classList.remove('selected'));
    tipInput.value = "";
    amountElement.textContent = '$0.00';
    totalElement.textContent = '$0.00';
});

//functions
function calcMoney() {
    let totalTip = 0;
    const billValue = billInput.value === "" ? 0 : +billInput.value;
    const tipValue = getTip();
    const peopleValue = peopleInput.value === "" ? 0 : +peopleInput.value;
    checkPeopleInput();
    if (peopleValue == 0 || billValue == 0) return;

    // start calculation
    if (tipValue !== 0) {
        totalTip = (tipValue / 100) * billValue;
    }
    const tipPerPerson = totalTip / peopleInput.value;
    const totalPerPerson = (billValue + totalTip) / peopleInput.value;
    displayResults(tipPerPerson, totalPerPerson);
}

function getTip() {
    const tipButton = document.querySelector('.tips-container button.selected');
    let tipValue = 0;
    if (tipButton) {
        tipValue = tipButton.value;
    } else {
        tipValue = tipInput.value;
    }
    return tipValue === '' ? 0 : tipValue
}

function checkPeopleInput() {
    const peopleValue = +peopleInput.value;
    const invalidMessageElement = document.querySelector('.invalid-message');
    if (peopleValue === 0) {
       peopleInput.classList.add('invalid');
       invalidMessageElement.textContent = "Can't be zero";
    } else {
        invalidMessageElement.textContent = "";
        peopleInput.classList.remove('invalid');
    }
}

function displayResults(tipAmount, total) {
    amountElement.textContent = `$${tipAmount.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}