"use strict"

import {gameInitializationButtonIdName} from "../constants/constants.js";

class GameInitializationButton {
    private isAvailible: boolean;
    htmlButton: HTMLElement;

    constructor() {
        this.isAvailible = true;
        this.htmlButton = document.getElementById(gameInitializationButtonIdName)
    }

    get isClicked(): boolean {
        return this.isAvailible;
    }

    set isClicked(isAvailible) {
        this.isAvailible = isAvailible;
    }
}

export default GameInitializationButton;