"use strict";
import { fieldIdName, fieldNameOfGamefieldSize, fieldNameOfCurrentSymbol, fieldNameOfCurrentGameMode, fieldNameOfCellsForWin, firstStepSymbol, initialfieldSize, initialCellsForWin, initialIsGameVsComputer } from "../constants/constants.js";
class GameLocalStorage {
    constructor() {
        this.fieldNameOfGameField = fieldIdName;
        this.fieldNameOfGameFieldSize = fieldNameOfGamefieldSize;
        this.fieldNameOfCurrentSymbol = fieldNameOfCurrentSymbol;
        this.fieldNameOfIsGameVsComputer = fieldNameOfCurrentGameMode;
        this.fieldNameOfCellsForWin = fieldNameOfCellsForWin;
        this.gameLocalStorage = window.localStorage;
    }
    refresh() {
        const field = this.getField();
        for (let cellIndex = 0; cellIndex < field.length; cellIndex++) {
            field[cellIndex] = "";
        }
        console.log(field.join(","));
        this.setGameFieldToLocalStorrage(field.join(",").toString());
    }
    clear() {
        this.gameLocalStorage.clear();
    }
    getfieldSize() {
        return parseInt(this.gameLocalStorage[this.fieldNameOfGameFieldSize]);
    }
    getField() {
        const fieldArray = this.gameLocalStorage[this.fieldNameOfGameField].split(",");
        return fieldArray;
    }
    getCurrentStepSymbol() {
        return this.gameLocalStorage[this.fieldNameOfCurrentSymbol];
    }
    getIsGameVsComputer() {
        return this.gameLocalStorage[this.fieldNameOfIsGameVsComputer];
    }
    getCellsQuantityForWin() {
        return parseInt(this.gameLocalStorage[this.fieldNameOfCellsForWin]);
    }
    setDefaultData() {
        this.setFieldSize(initialfieldSize);
        this.setCurrentStepSymbol(firstStepSymbol);
        this.setIsGameVsComputer(initialIsGameVsComputer);
        this.setCellsQuantityForWin(initialCellsForWin);
    }
    setFieldSize(fieldSize) {
        this.gameLocalStorage[this.fieldNameOfGameFieldSize] = fieldSize;
    }
    setGameFieldToLocalStorrage(value) {
        this.gameLocalStorage.setItem(this.fieldNameOfGameField, value.toString());
    }
    setCurrentStepSymbol(currentSymbol) {
        this.gameLocalStorage[this.fieldNameOfCurrentSymbol] = currentSymbol;
    }
    setIsGameVsComputer(currentGameMode) {
        this.gameLocalStorage[this.fieldNameOfIsGameVsComputer] = currentGameMode;
    }
    setCellsQuantityForWin(newCellSizeForWin) {
        this.gameLocalStorage[this.fieldNameOfCellsForWin] = newCellSizeForWin;
    }
    isOneOfFieldUndefined() {
        return (this.isGameVsComputerUndefined()
            || this.isCurrentStepSymbolUndefined()
            || this.isFieldFromLocalStorrageEmpty()
            || this.isfieldSizeFromLocalStorrageUndefined()
            || this.isCellsForWinUndefined());
    }
    isGameVsComputerUndefined() {
        return this.gameLocalStorage[this.fieldNameOfIsGameVsComputer] === undefined;
    }
    isCurrentStepSymbolUndefined() {
        this.gameLocalStorage[this.fieldNameOfCurrentSymbol] === undefined;
    }
    isFieldFromLocalStorrageEmpty() {
        return this.gameLocalStorage[this.fieldNameOfGameField] === undefined;
    }
    isfieldSizeFromLocalStorrageUndefined() {
        return (this.gameLocalStorage[this.fieldNameOfGameFieldSize] === undefined
            || isNaN(this.gameLocalStorage[this.fieldNameOfGameFieldSize]));
    }
    isCellsForWinUndefined() {
        this.gameLocalStorage[this.fieldNameOfCellsForWin] === undefined;
    }
}
export default GameLocalStorage;
