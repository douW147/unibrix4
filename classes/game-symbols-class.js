"use strict"

import {firstStepSymbol, secondStepSymbol} from "../constants/constants.js";

class GameSymbols {
    #firstStepSymbol;
    #secondStepSymbol;
    #currentStepSymbol
    constructor() {
        this.#firstStepSymbol = firstStepSymbol;
        this.#secondStepSymbol = secondStepSymbol;
        this.#currentStepSymbol = this.firstStepSymbol;
    }

    refresh() {
        this.#currentStepSymbol = this.#firstStepSymbol;
    }

    get firstStepSymbol () {
        return this.#firstStepSymbol;
    }

    get currentStepSymbol() {
        return this.#currentStepSymbol;
    }

    set currentStepSymbol(stepSymbol) {
        this.#currentStepSymbol = stepSymbol;
    }

    toggleCurrentStepSymbol() {
        this.#currentStepSymbol = this.#currentStepSymbol === this.#secondStepSymbol
            ? this.#firstStepSymbol
            : this.#secondStepSymbol;
    }
}

export default GameSymbols;