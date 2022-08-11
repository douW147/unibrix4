"use strict"

import {initialCellsForWin} from "../constants/constants";

class CellsField {
    private gameFieldWithRowAndCols: string[][];
    private fieldSize: number;
    private lenghtForWin: number;
    field: string[];

    constructor(fieldSize: number) {
        this.field;
        this.fieldSize = fieldSize;
        this.generateField(fieldSize);
        this.gameFieldWithRowAndCols = this.generateFieldWithRowAndCols();
        this.lenghtForWin = initialCellsForWin;
    }

    refresh() {
        this.field.fill("");
    }

    getRandomCellIdForComputerStep(): number {
        while (true) {
            const randomCellId = Math.floor(Math.random() * this.field.length);

            if (this.isCellEmpty(randomCellId)) {
                return randomCellId;
            }
        }
    }

    getLenghtForWin(): number {
        return this.lenghtForWin;
    }

    getFieldSize(): number {
        return this.fieldSize;
    }

    setSymbolToSelectedFieldCell(currentStepSymbol: string, selectedCellNumber: number) {
        this.field[selectedCellNumber] = currentStepSymbol;
    }

    setLenghtForWin(newlenghtForWin: number) {
        this.lenghtForWin = newlenghtForWin;
    }

    isCellEmpty(cellIndex: number): boolean {
        return this.field[cellIndex] === "";
    }

    isAllCellsTaken(): boolean {
        return this.field.every((cell) => cell !== "");
    }

    isCellExistsOnField(firstIndex: number, secondIndex: number): boolean {
        return (
            this.gameFieldWithRowAndCols[firstIndex] !== undefined 
            && this.gameFieldWithRowAndCols[firstIndex][secondIndex] !== undefined
        );
    }

    isWinCombination(currentSymbol: string): boolean {
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

    isWinOnRow(currentSymbol: string) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            let currentStrick = 0;

            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                if (this.gameFieldWithRowAndCols[rowIndex][columnIndex] === currentSymbol) {
                    currentStrick++;
                } else {
                    currentStrick = 0;
                }

                if (currentStrick === this.lenghtForWin) {
                    return true;
                }
            }
        }
    }

    isWinOnColumn(currentSymbol: string) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            let currentStrick = 0;

            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                if (this.gameFieldWithRowAndCols[columnIndex][rowIndex] === currentSymbol) {
                    currentStrick++;
                } else {
                    currentStrick = 0;
                }

                if (currentStrick === this.lenghtForWin) {
                    return true;
                }
            }
        }
    }

    isWinOnMainDiagonal(currentSymbol: string) {
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
                        return true
                    }
                }
            }
        }
    }

    isWinOnSecondaryDiagonal(currentSymbol: string) {
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
                        return true
                    }
                    
                }
            }
        }
    }

    generateField(fieldSize: number) {
        this.field = new Array(fieldSize * fieldSize).fill("");
        this.fieldSize = fieldSize;
    }

    generateFieldWithRowAndCols(): string[][] {
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