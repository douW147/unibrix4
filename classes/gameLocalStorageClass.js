"use strict"

import {fieldIdName, fieldNameOfGameFieldSize} from "../constants/constants.js";

class GameLocalStorage {
    constructor() {
        this.#fieldNameOfGameField = fieldIdName;
        this.#gameLocalStorage = window.localStorage;
        this.#fieldNameOfGameFieldSize = fieldNameOfGameFieldSize;
    }

    refresh() {
        const field = this.getField();
        for (let cellIndex = 0; cellIndex < field.length; cellIndex++) {
            field[cellIndex] = "";
        }
        this.setGameFieldToLocalStorrage(field.join(","));
    }

    isFieldSizeFromLocalStorrageUndefined() {
        return this.gameLocalStorage[fieldNameOfGameFieldSize]  === undefined;
    }

    isFieldFromLocalStorrageEmpty() {
        return this.gameLocalStorage[this.fieldNameOfGameField]  === undefined;
    }

    getFieldSize() {
        return this.gameLocalStorage[fieldNameOfGameFieldSize];
    }
    
    getField() {
        const fieldArray = this.gameLocalStorage[this.fieldNameOfGameField].split(",");
        return fieldArray;
    }

    setFieldSize(fieldSize) {
        this.gameLocalStorage[fieldNameOfGameFieldSize] = fieldSize;
    }

    setGameFieldToLocalStorrage(value) {
        this.gameLocalStorage.setItem(this.fieldNameOfGameField, value);
    }
}

export default GameLocalStorage;