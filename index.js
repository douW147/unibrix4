"use strict";

class HtmlCellsField {
    #allHtmlCells;
    constructor(gameFieldCellsClassName) {
        this.#allHtmlCells = document.getElementsByClassName(
            gameFieldCellsClassName
        );
    }

    fillSelectedHtmlCellWithSymbol(cellId, currentStepsSymbol) {
        document.getElementById(`cell${cellId}`).innerHTML =
            currentStepsSymbol;
    }


    refreshAllHtmlGameFieldCells() {
        for (let cellIndex = 0; cellIndex < this.#allHtmlCells.length; cellIndex++) {
            this.#allHtmlCells[cellIndex].innerHTML = "";
        }
    }

} 

class CellsField {
    #field;
    constructor() {
        this.#field = ["", "", "", "", "", "", "", "", ""];
    }

    refresh() {
        this.#field = ["", "", "", "", "", "", "", "", ""];
    }

    getRandomCellIdForComputerStep() {
        while (true) {
            const randomCellId = Math.floor(Math.random() * 9);
            if (this.isCellEmpty(randomCellId)) {
                return randomCellId;
            }
        }
    }

    setCurrentSymbolToSelectedFieldCell(currentStepsSymbol, selectedCellNumber) {
        this.#field[selectedCellNumber] = currentStepsSymbol;
    }

    isCellEmpty(cellNumber) {
        if (this.#field[cellNumber] === "") {
            return true;
        }
        return false;
    }

    isAllCellsTaken() {
        return this.#field.every((cell) => cell !== "");
    }

    isDraw() {
        const isAllCellsTaken = this.#field.every((cell) => cell !== "");
        return isAllCellsTaken;
    }

    isWinCombination(currentSymbol) {
        if (
            this.#field[0] === currentSymbol 
            && this.#field[1] === currentSymbol 
            && this.#field[2] === currentSymbol
        ) {
            return true;
        } else if (
            this.#field[3] === currentSymbol 
            && this.#field[4] === currentSymbol 
            && this.#field[5] === currentSymbol
        ) {
            return true;
        } else if (
            this.#field[6] === currentSymbol 
            && this.#field[7] === currentSymbol 
            && this.#field[8] === currentSymbol
        ) {
            return true;
        } else if (
            this.#field[0] === currentSymbol 
            && this.#field[3] === currentSymbol 
            && this.#field[6] === currentSymbol
        ) {
            return true;
        } else if (
            this.#field[1] === currentSymbol 
            && this.#field[4] === currentSymbol 
            && this.#field[7] === currentSymbol
        ) {
            return true;
        } else if (
            this.#field[2] === currentSymbol 
            && this.#field[5] === currentSymbol 
            && this.#field[8] === currentSymbol
        ) {
            return true;
        } else if (
            this.#field[0] === currentSymbol 
            && this.#field[4] === currentSymbol 
            && this.#field[8] === currentSymbol
        ) {
            return true;
        } else if (
            this.#field[2] === currentSymbol 
            && this.#field[4] === currentSymbol 
            && this.#field[6] === currentSymbol
        ) {
            return true;
        }
        return false;
    }
}

class GameSymbols {
    constructor(_symbolOfO, _symbolOfX) {
        this.symbolOfX = _symbolOfX;
        this.symbolOfO = _symbolOfO;
        this._currentStepsSymbol = this.symbolOfX;
    }

    get currentStepsSymbol() {
        return this._currentStepsSymbol;
    }

    set currentStepsSymbol(stepsSymbol) {
        this._currentStepsSymbol = stepsSymbol;
    }

    toggleCurrentStepsSymbol() {
        this._currentStepsSymbol === this.symbolOfO
            ? (this._currentStepsSymbol = this.symbolOfX)
            : (this._currentStepsSymbol = this.symbolOfO);
    }
}

class ComputerAsGamePlayer {
    constructor() {
        this._isGameVsComputer = false;
    }

    get isGameVsComputer() {
        return this._isGameVsComputer;
    }

    set isGameVsComputer(newIsGameVsComputerValue) {
        this._isGameVsComputer = newIsGameVsComputerValue;
    }
}

class MessageHeading {
    constructor(headingIdName) {
        this.headingForMessage = document.getElementById(headingIdName);
    }
    
    setMessageHeadingInnerHtml(message) {
        this.headingForMessage.innerHTML = message;
    }
}

class GameButton {
    constructor(isAvailible) {
        this._isPLayButtonAvailible = isAvailible;
    }

    get isButtonAvailible() {
        return this._isPLayButtonAvailible;
    }

    set isButtonAvailible(isAvailible) {
        this._isPLayButtonAvailible = isAvailible;
    }
}

class TicTacToeGame {
    constructor(symbolOfO, symbolOfX, _messageHeading, gameFieldCellsClassName) {
        this.htmlGameField = new HtmlCellsField(gameFieldCellsClassName);
        this.gameField = new CellsField();
        this.gameSymbols = new GameSymbols(symbolOfO, symbolOfX);
        this.computerAsGamePlayer = new ComputerAsGamePlayer();
        this.headingForMessage = new MessageHeading(_messageHeading);
        this.isGameStarts = false;
    }

    refreshGame() {
        this.gameField.refresh();
        this.gameSymbols.currentStepsSymbol = this.gameSymbols.symbolOfX;
        this.htmlGameField.refreshAllHtmlGameFieldCells();
        this.headingForMessage.setMessageHeadingInnerHtml("");
        if (!this.isGameStarts) {
            this.toggleIsGameStarts()
        }
    }

    getGameEndMessage() {
        if (this.gameField.isWinCombination(
            this.gameSymbols.currentStepsSymbol)) {
            this.toggleIsGameStarts();
            return `${this.gameSymbols.currentStepsSymbol} wins`;
        }
        if (this.gameField.isDraw()) {
            this.toggleIsGameStarts();
            return "draw";
        }
        return "";
    }

    toggleIsGameStarts() {
        this.isGameStarts = !this.isGameStarts;
    }

    isPlayerCanStepToSelectedCell(clickedCellId) {
        return this.gameField.isCellEmpty(clickedCellId) && this.isGameStarts;
    }

    isComputerCanStep() {
        return (
            this.computerAsGamePlayer.isGameVsComputer 
            && !this.gameField.isAllCellsTaken() 
            && this.isGameStarts
        );
    }

    isPlayerVsPlayerGameMode() {
        return this.isGameStarts && this.computerAsGamePlayer.isGameVsComputer;
    }

    isPlayerVsComputerGameMode() {
        return this.isGameStarts && !this.computerAsGamePlayer.isGameVsComputer;
    }

    makeComputerStep() {
        const cellIdForComputerStep = this.gameField.getRandomCellIdForComputerStep();
        this.makeStep(cellIdForComputerStep);
    }

    makeStep(clickedCellId) {
        const currentStepsSymbol = this.gameSymbols.currentStepsSymbol;

        this.gameField.setCurrentSymbolToSelectedFieldCell(currentStepsSymbol, clickedCellId);
        this.htmlGameField.fillSelectedHtmlCellWithSymbol(clickedCellId, currentStepsSymbol);

        const currentHeadingMessage = ticTacToeGame.getGameEndMessage();
        this.headingForMessage.setMessageHeadingInnerHtml(currentHeadingMessage);

        this.gameSymbols.toggleCurrentStepsSymbol();
    }
}

const headingForMessageIdName = "messageHeading";
const disableButtonClassName = "controll-buttons__controll-button_disabled";
const refreshButton = document.getElementById("refreshButton");
const gameFieldCellsClassName = "field__cell";
const playerVsPlayerButton = document.getElementById("playerVsPlayerButton");
const playerVsComputerButton = document.getElementById("playerVsComputerButton");
const ticTacToeGame = new TicTacToeGame("O", "X", headingForMessageIdName, gameFieldCellsClassName);
const pLayButton = new GameButton(true);

function onCellClick(event) {
    const clickedCellId = event.target.id.slice(-1);

    if (!ticTacToeGame.isPlayerCanStepToSelectedCell(clickedCellId)) {
        return;
    }
    ticTacToeGame.makeStep(clickedCellId);

    if (!ticTacToeGame.isComputerCanStep()) {
        return;
    }
    ticTacToeGame.makeComputerStep();
}

function onPlayClick(event) {
    if (!pLayButton.isButtonAvailible) {
        return;
    }
    pLayButton.isButtonAvailible = false;
    ticTacToeGame.toggleIsGameStarts();

    event.target.classList.add(disableButtonClassName);
    refreshButton.classList.remove(disableButtonClassName);
}

function onRefreshClick() {
    if (!pLayButton.isButtonAvailible) {
        ticTacToeGame.refreshGame();
    }
}

function onPlayerVsPlayerButtonClick() {
    if (!ticTacToeGame.isPlayerVsPlayerGameMode()) {
        return;
    }
    ticTacToeGame.refreshGame();
    ticTacToeGame.computerAsGamePlayer.isGameVsComputer = false;

    playerVsPlayerButton.classList.remove(disableButtonClassName);
    playerVsComputerButton.classList.add(disableButtonClassName);
}

function onPlayerVsComputerButtonClick() {
    if (!ticTacToeGame.isPlayerVsComputerGameMode()) {
        return;
    }
    ticTacToeGame.refreshGame();
    ticTacToeGame.computerAsGamePlayer.isGameVsComputer = true;

    playerVsComputerButton.classList.remove(disableButtonClassName);
    playerVsPlayerButton.classList.add(disableButtonClassName);
}

