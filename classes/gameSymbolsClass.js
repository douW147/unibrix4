"use strict"

import {firstStepSymbol, secondStepSymbol} from "../constants/constants.js";

class GameSymbols {
    #_currentStepSymbol;
    #firstStepSymbol;
    #secondStepSymbol;
    constructor() {
        this.#firstStepSymbol = firstStepSymbol;
        this.#secondStepSymbol = secondStepSymbol;
        this.#_currentStepSymbol = this.firstStepSymbol;
    }

    refresh() {
        this.#_currentStepSymbol = this.#firstStepSymbol;
    }

    get firstStepSymbol () {
        return this.#firstStepSymbol;
    }

    get currentStepSymbol() {
        return this.#_currentStepSymbol;
    }

    set currentStepSymbol(stepsSymbol) {
        this.#_currentStepSymbol = stepsSymbol;
    }

    toggleCurrentStepSymbol() {
        this.#_currentStepSymbol = this.#_currentStepSymbol === this.#secondStepSymbol
            ? this.#firstStepSymbol
            : this.#secondStepSymbol;
    }
}

export default GameSymbols;