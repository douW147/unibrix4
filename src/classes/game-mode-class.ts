"use strict"

class GameMode {
    private _isGameVsComputer: boolean;
    constructor() {
        this._isGameVsComputer = false;
    }

    get isGameVsComputer(): boolean {
        return this._isGameVsComputer;
    }

    set isGameVsComputer(newIsGameVsComputerValue) {
        this._isGameVsComputer = newIsGameVsComputerValue;
    }

    isPlayerVsPlayerGameMode(): boolean {
        return this._isGameVsComputer;
    }

    isPlayerVsComputerGameMode(): boolean {
        return !this._isGameVsComputer;
    }
}

export default GameMode;