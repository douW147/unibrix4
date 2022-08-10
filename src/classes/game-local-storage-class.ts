"use strict"

import {
    fieldIdName, 
    fieldNameOfGamefieldSize, 
    fieldNameOfCurrentSymbol, 
    fieldNameOfCurrentGameMode,
    fieldNameOfCellsForWin,
    firstStepSymbol,
    initialfieldSize,
    initialCellsForWin,
    initialIsGameVsComputer
} from "../constants/constants.js";

class GameLocalStorage {
    private fieldNameOfGameField: string;
    private gameLocalStorage: Storage;
    fieldNameOfGameFieldSize: string;
    private fieldNameOfCurrentSymbol: string;
    private fieldNameOfIsGameVsComputer: string;
    private fieldNameOfCellsForWin: string;

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
        console.log(field.join(","))
        this.setGameFieldToLocalStorrage(field.join(",").toString());
    }

    clear() {
        this.gameLocalStorage.clear();
    }

    getfieldSize(): number {
        return parseInt(this.gameLocalStorage[this.fieldNameOfGameFieldSize]);
    }
    
    getField(): string[] {
        const fieldArray = this.gameLocalStorage[this.fieldNameOfGameField].split(",");
        return fieldArray;
    }

    getCurrentStepSymbol(): string {
        return this.gameLocalStorage[this.fieldNameOfCurrentSymbol];
    }

    getIsGameVsComputer(): string {
        return this.gameLocalStorage[this.fieldNameOfIsGameVsComputer];
    }

    getCellsQuantityForWin(): number {
        return parseInt(this.gameLocalStorage[this.fieldNameOfCellsForWin]);
    }

    setDefaultData() {
        this.setFieldSize(initialfieldSize);
        this.setCurrentStepSymbol(firstStepSymbol);
        this.setIsGameVsComputer(initialIsGameVsComputer);
        this.setCellsQuantityForWin(initialCellsForWin);
    }

    setFieldSize(fieldSize: number) {
        this.gameLocalStorage[this.fieldNameOfGameFieldSize] = fieldSize;
    }

    setGameFieldToLocalStorrage(value: string) {
        this.gameLocalStorage.setItem(this.fieldNameOfGameField, value.toString());
    }

    setCurrentStepSymbol(currentSymbol: string) {
        this.gameLocalStorage[this.fieldNameOfCurrentSymbol] = currentSymbol;
    }

    setIsGameVsComputer(currentGameMode: boolean) {
        this.gameLocalStorage[this.fieldNameOfIsGameVsComputer] = currentGameMode;
    }

    setCellsQuantityForWin(newCellSizeForWin: number) {
        this.gameLocalStorage[this.fieldNameOfCellsForWin] = newCellSizeForWin;
    }

    isOneOfFieldUndefined() {
        return (
            this.isGameVsComputerUndefined() 
            || this.isCurrentStepSymbolUndefined()
            || this.isFieldFromLocalStorrageEmpty()
            || this.isfieldSizeFromLocalStorrageUndefined()
            || this.isCellsForWinUndefined()
        );
    }

    isGameVsComputerUndefined() {
        return this.gameLocalStorage[this.fieldNameOfIsGameVsComputer] === undefined;
    }

    isCurrentStepSymbolUndefined() {
        this.gameLocalStorage[this.fieldNameOfCurrentSymbol] === undefined;
    }

    isFieldFromLocalStorrageEmpty() {
        return this.gameLocalStorage[this.fieldNameOfGameField]  === undefined;
    }

    isfieldSizeFromLocalStorrageUndefined() {
        return (this.gameLocalStorage[this.fieldNameOfGameFieldSize] === undefined
        || isNaN(this.gameLocalStorage[this.fieldNameOfGameFieldSize])
        );
    }
    
    isCellsForWinUndefined() {
        this.gameLocalStorage[this.fieldNameOfCellsForWin] === undefined;
    }
}

export default GameLocalStorage;