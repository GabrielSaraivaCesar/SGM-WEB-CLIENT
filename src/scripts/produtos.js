const removerBtn = document.getElementById("remover-btn");

const produtosTable = document.getElementById("produtos-table");
const produtosRows = produtosTable.querySelectorAll("tbody tr input[type=checkbox]");
const produtosAllChecker = produtosTable.querySelector("thead input[type=checkbox]");

produtosAllChecker.addEventListener("change", (event) => {
    /** @type {HTMLInputElement} */
    var input = event.target;
    produtosRows.forEach(element => {
        element.checked = input.checked;
    })
    checkIfButtonIsVisible();
})

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


const lotesTable = document.getElementById("lotes-table");
const lotesRows = lotesTable.querySelectorAll("tbody tr input[type=checkbox]");
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