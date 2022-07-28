"use strict"

class CellsField {
    constructor() {
        this.field = ["", "", "", "", "", "", "", "", ""]
    }

    setSymbolToCellField(cellNumber, symbol) {
        this.field[cellNumber] = symbol;
    }

    isCellEmpty(cellNumber) {
        if(this.field[cellNumber] === "") {
            return true;
        }
        return false;
    }

    isWinCombination(currentSymbol) {
        if (this.field[0] === currentSymbol 
            && this.field[1] === currentSymbol 
            && this.field[2] === currentSymbol) {
            return true;
        } else if (
            this.field[3] === currentSymbol 
            && this.field[4] === currentSymbol 
            && this.field[5] === currentSymbol
        ) {
            return true;
        } else if (
            this.field[6] === currentSymbol &&
            this.field[7] === currentSymbol &&
            this.field[8] === currentSymbol
        ) {
            return true;
        } else if (
            this.field[0] === currentSymbol 
            && this.field[3] === currentSymbol 
            && this.field[6] === currentSymbol
        ) {
            return true;
        } else if (
            this.field[1] === currentSymbol 
            && this.field[4] === currentSymbol 
            && this.field[7] === currentSymbol
        ) {
            return true;
        } else if (
            this.field[2] === currentSymbol 
            && this.field[5] === currentSymbol 
            && this.field[8] === currentSymbol
        ) {
            return true;
        } else if (
            this.field[0] === currentSymbol 
            && this.field[4] === currentSymbol 
            && this.field[8] === currentSymbol
        ) {
            return true;
        } else if (
            this.field[2] === currentSymbol 
            && this.field[4] === currentSymbol 
            && this.field[6] === currentSymbol
        ) {
            return true;
        }
        return false;
    }

}

class TicTacToeGame {
    constructor(_symbolOfO, _symbolOfX) {
        this.symbolOfX = _symbolOfX;
        this.symbolOfO = _symbolOfO;
        this.stepsCounter = 0;
        this.isGameStarts = true;
    }

    increaseStepsCounter() {
        this.stepsCounter++;
    }

    getSymbolCurrentlyGoes(stepsCounter) {
        if(stepsCounter % 2 === 0) {
            return this.symbolOfX;
        }
        return this.symbolOfO;
    }

    toggleIsGameStarts() {
        this.isGameStarts = !this.isGameStarts;
    }

}

class ComputerStep {
    constructor () {
        this.isPlayerPlaysVsComputer = true;
    }

    generateCellIdForComputerStep(isCellEmpty) {
        while (true) {
            const randomCellId = Math.floor(Math.random() * 9);
            if (isCellEmpty[randomCellId] === "") {
                return randomCellId;
            }
        }
    }
    
    getComputerStepCellId(stepsCounter, isCellEmpty) {
        if (this.isPlayerPlaysVsComputer
            && stepsCounter % 2 !== 0 
            && stepsCounter <= 8) {
            const randomCellId = this.generateCellIdForComputerStep(isCellEmpty);
            return randomCellId
        }
    }

    toggleIsGameVsComputer() {
        this.isPlayerPlaysVsComputer = !this.isPlayerPlaysVsComputer;
    }

}

class HtmlElement {
    constructor (_idName) {
        this.idName = _idName;
    };

    setElementInnerHtml(elementId, elementInnerHtml) {
        console.log(elementId)
        const currentElement = document.getElementById(`${this.idName}${elementId}`);
        currentElement.innerHTML = elementInnerHtml;
    }
}

const cellsField = new CellsField();
const ticTacToeGame = new TicTacToeGame("O", "X");
const currentCell = new HtmlElement("cell");
const computerStep = new ComputerStep();

function onCellClick(event) {
    const clickedCellId = event.target.id.slice(-1);

    if(!cellsField.isCellEmpty(clickedCellId) || ticTacToeGame.isGameStarts === false) {
        return
    }

    let symbolCurrentlyGoes = ticTacToeGame.getSymbolCurrentlyGoes(ticTacToeGame.stepsCounter);
    cellsField.setSymbolToCellField(clickedCellId, symbolCurrentlyGoes);
    currentCell.setElementInnerHtml(clickedCellId, symbolCurrentlyGoes);
    ticTacToeGame.increaseStepsCounter();

    if (cellsField.isWinCombination(symbolCurrentlyGoes)) {
        console.log(symbolCurrentlyGoes + "win")
        ticTacToeGame.toggleIsGameStarts();
        console.log(ticTacToeGame.isGameStarts)
    }

    if (computerStep.isPlayerPlaysVsComputer && ticTacToeGame.isGameStarts) {
        symbolCurrentlyGoes = ticTacToeGame.getSymbolCurrentlyGoes(ticTacToeGame.stepsCounter);
        const computerStepCellId = computerStep.getComputerStepCellId(ticTacToeGame.stepsCounter, cellsField.field);
        cellsField.setSymbolToCellField(computerStepCellId, symbolCurrentlyGoes);
        currentCell.setElementInnerHtml(computerStepCellId, symbolCurrentlyGoes);
        ticTacToeGame.increaseStepsCounter();
    }

    if (cellsField.isWinCombination(symbolCurrentlyGoes)) {
        console.log(symbolCurrentlyGoes + "win")
        ticTacToeGame.toggleIsGameStarts();
        console.log(ticTacToeGame.isGameStarts)
    }

}