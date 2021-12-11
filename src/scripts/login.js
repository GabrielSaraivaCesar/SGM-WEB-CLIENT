import Api from "../controllers/api.js";


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
    Api.request("usuario/login/", "POST", {email: email.value, senha: senha.value})
    .then(response => {
        console.log(response);
        sessionStorage.setItem("user", JSON.stringify(response));
        sessionStorage.setItem("auth", response.auth);
        window.location.href = "/";
    })
    .catch(err => {
        alert("Email e/ou senha incorretos")
    })
}


loginForm.addEventListener("submit", onLogin);

console.log(Api)