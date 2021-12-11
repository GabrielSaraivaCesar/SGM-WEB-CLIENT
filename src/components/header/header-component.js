import Api from '../../controllers/api.js';

class HeaderComponent extends HTMLElement {
    /** @protected @type {ShadowRoot} */
    _shadow = null;

    /** @public @type {HTMLElement} */
    root = null;


    constructor() {
        super();
        this._shadow = this.attachShadow({mode: "open"});
        this._createRoot();
        this._createStyle();
        this._createTitle();
        this._createLojasSelect();
    }


    /** @protected @returns {void} */
    _createRoot() {
        const header = document.createElement("header");
        header.setAttribute("component-root", "");
        this._shadow.appendChild(header);
        this.root = header;
    }
    

    /** @protected @returns {void} */
    _createStyle() {
        const style = document.createElement("style");
        style.textContent = `
            header[component-root] {
                width: 100%;
                margin-bottom: 50px;
                display: flex;
                justify-content: space-between;
            }
            header[component-root] h1 {
                color: #080C28;
                font-size: 24px;
                padding: 0;
                margin: 0;
            }
            header[component-root] label select {
                width: 200px;
                margin-left: 20px;
                height: 30px;
                border: 1px solid rgba(0,0,0,0.15);
                border-radius: 4px;
            }
        `;
        this._shadow.appendChild(style);
    }

    /** @protected @returns {void} */
    _createTitle() {
        const title = document.createElement("h1");
        title.innerText = this.getAttribute("title") || "";
        this.root.appendChild(title);
    }

    /** @protected @returns {void} */
    _createLojasSelect() {
        const label = document.createElement("label");
        const select = document.createElement("select");
        label.innerText = "Loja Atual:"
        label.appendChild(select);
        this.root.appendChild(label);
        Api.request("UsuarioLoja/1", "GET")
        .then(response => {
            response.forEach(loja => {
                const option = document.createElement("option");
                option.value = loja.id;
                option.innerText = loja.nome;
                select.appendChild(option);
            });
            let currentLoja = sessionStorage.getItem("loja");
            if (!currentLoja) {
                currentLoja = response[0].id;
                sessionStorage.setItem("loja", currentLoja);
            }
            select.value = currentLoja;
        })
        .catch(err => {

        });

        select.addEventListener("change", e => {
            sessionStorage.setItem("loja", e.target.value);
            window.location.href = window.location.href;
        });
    }
}


customElements.define('header-component', HeaderComponent);