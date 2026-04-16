const module = __fatweaks.namespace("uiManager");

const defaultElement = HTMLElement.prototype;
const defaultFunc = (e = MouseEvent.prototype) => { };

class Button {
    static SKIN_STANDARD = 0b00000001;
    static SKIN_GO = 0b00000010;
    static SKIN_STOP = 0b00000100;
    static SKIN_NUKE = 0b00001000;
    static SKIN_NAVIGATION = 0b00010000;
    static SKIN_FAV = 0b00100000;
    static SKIN_NOTE = 0b01000000;
    static SKIN_DOWNLOADLI = 0b10000000;
    static SKIN_DOWNLOADLO = 0b100000000;

    element;

    #onClick;

    getContent() {
        return this.element.firstElementChild;
    }

    setContent(innerElement = defaultElement) {
        this.element.replaceChildren();
        if (innerElement != null && innerElement != defaultElement)
            this.element.appendChild(innerElement);
    }

    getOnClickListener() {
        return this.#onClick;
    }

    setOnClickListener(onClick = defaultFunc) {
        this.element.removeEventListener("click", this.#onClick);
        this.#onClick = null;
        if (onClick != null && onClick != defaultFunc) {
            this.#onClick = onClick;
            this.element.addEventListener("click", onClick);
        }
    }

    getProps() {
        let props = 0;
        if (this.element.classList.contains("standard")) props |= Button.SKIN_STANDARD;
        if (this.element.classList.contains("go")) props |= Button.SKIN_GO;
        if (this.element.classList.contains("stop")) props |= Button.SKIN_STOP;
        if (this.element.classList.contains("nuke")) props |= Button.SKIN_NUKE;
        if (this.element.classList.contains("navigation")) props |= Button.SKIN_NAVIGATION;
        if (this.element.classList.contains("fav")) props |= Button.SKIN_FAV;
        if (this.element.classList.contains("note")) props |= Button.SKIN_NOTE;
        if (this.element.classList.contains("download-logged-in")) props |= Button.SKIN_DOWNLOADLI;
        if (this.element.classList.contains("download-logged-out")) props |= Button.SKIN_DOWNLOADLO;

        return props;
    }

    setProps(props = 0) {
        this.element.className = "";
        this.element.classList.add("button");
        if (props != null) {
            if (props & Button.SKIN_STANDARD) this.element.classList.add("standard");
            if (props & Button.SKIN_GO) this.element.classList.add("go");
            if (props & Button.SKIN_STOP) this.element.classList.add("stop");
            if (props & Button.SKIN_NUKE) this.element.classList.add("nuke");
            if (props & Button.SKIN_NAVIGATION) this.element.classList.add("navigation");
            if (props & Button.SKIN_FAV) this.element.classList.add("fav");
            if (props & Button.SKIN_NOTE) this.element.classList.add("note");
            if (props & Button.SKIN_DOWNLOADLI) this.element.classList.add("download-logged-in");
            if (props & Button.SKIN_DOWNLOADLO) this.element.classList.add("download-logged-out");
        }
    }

    constructor(innerElement = defaultElement, onClick = defaultFunc, props = 0) {
        this.element = document.createElement("button");

        this.setContent(innerElement);
        this.setOnClickListener(onClick);
        this.setProps(props);
    }
}

module.Button = Button;