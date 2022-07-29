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

    isDraw() {
        const isAllCellsTaken = this.field.every(cell => cell !== "");
        return isAllCellsTaken;
    }

}

class TicTacToeGame {
    constructor(_symbolOfO, _symbolOfX) {
        this.symbolOfX = _symbolOfX;
        this.symbolOfO = _symbolOfO;
        this.stepsCounter = 0;
        this.isGameStarts = true;
        this.isPlayerPlaysVsComputer = false;
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

    makePlayerStep(clickedCellId, currentCell) {
        if(this.isGameStarts === false) {
            return
        }
        const symbolCurrentlyGoes = this.getSymbolCurrentlyGoes(this.stepsCounter);
        currentCell.setElementInnerHtml(clickedCellId, symbolCurrentlyGoes);
        this.increaseStepsCounter();
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

function onCellClick(event) {
    const clickedCellId = event.target.id.slice(-1);
    let symbolCurrentlyGoes = ticTacToeGame.getSymbolCurrentlyGoes();

    if(cellsField.isCellEmpty(clickedCellId)) {
        ticTacToeGame.makePlayerStep(clickedCellId, currentCell);
        cellsField.setSymbolToCellField(clickedCellId, symbolCurrentlyGoes);
    }

    if(cellsField.isWinCombination(symbolCurrentlyGoes)){
        console.log(symbolCurrentlyGoes + "win")
        ticTacToeGame.toggleIsGameStarts();
    }

    if(cellsField.isDraw()){
        console.log("draw")
        ticTacToeGame.toggleIsGameStarts();
    }

    if(ticTacToeGame.isPlayerPlaysVsComputer) {

    }
    
}