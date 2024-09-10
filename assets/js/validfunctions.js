import { closeFormModal,showResult } from './modal.js';
import { displayError, deleteError } from './errorfunctions.js';
/** 
 * Validation Functions
 * @param {HTMLElement} input 
 * @param {string} first
 * @param {string} last
 * @param {string} email
 * @param {string} birthday
 * @param {string} quantity //number but in area string
 * @param {boolean} location
 * @param {boolean} checkbox1
 * @param {boolean} checkbox2
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
  console.log("Validation de la ville");
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
  console.log("Validation des conditions");
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

//Validate event `blur` for first,last,email,birthdate and quantity

export function validForm(event) {
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
    console.log(`${input.name} champs validé avec succès.`);
  } catch (error) {
    displayError(input, error.message);
    console.log(`Erreur détectée pour ${input.name} : ${error.message}`);
  }
}
let form; // set global var 

// Fonction init form
export function setForm(f) {
  form = f;
}

//Validate full form 
export function runForm(event) {
  if (!form) {
    console.error("Form n'est pas défini.");
    return;
  }
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
//validCity and validConditions error messages only appear on submit
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
    showResult(); // display modal result
    closeFormModal(); // close modal form if form valid
    console.log("Formulaire validé avec succès !");
  } else {
    console.log("Formulaire invalide, veuillez corriger les erreurs.");
  }
}