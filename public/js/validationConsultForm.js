function validateForm() {
    
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('pass');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorPass = document.getElementById('errorPass');
    const errorsSummary = document.getElementById('errorsSummary')

    resetErrors([firstNameInput, lastNameInput, emailInput, passInput], [errorFirstName, errorLastName, errorEmail, errorPass], errorsSummary);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
    
    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
    
    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
    }

    if (!checkRequired(passInput.value)) {
        valid = false;
        passInput.classList.add("error-input");
        errorPass.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(passInput.value, 2, 60)) {
        valid = false;
        passInput.classList.add("error-input");
        errorPass.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
    
           

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    
    return valid;
    


}

