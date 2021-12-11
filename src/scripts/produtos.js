import Api from '../controllers/api.js';

const removerBtn = document.getElementById("remover-btn");

const produtosTable = document.getElementById("produtos-table");
var produtosRows = produtosTable.querySelectorAll("tbody tr input[type=checkbox]");
const produtosAllChecker = produtosTable.querySelector("thead input[type=checkbox]");

produtosAllChecker.addEventListener("change", (event) => {
    /** @type {HTMLInputElement} */
    var input = event.target;
    produtosRows.forEach(element => {
        element.checked = input.checked;
    })
    checkIfButtonIsVisible();
})


function buscarProdutos() {
    Api.request("medicamento", "GET")
    .then(produtos => {
        produtosAllChecker.checked = false;
        produtosTable.querySelector("tbody").innerHTML = "";
        produtos.forEach(produto => {
            produtosTable.querySelector("tbody").innerHTML += `
            <tr data-prod-id="${produto.id}">
                <td><input type="checkbox"></td>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
                <td>${produto.descricao}</td>
                <td>
                    <a href="#">Editar</a>
                </td>
            </tr>`;
        });
        produtosRows = produtosTable.querySelectorAll("tbody tr input[type=checkbox]");
        produtosRows.forEach(checkbox => {
            checkbox.addEventListener("change", event => {
                var allOn = true;
                produtosRows.forEach(checkboxB => {
                    if (!checkboxB.checked) allOn = false;
                });
                
                produtosAllChecker.checked = allOn;
                checkIfButtonIsVisible()
            })
        })
    })
    .catch(err => {
        alert("Erro ao buscar medicamentos");
    })
}
buscarProdutos();


const lotesTable = document.getElementById("lotes-table");
var lotesRows = lotesTable.querySelectorAll("tbody tr input[type=checkbox]");
const lotesAllChecker = lotesTable.querySelector("thead input[type=checkbox]");


lotesAllChecker.addEventListener("change", (event) => {
    /** @type {HTMLInputElement} */
    var input = event.target;
    lotesRows.forEach(element => {
        element.checked = input.checked;
    })
    checkIfButtonIsVisible();
})

lotesRows.forEach(checkbox => {
    checkbox.addEventListener("change", event => {
        var allOn = true;
        lotesRows.forEach(checkboxB => {
            if (!checkboxB.checked) allOn = false;
        });
        lotesAllChecker.checked = allOn;
        checkIfButtonIsVisible();
    })
})

function buscarLotes() {
    Api.request("lote/"+sessionStorage.getItem("loja"), "GET")
    .then(lotes => {
        lotesAllChecker.checked = false;
        lotesTable.querySelector("tbody").innerHTML = "";
        lotes.forEach(lote => {
            lotesTable.querySelector("tbody").innerHTML += `
            <tr data-prod-id="${lote.id}">
                <td><input type="checkbox"></td>
                <td>${lote.id}</td>
                <td>${new Date(lote.dtLote).toLocaleDateString()}</td>
                <td>${lote.itemsEstoque.length}</td>
                <td>
                    <a href="#">Editar</a>
                </td>
                
            </tr>`;
        });
        lotesRows = lotesTable.querySelectorAll("tbody tr input[type=checkbox]");
        lotesRows.forEach(checkbox => {
            checkbox.addEventListener("change", event => {
                var allOn = true;
                lotesRows.forEach(checkboxB => {
                    if (!checkboxB.checked) allOn = false;
                });
                
                lotesAllChecker.checked = allOn;
                checkIfButtonIsVisible()
            })
        })
    })
    .catch(err => {
        console.error(err)
        alert("Erro ao buscar medicamentos");
    })
}
buscarLotes();



function checkIfButtonIsVisible() {
    var anyChecked = false;
    produtosRows.forEach(p => {
        if (p.checked) anyChecked = true;
    })
    lotesRows.forEach(l => {
        if (l.checked) anyChecked = true;
    });
    if (anyChecked) {
        removerBtn.style.display = "flex";
    } else {
        removerBtn.style.display = "none";
    }
}



checkIfButtonIsVisible();