
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
            }
            header[component-root] h1 {
                color: #080C28;
                font-size: 24px;
                padding: 0;
                margin: 0;
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
}


customElements.define('header-component', HeaderComponent);