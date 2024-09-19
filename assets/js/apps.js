import './editNav.js';
import { launchModal, closeFormModal, closeResultModal } from './modal.js';
import { validForm, setForm, runForm } from './validfunctions.js';
import { getFormDataHistory } from './keepform.js';

// DOM Elements
const modalbg = document.querySelector(".bground");
const popupResult = document.querySelector(".popupResult");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const form = document.forms['reserve'];
const closeResultBtn = document.querySelector(".closeResult");
const btnCloseResult = document.querySelector(".btn-close");
const formdata = document.querySelectorAll(".formData")

// Modal event listeners
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeModalBtn.addEventListener("click", closeFormModal);
closeResultBtn.addEventListener("click", closeResultModal);
btnCloseResult.addEventListener("click", closeResultModal);

// Form validation events
form.querySelectorAll('input').forEach((input) => {
  input.addEventListener('blur', validForm);
});

// start form
setForm(form); 

// Submit event for the form
form.addEventListener('submit', runForm);

//view submission history

  const history = getFormDataHistory();
  console.log('Historique des données du formulaire :', history);

//reset form
  form.reset(formdata);
  
  



