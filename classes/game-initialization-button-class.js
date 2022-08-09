"use strict"

import {gameInitializationButtonIdName} from "../constants/constants.js";

class GameInitializationButton {
    #_isAvailible;
    
    constructor() {
        this.#_isAvailible = true;
        this.htmlButton = document.getElementById(gameInitializationButtonIdName)
    }

    get isClicked() {
        return this.#_isAvailible;
    }

    set isClicked(isAvailible) {
        this.#_isAvailible = isAvailible;
    }
}

export default GameInitializationButton;