function validateForm() {
    
    const hourInput = document.getElementById('hours');
    const errorHour = document.getElementById('errorIloscGodz');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([hourInput], [errorHour], errorsSummary);

    let valid = true;

    if (!checkRequired(hourInput.value)) {
        valid = false;
        hourInput.classList.add("error-input");
        errorHour.innerText = "Pole jest wymagane";
    } else if (!checkNumber(hourInput.value)) {
        valid = false;
        hourInput.classList.add("error-input");
        errorHour.innerText = "Pole powinno być liczbą";
    } else if (!checkIfNumberPositive(hourInput.value)) {
        valid = false;
        hourInput.classList.add("error-input");
        errorHour.innerText = "Pole powinno być liczbą dodatnią";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    
    return valid;
    
}
