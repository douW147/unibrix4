"use strict"

class GameMode {
    #isGameVsComputer;
    constructor() {
        this.#isGameVsComputer = false;
    }

    get isGameVsComputer() {
        return this.#isGameVsComputer;
    }

    set isGameVsComputer(newIsGameVsComputerValue) {
        this.#isGameVsComputer = newIsGameVsComputerValue;
    }

    isPlayerVsPlayerGameMode() {
        return this.#isGameVsComputer;
    }

    isPlayerVsComputerGameMode() {
        return !this.#isGameVsComputer;
    }
}

export default GameMode;