function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
/** 
 *  DOM Elements
 * */

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const form = document.forms['reserve'];
const popupResult = document.querySelector(".popupResult");
const closeResultBtn = document.querySelector(".closeResult");
const btnCloseResult = document.querySelector(".btn-close");


/** 
* Modal Functions
*/

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeModalBtn.addEventListener("click", closeFormModal);
closeResultBtn.addEventListener("click", closeResultModal);
btnCloseResult.addEventListener("click", closeResultModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeFormModal() {
  modalbg.style.display = "none";
}

// close modal result
function closeResultModal() {
  popupResult.style.display = "none";
}

/**
 * Error Handling Functions
  * @param {HTMLElement} input 
 * @param {string} message 
 */

//Display errors messages
function displayError(input, message) {
  let spanErrorMessage = input.parentElement.querySelector(".errorMessage");

  if (!spanErrorMessage) {
    spanErrorMessage = document.createElement("span");
    spanErrorMessage.className = "errorMessage";
    input.parentElement.appendChild(spanErrorMessage);
  }
  spanErrorMessage.innerText = message;
  input.classList.add("errorStyle");
}

//Delete errors messages
function deleteError(input) {
  let spanErrorMessage = input.parentElement.querySelector(".errorMessage");
  if (spanErrorMessage) {
    spanErrorMessage.remove();
  }
  input.classList.remove("errorStyle");
}

/** 
 * Validation Functions
 */

//form field validation with regular expression
function validFirst(first) {
  const firstRegExp = new RegExp("[a-zA-Z\-\.]+");
  if (first.value === "") {
    throw new Error("Le champ prénom est vide.");
  }
  else if (!firstRegExp.test(first.value)) {
    throw new Error("Caractères invalides.");
  } 
  
  else if (first.value.length < 2) {
    throw new Error("Le prénom est trop court.");
  } 
}

function validLast(last) {
  const lastRegExp = new RegExp("[a-zA-Z\-\.]+");
  if (last.value === "") {
    throw new Error("Le champ nom est vide.");
  }
  else if (!lastRegExp.test(last.value)) {
    throw new Error("Caractères invalides.");
  }
  else if (last.value.length < 2) {
    throw new Error("Le nom est trop court.");
  } 
}

function validEmail(email) {
  const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (email.value === "") {
    throw new Error("Le champ email est vide.");
  } else if (!emailRegExp.test(email.value)) {
    throw new Error("L'email n'est pas valide.");
  }
}
//form field validation date of birth between 12 and 80 years old
function validBirthdate(birthdate) {
  if (birthdate.value === "") {
    throw new Error("Le champ date de naissance est vide.");
  }

  const dateNaissance = new Date(birthdate.value);
  const today = new Date();
  let age = today.getFullYear() - dateNaissance.getFullYear();
  const monthDiff = today.getMonth() - dateNaissance.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateNaissance.getDate())) {
    age--;
  }
  
  if (age < 12) {
    throw new Error("Les inscriptions ne sont pas ouvertes aux moins de 12 ans."); 
  }
  if (age > 80) {
    throw new Error("Vous êtes trop vieux pour vous inscrire."); 
  }
}
//form field validation for number between 0 and 50 events
function validQuantity(quantity) {
  const quantityValue = parseInt(quantity.value, 10);
  if (isNaN(quantityValue)) {
    throw new Error("Veuillez entrer un nombre valide.");
  } else if (quantityValue < 0 || quantityValue > 50) {
    throw new Error("Il n'y a pas encore eu plus de 50 événements.");
  }
}
//validation of the required form radio field
function validCity() {
  const radios = document.querySelectorAll('input[name="location"]');
  const radioGroup = radios[0].closest(".formData"); 

  let isChecked = false;

  radios.forEach((radio) => {
    if (radio.checked) {
      isChecked = true;
    }
  });

  if (isChecked) {
    // if checked, delete errors
    radioGroup.classList.remove("radio-group-error");
    const errorMessage = radioGroup.querySelector(".errorMessage");
    if (errorMessage) {
      errorMessage.remove();
    }
  } else {
    // if unchecked, display error
    radioGroup.classList.add("radio-group-error");
    let errorMessage = radioGroup.querySelector(".errorMessage");
    if (!errorMessage) {
      errorMessage = document.createElement("span");
      errorMessage.className = "errorMessage";
      radioGroup.appendChild(errorMessage);
    }
    errorMessage.innerText = "Obligation d'entrer une ville.";
    throw new Error("Obligation d'entrer une ville.");
  }
}
// mandatory condition checkbox validation check
function validConditions() {
  const checkbox = document.querySelector('#checkbox1');
  const checkboxGroup = checkbox.closest(".formData"); 

  if (!checkbox.checked) {
    checkboxGroup.classList.add("checkbox-group-error");
    throw new Error("Le champ d'acceptation conditions d'utilisation est requis.");
  } else {
    checkboxGroup.classList.remove("checkbox-group-error");
  }
}



/**
 * Form Validation*
 */

//Validate event `blur`
function validForm(event) {
  const input = event.target;
  try {
    if (input.name === "first") {
      validFirst(input);
    } else if (input.name === "last") {
      validLast(input);
    } else if (input.name === "email") {
      validEmail(input);
    } else if (input.name === "birthdate") {
      validBirthdate(input);
    } else if (input.name === "quantity") {
      validQuantity(input);
    }
  
    deleteError(input);
    console.log(`${input.name} validé avec succès.`);
  } catch (error) {
    displayError(input, error.message);
    console.log(`Erreur détectée pour ${input.name} : ${error.message}`);
  }
}

//Validate full form 
function runForm(event) {
  event.preventDefault();
  // Reset form validity for each submit 
  let isValid = true;
  // reset errors messages before validation
  form.querySelectorAll(".errorMessage").forEach(error => error.remove());
  form.querySelectorAll(".errorStyle").forEach(input => input.classList.remove("errorStyle"));

  try {
    validFirst(form.first);
    deleteError(form.first);
  } catch (error) {
    displayError(form.first, error.message);
    console.log(`Erreur champ prénom : ${error.message}`);
    isValid = false;
  }

  try {
    validLast(form.last);
    deleteError(form.last);
  } catch (error) {
    displayError(form.last, error.message);
    console.log(`Erreur champ nom : ${error.message}`);
    isValid = false;
  }

  try {
    validEmail(form.email);
    deleteError(form.email);
  } catch (error) {
    displayError(form.email, error.message);
    console.log(`Erreur champ Email : ${error.message}`);
    isValid = false;
  }

  try {
    validBirthdate(form.birthdate);
    deleteError(form.birthdate);
  } catch (error) {
    displayError(form.birthdate, error.message);
    console.log(`Erreur champ Birthdate : ${error.message}`);
    isValid = false;
  }

  try {
    validQuantity(form.quantity);
    deleteError(form.quantity);
  } catch (error) {
    displayError(form.quantity, error.message);
    isValid = false;
  }

  try {
    validCity();
  } catch (error) {
    const radioContainer = form.querySelector('input[name="location"]').closest(".formData");
    const errorMessage = radioContainer.querySelector(".errorMessage");
    if (!errorMessage) {
      const spanError = document.createElement("span");
      spanError.className = "errorMessage";
      spanError.innerText = error.message;
      radioContainer.appendChild(spanError);
    }
    console.log(`Erreur champ ville : ${error.message}`);
    isValid = false;
  }

  try {
    validConditions();
  } catch (error) {
    const checkboxContainer = document.querySelector("#checkbox1").closest(".formData");
    const errorMessage = checkboxContainer.querySelector(".errorMessage");
    if (!errorMessage) {
      const spanError = document.createElement("span");
      spanError.className = "errorMessage";
      spanError.innerText = error.message;
      checkboxContainer.appendChild(spanError);
    }
    isValid = false;
  }

  // if form is valid, display popup result
  if (isValid) {
    console.log("Formulaire validé avec succès !");
    closeFormModal(); // close modal form if form valid
    popupResult.style.display = "flex"; // display modal result
  } else {
    console.log("Formulaire invalide, veuillez corriger les erreurs.");
  }
}

/*
*Event Listeners
*/ 

 //Event city Radio

document.querySelectorAll('input[name="location"]').forEach((radio) => {
  radio.addEventListener('change', function () {
    const radioGroup = this.closest(".formData");
    const errorMessage = radioGroup.querySelector(".errorMessage");

    if (this.checked) {
      if (errorMessage) {
        errorMessage.remove();
      }
      radioGroup.classList.remove("radio-group-error");
    }
  });
});

// Events for checkbox conditions
document.querySelector('#checkbox1').addEventListener('change', function () {
  const checkboxGroup = this.closest(".formData");
  const errorMessage = checkboxGroup.querySelector(".errorMessage");
  
  if (this.checked) {
    if (errorMessage) {
      errorMessage.remove();
    }
    checkboxGroup.classList.remove("checkbox-group-error");
  }
});


// event listener for input on form
form.querySelectorAll('input').forEach((input) => {
  input.addEventListener('blur', validForm); // Validate blur
});

// event listener for submit form
form.addEventListener('submit', runForm);

