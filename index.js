"use strict"

class CellsField {
    constructor() {
        this.field = ["", "", "", "", "", "", "", "", ""]
    }

    setCurrentSymbolToSelectedFieldCell(symbolCurrentlySteps, selectedCellNumber) {
        this.field[selectedCellNumber] = symbolCurrentlySteps;
    }

    isCellEmpty(cellNumber) {
        if(this.field[cellNumber] === "") {
            return true;
        }
        return false;
    }
    
    isAllCellsTaken() {
        return this.field.every(cell => cell !== "")
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

    getRandomCellIdForComputerStep() {
        while (true) {
            const randomCellId = Math.floor(Math.random() * 9)
            if (this.isCellEmpty(randomCellId)) {
                return randomCellId;
            }
        }
    }

}

class GameStepsCounter {
    constructor() {
        this.stepsCounter = 0;
    }

    increaseStepsCounter() {
        this.stepsCounter++;
    }

}

class GameSymbols {
    constructor (_symbolOfO, _symbolOfX) {
        this.symbolOfX = _symbolOfX;
        this.symbolOfO = _symbolOfO;
        this.symbolCurrentlySteps = this.symbolOfX
    }

    toggleSymbolCurrentlySteps() {
        this.symbolCurrentlySteps === this.symbolOfO ? this.symbolCurrentlySteps = this.symbolOfX : this.symbolCurrentlySteps = this.symbolOfO;
    }
}

class ComputerAsGamePlayer {

    constructor() {
        this.isGameVsComputer = false;
    }

    setIsGameVsComputer(newIsGameVsComputerValue) {
        this.isGameVsComputer = newIsGameVsComputerValue;
    }
}

class TicTacToeGame {
    constructor() {
        this.gameField = new CellsField();
        this.gameSymbols = new GameSymbols("O", "X")
        this.computerAsGamePlayer = new ComputerAsGamePlayer();
        this.isGameStarts = false;
    }

    toggleIsGameStarts() {
        this.isGameStarts = !this.isGameStarts;
    } 

    checkIsPlayerWin() {
        return this.gameField.isWinCombination(this.gameSymbols.symbolCurrentlySteps) 
    }

    checkIsDraw() {
        return this.gameField.isDraw();
    }

    fillCellWithSymbol(cellId) {
        const symbolCurrentlySteps = this.gameSymbols.symbolCurrentlySteps;
        document.getElementById(`cell${cellId}`).innerHTML = symbolCurrentlySteps;
    }

    makePlayerStep(clickedCellId) {
        const symbolCurrentlySteps = this.gameSymbols.symbolCurrentlySteps;
        this.gameField.setCurrentSymbolToSelectedFieldCell(symbolCurrentlySteps, clickedCellId);
    }

    refreshGame() {
        this.gameField = new CellsField();
        this.gameSymbols.symbolCurrentlySteps = this.gameSymbols.symbolOfX;
    }

    setPlayerVsComputerGameMode() {
        this.computerAsGamePlayer.isGameVsComputer = true;
    }

    setPlayerVsPlayerGameMode() {
        this.computerAsGamePlayer.isGameVsComputer = false;
    }

}

const ticTacToeGame = new TicTacToeGame("O", "X");

function onCellClick(event) {
    const clickedCellId = event.target.id.slice(-1);

    if (!ticTacToeGame.gameField.isCellEmpty(clickedCellId) || !ticTacToeGame.isGameStarts) {
        return 
    }

    ticTacToeGame.makePlayerStep(clickedCellId);
    ticTacToeGame.fillCellWithSymbol(clickedCellId);

    if (ticTacToeGame.checkIsPlayerWin()) {
        ticTacToeGame.toggleIsGameStarts();
        headingForMessage.innerHTML = `${ticTacToeGame.gameSymbols.symbolCurrentlySteps} wins`
    }

    if (ticTacToeGame.checkIsDraw()) {
        ticTacToeGame.toggleIsGameStarts();
        headingForMessage.innerHTML = `draw`
    }

    ticTacToeGame.gameSymbols.toggleSymbolCurrentlySteps();

    if (!ticTacToeGame.computerAsGamePlayer.isGameVsComputer 
        || ticTacToeGame.gameField.isAllCellsTaken()
        || !ticTacToeGame.isGameStarts) {
        return
    }

    const CellIdForComputerStep = ticTacToeGame.gameField.getRandomCellIdForComputerStep();

    ticTacToeGame.makePlayerStep(CellIdForComputerStep);
    ticTacToeGame.fillCellWithSymbol(CellIdForComputerStep);

    if (ticTacToeGame.checkIsPlayerWin()) {
        ticTacToeGame.toggleIsGameStarts();
        headingForMessage.innerHTML = `${ticTacToeGame.gameSymbols.symbolCurrentlySteps} wins`
    }

    if (ticTacToeGame.checkIsDraw()) {
        ticTacToeGame.toggleIsGameStarts();
        headingForMessage.innerHTML = `draw`
    }

    ticTacToeGame.gameSymbols.toggleSymbolCurrentlySteps();
}

const disableButtonClassName = "controll-buttons__controll-button_disabled";
const refreshButton = document.getElementById("refreshButton");
const allGameFieldCells = document.getElementsByClassName("field__cell");
const playerVsPlayerButton = document.getElementById("playerVsPlayerButton");
const playerVsComputerButton = document.getElementById("playerVsComputerButton");
const headingForMessage = document.getElementById("messageHeading");

function refreshAllGameFieldCells(allCells) {
    for (let cellIndex = 0; cellIndex < allCells.length; cellIndex++) {
        allCells[cellIndex].innerHTML = "";
    }
}

function onPlayClick(event) {
    if (ticTacToeGame.isGameStarts) {
        return
    }
    ticTacToeGame.toggleIsGameStarts();
    event.target.classList.add(disableButtonClassName);
    refreshButton.classList.remove(disableButtonClassName)
}

function onRefreshClick() {
    ticTacToeGame.refreshGame();
    refreshAllGameFieldCells(allGameFieldCells);
    headingForMessage.innerHTML = "";
}

function onPlayerVsPlayerButtonClick() {
    if (!ticTacToeGame.isGameStarts 
        || ! ticTacToeGame.computerAsGamePlayer.isGameVsComputer ) {
        return
    }
    ticTacToeGame.refreshGame();
    ticTacToeGame.setPlayerVsPlayerGameMode();
    refreshAllGameFieldCells(allGameFieldCells);
    playerVsPlayerButton.classList.remove(disableButtonClassName);
    playerVsComputerButton.classList.add(disableButtonClassName);
}

function onPlayerVsComputerButtonClick() {
    if (!ticTacToeGame.isGameStarts 
        || ticTacToeGame.computerAsGamePlayer.isGameVsComputer ) {
        return
    }
    ticTacToeGame.refreshGame();
    ticTacToeGame.setPlayerVsComputerGameMode();
    refreshAllGameFieldCells(allGameFieldCells);
    playerVsComputerButton.classList.remove(disableButtonClassName);
    playerVsPlayerButton.classList.add(disableButtonClassName);
}