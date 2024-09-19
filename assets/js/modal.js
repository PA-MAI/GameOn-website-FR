// DOM Elements
const modalbg = document.querySelector(".bground");
const popupResult = document.querySelector(".popupResult");

/** 
 * Modal Functions
 */

// launch modal form
export function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
export function closeFormModal() {
  modalbg.style.display = "none";
}

// show result
export function showResult() {
  popupResult.style.display = 'flex';
  
}

// close result modal
export function closeResultModal() {
  popupResult.style.display = "none";
}