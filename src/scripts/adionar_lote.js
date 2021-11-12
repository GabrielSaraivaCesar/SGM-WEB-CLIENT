function adicionaProduto(){
var template=`<div class="produto-item">
                                            
<h3> 
    <span>PRODUTO 1</span> 
    <a> Excluir Entrada</a> 
</h3>

<div class="row">
    <div class="text-input w-33"> 
        <label>
            NOME DO PRODUTO
            <input autocomplete="off" type="text" placeholder="" class="txt-nome-do-produto">
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

</div>
`
document.getElementById("lista-de-produtos").appendChild

}