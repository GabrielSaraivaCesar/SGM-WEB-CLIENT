
/** @type {HTMLInputElement} */
const email = document.getElementById("txt-email");
/** @type {HTMLInputElement} */
const senha = document.getElementById("txt-senha");
/** @type {HTMLFormElement} */
const loginForm = document.getElementById("login-form");

/**
 * @param {Event} event 
 */
function onLogin(event) {
    event.preventDefault();
    location.href = "/";
}


loginForm.addEventListener("submit", onLogin);