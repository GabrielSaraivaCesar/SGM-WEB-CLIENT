
class NavigationComponent extends HTMLElement {
    /** @protected @type {ShadowRoot} */
    _shadow = null;

    /** @public @type {HTMLElement} */
    root = null;

    /** @public @type {object[]} */
    routes = [
        {
            href: ["/", "/index.html"],
            title: "Dashboard",
            icon: "dashboard.svg"
        },
        {
            href: ["/produtos.html"],
            title: "Produtos",
            icon: "produtos.svg"
        },
    ]

    constructor() {
        super();
        this._shadow = this.attachShadow({mode: "open"});
        this._createRoot();
        this._createStyle();
        this._createLogo();
        this._createButtons();
    }


    /** @protected @returns {void} */
    _createRoot() {
        const nav = document.createElement("nav");
        nav.setAttribute("component-root", "");
        this._shadow.appendChild(nav);
        this.root = nav;
    }
    
    /** @protected @returns {void} */
    _createLogo() {
        let logo = document.createElement("div");
        logo.setAttribute("class", "nav-logo");
        const logoStyle = document.createElement("style");
        logoStyle.textContent = `
            .nav-logo {
                height: 128px;
                color: #A4A6B3;
                display: flex;
                align-items: center;
                padding-left: 36px;
            }
        `;

        let logoImg = document.createElement("div");
        logoImg.setAttribute("class", "logo-img");
        let logoImgStyle = document.createElement("style");
        logoImgStyle.textContent = `
            .logo-img {
                width: 24px;
                height: 24px;
                background-color: #DDE2FF;
                margin-right: 16px;
                border-radius: 50px;
            }
        `;
        logoImg.appendChild(logoImgStyle);
        logo.appendChild(logoImg);

        let logoText = document.createElement("span");
        logoText.innerText = "SGM";
        logo.appendChild(logoText);

        logo.appendChild(logoStyle);
        this.root.appendChild(logo);
    }


    _createButtons() {
        let lastA = this.root.querySelectorAll("a");
        lastA.forEach(a => {
            this.root.removeChild(a);
        });


        this.routes.forEach(route => {
            let isActive = false;
            let pathname = window.location.pathname;
            route.href.forEach(href => {
                if (href == pathname) {
                    isActive = true;
                }
            })

            let a = document.createElement("a");
            if (isActive) {
                a.classList.add("active");
            } else {
                a.setAttribute("href", route.href[0]);
            }

            let aImg = document.createElement("img");
            aImg.setAttribute("class", "nav-link-icon");
            let imgStyle = document.createElement("style");
            imgStyle.innerText = `
                .nav-link-icon {
                    margin-right: 8px;
                }
            `;
            aImg.appendChild(imgStyle);
            aImg.setAttribute("src", "/public/svg/"+route.icon);
            a.appendChild(aImg);
            let text = document.createElement("span");
            text.innerText = route.title;
            a.appendChild(text);

            // a.innerText = route.title;
            this.root.appendChild(a);
        });
    }

    /** @protected @returns {void} */
    _createStyle() {
        const style = document.createElement("style");
        style.textContent = `
            nav[component-root] {
                width: 255px;
                height: 100vh;
                background-color: var(--ui-grey-2);
                display: flex;
                flex-direction: column;
            }
            nav a {
                height: 56px;
                display: flex;
                align-items: center;
                justify-content: start;
                color: #A4A6B3;
                text-decoration: none;
                font-size: 16px;
                padding-left: 32px;
                background-color: transparent;
            }
            nav a.active {
                background-color: #9FA2B415; 
                color: #DDE2FF;
                border-left: 3px solid #DDE2FF;
            }
        `;
        this._shadow.appendChild(style);
    }
}


customElements.define('navigation-component', NavigationComponent);