let formDataHistory = [];

export function keepFormData(form) {
    const formData = {};

    // get all form fields 
    const inputs = form.querySelectorAll("input, select, textarea");

    // object to track the state of radio buttons
    const radioGroups = {}; 

    inputs.forEach(input => {

        if (input.type === 'checkbox') {
            // for checkbox, check data
            formData[input.name] = input.checked ? 'on' : 'off';

        } else if (input.type === 'radio') {
            // for radios, check data
            if (!radioGroups[input.name]) {
                radioGroups[input.name] = 'off'; // Init data to'off'
            }
            if (input.checked) {
                radioGroups[input.name] = input.value;
            }
        } else {
            if (input.name) { 
            formData[input.name] = input.value;
            }
        }

    });

// push radios data on formData
Object.keys(radioGroups).forEach(groupName => {
    formData[groupName] = radioGroups[groupName];
});
 // push new data in table formDataHistory
    formDataHistory.push(formData);
    console.log("Données du formulaire sauvegardées :", formData);
}

//option: Function for view submission history
export function getFormDataHistory() {
    return formDataHistory;
}