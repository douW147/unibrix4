"use strict";
import { gameInitializationButtonIdName } from "../constants/constants.js";
class GameInitializationButton {
    constructor() {
        this.isAvailible = true;
        this.htmlButton = document.getElementById(gameInitializationButtonIdName);
    }
    get isClicked() {
        return this.isAvailible;
    }
    set isClicked(isAvailible) {
        this.isAvailible = isAvailible;
    }
}
export default GameInitializationButton;
