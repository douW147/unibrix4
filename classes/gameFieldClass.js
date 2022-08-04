"use strict"

class CellsField {
    #field;
    #winCombinations;
    #_fieldSize;
    #lenghtForWin;

    constructor(fieldSize) {
        this.field;
        this.#_fieldSize = parseInt(fieldSize);
        this.generateField(fieldSize);
        this.#lenghtForWin = 3;
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

    get lenghtForWin() {
        return parseInt(this.#lenghtForWin);
    }

    generateField(fieldSize) {
        this.field = new Array(fieldSize * fieldSize).fill("");
        this.#_fieldSize = parseInt(fieldSize);
    }

    generateFieldWithRowAndCols() {
        const gameFieldWithRowAndCols = [];
        const rowLimits = [0, this.#_fieldSize];

        for (let index = 0; index < this.#_fieldSize; index++) {
            gameFieldWithRowAndCols.push([...this.field.slice(rowLimits[0], rowLimits[1])]);

            rowLimits[0] += this.#_fieldSize;
            rowLimits[1] += this.#_fieldSize;
        }

        return gameFieldWithRowAndCols;
    }

    setSymbolToSelectedFieldCell(currentStepSymbol, selectedCellNumber) {
        this.field[selectedCellNumber] = currentStepSymbol;
    }

    set lenghtForWin(newLenghtForWin) {
        this.#lenghtForWin = parseInt(newLenghtForWin);
    }

    isCellEmpty(cellNumber) {
        return this.field[cellNumber] === "";
    }

    isAllCellsTaken() {
        return this.field.every((cell) => cell !== "");
    }

    isWinOnRow(gameFieldWithRowAndCols, currentSymbol) {
        for (let rowIndex = 0; rowIndex < gameFieldWithRowAndCols.length; rowIndex++) {
            let currentStrick = 0;
            for (let columnIndex = 0; columnIndex < gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                if (gameFieldWithRowAndCols[rowIndex][columnIndex] === currentSymbol) {
                    currentStrick++;
                } else {
                    currentStrick = 0;
                }
                if (currentStrick === this.#lenghtForWin) {
                    return true;
                }
            }
        }
    }

    isWinOnColumn(gameFieldWithRowAndCols, currentSymbol) {
        for (let rowIndex = 0; rowIndex < gameFieldWithRowAndCols.length; rowIndex++) {
            let currentStrick = 0;
            for (let columnIndex = 0; columnIndex < gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                if (gameFieldWithRowAndCols[columnIndex][rowIndex] === currentSymbol) {
                    currentStrick++;
                } else {
                    currentStrick = 0;
                }
                if (currentStrick === this.#lenghtForWin) {
                    return true;
                }
            }
        }
    }

    isWinOnMainDiagonal(gameFieldWithRowAndCols, currentSymbol) {
        for (let rowIndex = 0; rowIndex < gameFieldWithRowAndCols.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                let currentStrick = 0;
                for (let indexDelta = 0; indexDelta < this.#lenghtForWin + 1; indexDelta++) {
                    if (gameFieldWithRowAndCols[columnIndex + indexDelta] !== undefined 
                        && gameFieldWithRowAndCols[columnIndex + indexDelta][rowIndex + indexDelta] !== undefined
                        && gameFieldWithRowAndCols[columnIndex + indexDelta][rowIndex + indexDelta] === currentSymbol) {
                        currentStrick++;
                    }
                    if (currentStrick === this.#lenghtForWin) {
                        return true
                    }
                    
                }
            }
        }
    }

    isWinOnSecondaryDiagonal(gameFieldWithRowAndCols, currentSymbol) {
        for (let rowIndex = 0; rowIndex < gameFieldWithRowAndCols.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                let currentStrick = 0;
                for (let indexDelta = 0; indexDelta < this.#lenghtForWin + 1; indexDelta++) {
                    if (gameFieldWithRowAndCols[columnIndex - indexDelta] !== undefined 
                        && gameFieldWithRowAndCols[columnIndex - indexDelta][rowIndex + indexDelta] !== undefined
                        && gameFieldWithRowAndCols[columnIndex - indexDelta][rowIndex + indexDelta] === currentSymbol) {
                        currentStrick++;
                    }
                    if (currentStrick === this.#lenghtForWin) {
                        return true
                    }
                    
                }
            }
        }
    }

    isWinCombination(currentSymbol) {
        const gameFieldWithRowAndCols = this.generateFieldWithRowAndCols();

        if (this.isWinOnRow(gameFieldWithRowAndCols, currentSymbol)) {
            return true;
        }

        if (this.isWinOnColumn(gameFieldWithRowAndCols, currentSymbol)) {
            return true;
        }

        if (this.isWinOnMainDiagonal(gameFieldWithRowAndCols, currentSymbol)) {
            return true;
        }

        if (this.isWinOnSecondaryDiagonal(gameFieldWithRowAndCols, currentSymbol)) {
            return true;
        }

        return false;
    }
}

export default CellsField;