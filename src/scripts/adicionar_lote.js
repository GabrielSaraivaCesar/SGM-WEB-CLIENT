const listaDeProdutos = document.getElementById("lista-de-produtos");
var produtosCounter = 0;

const produtos = [
    {
        nome: "Produto 1",
        id: 1
    },
    {
        nome: "Produto 2",
        id: 2
    },
    {
        nome: "Produto 3",
        id: 3
    },
];

function adicionarProduto(){
    var template=`
    <h3> 
        <span class="produto-label">PRODUTO 1</span> 
        <a class="btn-excluir-entrada"> Excluir Entrada</a> 
    </h3>

    <div class="row">
        <input type="hidden" class="txt-produto-id">
        <div class="text-input w-33"> 
            <label>
                NOME DO PRODUTO
                <input readonly autocomplete="off" type="text" placeholder="" class="txt-nome-do-produto">
                <div class="input-items-list">
                    
                </div>
            </label>
        </div>  
        <div class="text-input w-33"> 
            <label>
                QUANTIDADE
                <input autocomplete="off" type="text" placeholder="" class="txt-quantidade">
            </label>
        </div>
        <div class="text-input w-33"> 
            <label>
                DATA DE VENCIMENTO
                <input autocomplete="off" type="date" placeholder="" class="txt-data-de-vencimento">
            </label>
        </div>

    </div>
    `;

    let produtoItem = document.createElement("div");
    produtoItem.classList.add("produto-item");
    produtoItem.innerHTML = template;
    produtosCounter++;
    produtoItem.querySelector(".produto-label").textContent = "Produto " + produtosCounter;
    produtoItem.querySelector(".btn-excluir-entrada").addEventListener("click", () => excluirProduto(produtoItem))
    let itemsList = produtoItem.querySelector(".input-items-list");
    produtos.forEach(produto => {
        let element = document.createElement("div")
        element.innerHTML = `
            <label>
                <input type="radio" name="product-id" value="${produto.id}">
                <span>${produto.nome}</span>
            </label>
        `;
        element.querySelector("input").addEventListener("change", (e) => {
            produtoItem.querySelector(".txt-nome-do-produto").value = e.path[1].innerText; 
            produtoItem.querySelector(".txt-produto-id").value = e.target.value;
        });
        itemsList.appendChild(element);
    });

    listaDeProdutos.appendChild(produtoItem);

}

function excluirProduto(row) {
    listaDeProdutos.removeChild(row);
}

adicionarProduto();