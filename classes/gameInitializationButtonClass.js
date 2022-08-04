"use strict"

class GameInitializationButton {
    #_isAvailible;
    constructor() {
        this.#_isAvailible = true;
        this.htmlButton = document.getElementById("gameInitializationButton")
    }

    get isClicked() {
        return this.#_isAvailible;
    }

    set isClicked(isAvailible) {
        this.#_isAvailible = isAvailible;
    }
}

export default GameInitializationButton;