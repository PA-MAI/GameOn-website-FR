/** 
 * Modal Functions
 */

// launch modal form
export function launchModal() {
  document.querySelector(".bground").style.display = "block";
}

// close modal event
export function closeFormModal() {
  document.querySelector(".bground").style.display = "none";
}

// show result
export function showResult() {
  document.querySelector(".popupResult").style.display = 'flex';
}

// close result modal
export function closeResultModal() {
  document.querySelector(".popupResult").style.display = "none";
}