"use strict"

import {fieldIdName, fieldNameOfGameFieldSize, fieldNameOfCurrentSymbol, fieldNameOfCurrentGameMode} from "../constants/constants.js";

class GameLocalStorage {
    #fieldNameOfGameField;
    #gameLocalStorage;
    #fieldNameOfGameFieldSize;
    #fieldNameOfCurrentSymbol;
    #fieldNameOfIsGameVsComputer;

    constructor() {
        this.#fieldNameOfGameField = fieldIdName;
        this.#fieldNameOfGameFieldSize = fieldNameOfGameFieldSize;
        this.#fieldNameOfCurrentSymbol = fieldNameOfCurrentSymbol;
        this.#fieldNameOfIsGameVsComputer = fieldNameOfCurrentGameMode;
        this.#gameLocalStorage = window.localStorage;
    }

    refresh() {
        const field = this.getField();
        for (let cellIndex = 0; cellIndex < field.length; cellIndex++) {
            field[cellIndex] = "";
        }
        this.setGameFieldToLocalStorrage(field.join(","));
    }

    isFieldSizeFromLocalStorrageUndefined() {
        return (this.#gameLocalStorage[this.#fieldNameOfGameFieldSize] === undefined
        || isNaN(this.#gameLocalStorage[this.#fieldNameOfGameFieldSize])
        );
    }

    isFieldFromLocalStorrageEmpty() {
        return this.#gameLocalStorage[this.#fieldNameOfGameField]  === undefined;
    }

    isCurrentStepSymbolUndefined() {
        this.#gameLocalStorage[this.#fieldNameOfCurrentSymbol] === undefined;
    }

    isGameVsComputerUndefined() {
        return this.#gameLocalStorage[this.#fieldNameOfIsGameVsComputer] === undefined;
    }

    isOneOfFieldUndefined() {
        return (
            this.isGameVsComputerUndefined() 
            || this.isCurrentStepSymbolUndefined()
            || this.isFieldFromLocalStorrageEmpty()
            || this.isFieldSizeFromLocalStorrageUndefined()
        );
    }

    getFieldSize() {
        return this.#gameLocalStorage[this.#fieldNameOfGameFieldSize];
    }
    
    getField() {
        const fieldArray = this.#gameLocalStorage[this.#fieldNameOfGameField].split(",");
        return fieldArray;
    }

    getCurrentStepSymbol() {
        return this.#gameLocalStorage[this.#fieldNameOfCurrentSymbol];
    }

    getIsGameVsComputer() {
        return this.#gameLocalStorage[this.#fieldNameOfIsGameVsComputer];
    }

    setFieldSize(fieldSize) {
        this.#gameLocalStorage[this.#fieldNameOfGameFieldSize] = fieldSize;
    }

    setGameFieldToLocalStorrage(value) {
        this.#gameLocalStorage.setItem(this.#fieldNameOfGameField, value);
    }

    setCurrentStepSymbol(currentSymbol) {
        this.#gameLocalStorage[this.#fieldNameOfCurrentSymbol] = currentSymbol;
    }

    setIsGameVsComputer(currentGameMode) {
        this.#gameLocalStorage[this.#fieldNameOfIsGameVsComputer] = currentGameMode;
    }
      
}

export default GameLocalStorage;