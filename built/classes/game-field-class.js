"use strict";
import { initialCellsForWin } from "../constants/constants.js";
class CellsField {
    constructor(fieldSize) {
        this.field;
        this.fieldSize = fieldSize;
        this.generateField(fieldSize);
        this.gameFieldWithRowAndCols = this.generateFieldWithRowAndCols();
        this.lenghtForWin = initialCellsForWin;
    }
    refresh() {
        this.field.fill("");
    }
    getRandomCellIdForComputerStep() {
        while (true) {
            const randomCellId = Math.floor(Math.random() * this.field.length);
            if (this.isCellEmpty(randomCellId)) {
                return randomCellId;
            }
        }
    }
    getLenghtForWin() {
        return this.lenghtForWin;
    }
    getFieldSize() {
        return this.fieldSize;
    }
    setSymbolToSelectedFieldCell(currentStepSymbol, selectedCellNumber) {
        this.field[selectedCellNumber] = currentStepSymbol;
    }
    setLenghtForWin(newlenghtForWin) {
        this.lenghtForWin = parseInt(newlenghtForWin);
    }
    isCellEmpty(cellNumber) {
        return this.field[cellNumber] === "";
    }
    isAllCellsTaken() {
        return this.field.every((cell) => cell !== "");
    }
    isCellExistsOnField(firstIndex, secondIndex) {
        return (this.gameFieldWithRowAndCols[firstIndex] !== undefined
            && this.gameFieldWithRowAndCols[firstIndex][secondIndex] !== undefined);
    }
    isWinCombination(currentSymbol) {
        this.gameFieldWithRowAndCols = this.generateFieldWithRowAndCols();
        if (this.isWinOnRow(currentSymbol)) {
            return true;
        }
        if (this.isWinOnColumn(currentSymbol)) {
            return true;
        }
        if (this.isWinOnMainDiagonal(currentSymbol)) {
            return true;
        }
        if (this.isWinOnSecondaryDiagonal(currentSymbol)) {
            return true;
        }
        return false;
    }
    isWinOnRow(currentSymbol) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            let currentStrick = 0;
            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                if (this.gameFieldWithRowAndCols[rowIndex][columnIndex] === currentSymbol) {
                    currentStrick++;
                }
                else {
                    currentStrick = 0;
                }
                if (currentStrick === this.lenghtForWin) {
                    return true;
                }
            }
        }
    }
    isWinOnColumn(currentSymbol) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            let currentStrick = 0;
            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                if (this.gameFieldWithRowAndCols[columnIndex][rowIndex] === currentSymbol) {
                    currentStrick++;
                }
                else {
                    currentStrick = 0;
                }
                if (currentStrick === this.lenghtForWin) {
                    return true;
                }
            }
        }
    }
    isWinOnMainDiagonal(currentSymbol) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                let currentStrick = 0;
                for (let indexDelta = 0; indexDelta < this.lenghtForWin + 1; indexDelta++) {
                    const rowShiftedIndex = rowIndex + indexDelta;
                    const columnShiftedIndex = columnIndex + indexDelta;
                    if (this.isCellExistsOnField(rowShiftedIndex, columnShiftedIndex)
                        && this.gameFieldWithRowAndCols[rowShiftedIndex][columnShiftedIndex] === currentSymbol) {
                        currentStrick++;
                    }
                    if (currentStrick === this.lenghtForWin) {
                        return true;
                    }
                }
            }
        }
    }
    isWinOnSecondaryDiagonal(currentSymbol) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                let currentStrick = 0;
                for (let indexDelta = 0; indexDelta < this.lenghtForWin + 1; indexDelta++) {
                    const rowShiftedIndex = rowIndex + indexDelta;
                    const columnShiftedIndex = columnIndex - indexDelta;
                    if (this.isCellExistsOnField(columnShiftedIndex, rowShiftedIndex)
                        && this.gameFieldWithRowAndCols[columnShiftedIndex][rowShiftedIndex] === currentSymbol) {
                        currentStrick++;
                    }
                    if (currentStrick === this.lenghtForWin) {
                        return true;
                    }
                }
            }
        }
    }
    generateField(fieldSize) {
        this.field = new Array(fieldSize * fieldSize).fill("");
        this.fieldSize = parseInt(fieldSize);
    }
    generateFieldWithRowAndCols() {
        this.gameFieldWithRowAndCols = [];
        const rowLimits = [0, this.fieldSize];
        for (let index = 0; index < this.fieldSize; index++) {
            this.gameFieldWithRowAndCols.push([...this.field.slice(rowLimits[0], rowLimits[1])]);
            rowLimits[0] += this.fieldSize;
            rowLimits[1] += this.fieldSize;
        }
        return this.gameFieldWithRowAndCols;
    }
}
export default CellsField;
