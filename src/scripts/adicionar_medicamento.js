import Api from '../controllers/api.js';

const form = document.getElementById("form");
const txtSku = document.getElementById("txt-sku");
const txtNome = document.getElementById("txt-nome");
const txtPreco = document.getElementById("txt-preco");
const txtDescricao = document.getElementById("txt-descricao");
const btnSubmit = document.getElementById("submit-btn");
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());


form.addEventListener("submit", onSubmit);

function onSubmit(event) {
    event.preventDefault();

    const data = {
        Id: txtSku.value,
        Nome: txtNome.value,
        Descricao: txtDescricao.value,
        Preco: parseFloat(txtPreco.value) 
    }

    if (params.id) { // PUT
        Api.request("medicamento/"+params.id, "PUT", data)
        .then(response => {
            window.location.href = "/produtos.html";
        })
        .catch(err => {
            alert("Erro ao editar medicamento");
            console.error(err);
        });
    } else { // POST
        Api.request("medicamento", "POST", data)
        .then(response => {
            window.location.href = "/produtos.html";
        })
        .catch(err => {
            alert("Erro ao incluir medicamento");
        });
    }
}


if (params.id) {
    btnSubmit.innerText = "EDITAR";
    Api.request("medicamento/"+params.id, "GET")
    .then(response => {
        txtSku.setAttribute("disabled", true);
        txtSku.setAttribute("readonly", true);
        txtSku.value = response.id;
        txtNome.value = response.nome;
        txtPreco.value = response.preco;
        txtDescricao.value = response.descricao;
    })
    .catch(err => {
        alert("Erro ao buscar medicamento");
    })
}