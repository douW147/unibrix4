"use strict"

class CellsField {
    #field;
    #winCombinations;
    #_fieldSize;
    
    constructor(fieldSize) {
        this.field;
        this.#_fieldSize = parseInt(fieldSize);
        this.generateField(fieldSize);
        this.#winCombinations = [
            [[0, 0], [-1, 0], [1, 0]], 
            [[0, 0], [1, 0], [2, 0]],
            [[0, 0], [-1, 0], [-2, 0]],
            [[0, 0], [0, -1], [0, 1]],
            [[0, 0], [0, -2], [0, -1]],
            [[0, 0], [0, 1], [0, 2]],
            [[0, 0], [-1, -1], [1, 1]],
            [[0, 0], [-1, 1], [1, -1]],
            [[0, 0], [-1, 1], [-2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 0], [1, -1], [2, -2]],
            [[0, 0], [-1, -1], [-2, -2]]
        ];
    }

    refresh() {
        this.field.fill("");
    }

    setFieldFromLocalStorrage() {

    }

    getRandomCellIdForComputerStep() {
        while (true) {
            const randomCellId = Math.floor(Math.random() * this.field.length);
            if (this.isCellEmpty(randomCellId)) {
                return randomCellId;
            }
        }
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

    isCellEmpty(cellNumber) {
        return this.field[cellNumber] === "";
    }

    isAllCellsTaken() {
        return this.field.every((cell) => cell !== "");
    }

    isWinCombination(currentSymbol) {
        const gameFieldWithRowAndCols = this.generateFieldWithRowAndCols();

        for (let rowIndex = 0; rowIndex < this.#_fieldSize; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.#_fieldSize; columnIndex++) {
                for (let rowCombinationIndex = 0; rowCombinationIndex < this.#winCombinations.length; rowCombinationIndex++) {
                    const winCombination = this.#winCombinations[rowCombinationIndex];

                    if ((
                        gameFieldWithRowAndCols[rowIndex + winCombination[0][0]] !== undefined
                            && gameFieldWithRowAndCols[rowIndex + winCombination[0][0]][columnIndex + winCombination[0][1]] !== undefined 
                            && gameFieldWithRowAndCols[rowIndex + winCombination[0][0]][columnIndex + winCombination[0][1]] === currentSymbol)
                        && (gameFieldWithRowAndCols[rowIndex + winCombination[1][0]] !== undefined
                            && gameFieldWithRowAndCols[rowIndex + winCombination[1][0]][columnIndex + winCombination[1][1]] !== undefined 
                            && gameFieldWithRowAndCols[rowIndex + winCombination[1][0]][columnIndex + winCombination[1][1]] === currentSymbol)
                        && (gameFieldWithRowAndCols[rowIndex + winCombination[2][0]] !== undefined
                            && gameFieldWithRowAndCols[rowIndex + winCombination[2][0]][columnIndex + winCombination[2][1]] !== undefined 
                            && gameFieldWithRowAndCols[rowIndex + winCombination[2][0]][columnIndex + winCombination[2][1]] === currentSymbol)
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

export default CellsField;