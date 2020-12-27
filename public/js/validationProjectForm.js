function validateForm() {
    
    const numberInput= document.getElementById('number');
    const nameInput = document.getElementById('name');
    const dateInput = document.getElementById('date');
    const locationInput = document.getElementById('location');

    const errorNumber = document.getElementById('errorNumber');
    const errorName = document.getElementById('errorName');
    const errorDate = document.getElementById('errorDate');
    const errorLocation = document.getElementById('errorLocation');
    const errorsSummary = document.getElementById('errorsSummary')

    let valid = true;
    
    if (!checkRequired(numberInput.value)) {
        valid = false;
        numberInput.classList.add("error-input");
        errorNumber.innerText = "Pole jest wymagane";
    } else if (!checkNumber(numberInput.value)) {
        valid = false;
        numberInput.classList.add("error-input");
        errorNumber.innerText = "Pole powinno zawierać numer";
    }
    
    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 60)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
    
    if (!checkRequired(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole jest wymagane";
        } else if (!checkDate(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
        }

    if (!checkRequired(locationInput.value)) {
        valid = false;
        locationInput.classList.add("error-input");
        errorLocation.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(locationInput.value, 2, 60)) {
        valid = false;
        locationInput.classList.add("error-input");
        errorLocation.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
    
    
    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    
    return valid;
    


}

