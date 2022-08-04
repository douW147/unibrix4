"use strict"

class GameInitializationButton {
    #_isAvailible;
    constructor() {
        this.#_isAvailible = true;
    }

    get isClicked() {
        return this.#_isAvailible;
    }

    set isClicked(isAvailible) {
        this.#_isAvailible = isAvailible;
    }
}

export default GameInitializationButton;