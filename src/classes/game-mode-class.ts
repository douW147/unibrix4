"use strict"

class GameMode {
    private _isGameVsComputer: boolean;
    constructor() {
        this._isGameVsComputer = false;
    }

    get isGameVsComputer() {
        return this._isGameVsComputer;
    }

    set isGameVsComputer(newIsGameVsComputerValue) {
        this._isGameVsComputer = newIsGameVsComputerValue;
    }

    isPlayerVsPlayerGameMode() {
        return this._isGameVsComputer;
    }

    isPlayerVsComputerGameMode() {
        return !this._isGameVsComputer;
    }
}

export default GameMode;