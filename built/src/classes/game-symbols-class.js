"use strict";
import { firstStepSymbol, secondStepSymbol } from "../constants/constants.js";
class GameSymbols {
    constructor() {
        this._firstStepSymbol = firstStepSymbol;
        this._secondStepSymbol = secondStepSymbol;
        this._currentStepSymbol = this.firstStepSymbol;
    }
    refresh() {
        this._currentStepSymbol = this._firstStepSymbol;
    }
    get firstStepSymbol() {
        return this._firstStepSymbol;
    }
    get currentStepSymbol() {
        return this._currentStepSymbol;
    }
    set currentStepSymbol(stepSymbol) {
        this._currentStepSymbol = stepSymbol;
    }
    toggleCurrentStepSymbol() {
        this._currentStepSymbol = this._currentStepSymbol === this._secondStepSymbol
            ? this._firstStepSymbol
            : this._secondStepSymbol;
    }
}
export default GameSymbols;
