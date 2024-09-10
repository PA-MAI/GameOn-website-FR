let formDataHistory = [];

export function keepFormData(form) {
    const formData = {};

    // get all form fields 
    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach(input => {
        formData[input.name] = input.value; // Stocke value
    });

    // push new data in table formDataHistory
    formDataHistory.push(formData);
    console.log("Données du formulaire sauvegardées :", formData);
}

//option: Function for view submission history
export function getFormDataHistory() {
    return formDataHistory;
}