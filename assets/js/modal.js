function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const form = document.forms['reserve'];
const popupResult = document.querySelector(".popupResult");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeModalBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  if (popupResult) popupResult.style.display = "none"; // close modal result if open
}

/**
 * Display errors messages
 * @param {HTMLElement} input 
 * @param {string} message 
 */
function afficherMessageError(input, message) {
  let spanErrorMessage = input.parentElement.querySelector(".errorMessage");

  if (!spanErrorMessage) {
    spanErrorMessage = document.createElement("span");
    spanErrorMessage.className = "errorMessage";
    input.parentElement.appendChild(spanErrorMessage);
  }
  spanErrorMessage.innerText = message;
  input.classList.add("errorStyle");
}

/**
 * delete errors messages
 * @param {HTMLElement} input 
 */
function effacerMessageError(input) {
  let spanErrorMessage = input.parentElement.querySelector(".errorMessage");
  if (spanErrorMessage) {
    spanErrorMessage.remove();
  }
  input.classList.remove("errorStyle");
}

/** 
 * Validate inputs
 */
function validerPrenom(first) {
  if (first.value === "") {
    throw new Error("Le champ prénom est vide.");
  } else if (first.value.length < 2) {
    throw new Error("Le prénom est trop court.");
  }
}

function validerNom(last) {
  if (last.value === "") {
    throw new Error("Le champ nom est vide.");
  } else if (last.value.length < 2) {
    throw new Error("Le nom est trop court.");
  }
}

function validerEmail(email) {
  const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (email.value === "") {
    throw new Error("Le champ email est vide.");
  } else if (!emailRegExp.test(email.value)) {
    throw new Error("L'email n'est pas valide.");
  }
}

function validerDateNaissance(birthdate) {
  const dateNaissance = new Date(birthdate.value);
  const today = new Date();
  const age = today.getFullYear() - dateNaissance.getFullYear();
  const monthDiff = today.getMonth() - dateNaissance.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateNaissance.getDate())) {
    age--;
  }

  if (birthdate.value === "") {
    throw new Error("Le champ date de naissance est vide.");
  } else if (age < 12) {
    throw new Error("Les inscriptions ne sont pas ouvertes aux moins de 12 ans."); 
  }
    else if (age > 80) {
      throw new Error("Vous êtes trop vieux pour vous inscrire."); 
    }
 
}

function validerQuantite(quantity) {
  const quantityValue = parseInt(quantity.value, 10);
  if (isNaN(quantityValue)) {
    throw new Error("Veuillez entrer un nombre valide.");
  } else if (quantityValue < 0 || quantityValue > 50) {
    throw new Error("Il n'y a pas encore eu plus de 50 événements.");
  }
}

function validerVille() {
  const radios = document.querySelectorAll('input[name="location"]');
  const radioGroup = radios[0].closest(".formData"); // Trouve le conteneur parent

  let isChecked = false;

  radios.forEach((radio) => {
    if (radio.checked) {
      isChecked = true;
    }
  });

  if (isChecked) {
    // Si un bouton est sélectionné, retirer les erreurs
    radioGroup.classList.remove("radio-group-error");
    const errorMessage = radioGroup.querySelector(".errorMessage");
    if (errorMessage) {
      errorMessage.remove();
    }
  } else {
    // Si aucun bouton n'est sélectionné, ajouter une erreur
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

/**
 * Validate event `blur`
 */
function validerChamp(event) {
  const input = event.target;
  try {
    if (input.name === "first") {
      validerPrenom(input);
    } else if (input.name === "last") {
      validerNom(input);
    } else if (input.name === "email") {
      validerEmail(input);
    } else if (input.name === "birthdate") {
      validerDateNaissance(input);
    } else if (input.name === "quantity") {
      validerQuantite(input);
    }
  
    effacerMessageError(input);
  } catch (error) {
    afficherMessageError(input, error.message);
  }
}
function validerConditionsUtilisation() {
  const checkbox = document.querySelector('#checkbox1');
  const checkboxGroup = checkbox.closest(".formData"); // Trouve le conteneur parent

  if (!checkbox.checked) {
    checkboxGroup.classList.add("checkbox-group-error");
    throw new Error("Le champ d'acceptation conditions d'utilisation est requis.");
  } else {
    checkboxGroup.classList.remove("checkbox-group-error");
  }
}
// Gestionnaire d'événements pour les boutons radio
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

// Gestionnaire d'événements pour la checkbox
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


/**
 * Validate full form */
function gererFormulaire(event) {
  event.preventDefault();

  let isValid = true;

  try {
    validerPrenom(form.first);
    effacerMessageError(form.first);
  } catch (error) {
    afficherMessageError(form.first, error.message);
    isValid = false;
  }

  try {
    validerNom(form.last);
    effacerMessageError(form.last);
  } catch (error) {
    afficherMessageError(form.last, error.message);
    isValid = false;
  }

  try {
    validerEmail(form.email);
    effacerMessageError(form.email);
  } catch (error) {
    afficherMessageError(form.email, error.message);
    isValid = false;
  }

  try {
    validerDateNaissance(form.birthdate);
    effacerMessageError(form.birthdate);
  } catch (error) {
    afficherMessageError(form.birthdate, error.message);
    isValid = false;
  }

  try {
    validerQuantite(form.quantity);
    effacerMessageError(form.quantity);
  } catch (error) {
    afficherMessageError(form.quantity, error.message);
    isValid = false;
  }

  try {
    validerVille();
  } catch (error) {
    const radioContainer = document.querySelector(".formData");
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
    validerConditionsUtilisation();
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
    modalbg.style.display = "none"; // close modal form
    popupResult.style.display = "flex"; // display modal result
  }
}

// event listener for input on form
form.querySelectorAll('input').forEach((input) => {
  input.addEventListener('blur', validerChamp); // Validate blur
});

// event listener for submit form
form.addEventListener('submit', gererFormulaire);
