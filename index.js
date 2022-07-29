"use strict";

class CellsField {
    #field;
    #allHtmlCells;
    constructor(gameFieldCellsClassName) {
        this.#field = ["", "", "", "", "", "", "", "", ""];
        this.#allHtmlCells = document.getElementsByClassName(
            gameFieldCellsClassName
        );
    }

    fillSelectedCellWithSymbol(cellId, currentStepsSymbol) {
        document.getElementById(`cell${cellId}`).innerHTML =
            currentStepsSymbol;
    }


    refreshAllHtmlGameFieldCells() {
        for (let cellIndex = 0; cellIndex < this.#allHtmlCells.length; cellIndex++) {
            this.#allHtmlCells[cellIndex].innerHTML = "";
        }
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

class TicTacToeGame {
    constructor(symbolOfO, symbolOfX, _messageHeading, gameFieldCellsClassName) {
        this.gameField = new CellsField(gameFieldCellsClassName);
        this.gameSymbols = new GameSymbols(symbolOfO, symbolOfX);
        this.computerAsGamePlayer = new ComputerAsGamePlayer();
        this.headingForMessage = new MessageHeading(_messageHeading);
        this.isGameStarts = false;
        this.isPLayButtonAvailible = true;
    }

    refreshGame() {
        this.gameField.refresh();
        this.gameSymbols.currentStepsSymbol = symbolOfX;
        this.gameField.refreshAllHtmlGameFieldCells();
        this.headingForMessage.setMessageHeadingInnerHtml("");
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

    setIsPLayButtonUnvailible() {
        this.isPLayButtonAvailible = false;
    }

    setPlayerVsComputerGameMode() {
        this.computerAsGamePlayer.isGameVsComputer = true;
    }

    setPlayerVsPlayerGameMode() {
        this.computerAsGamePlayer.isGameVsComputer = false;
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

    isPlayerVsPlayerButtonAvailible() {
        return this.isGameStarts && this.computerAsGamePlayer.isGameVsComputer;
    }

    isPlayerVsComputerButtonAvailible() {
        return this.isGameStarts && !this.computerAsGamePlayer.isGameVsComputer;
    }

    makeComputerStep() {
        const cellIdForComputerStep = this.gameField.getRandomCellIdForComputerStep();
        this.makeStep(cellIdForComputerStep);
    }

    makeStep(clickedCellId) {
        const currentStepsSymbol = this.gameSymbols.currentStepsSymbol;

        this.gameField.setCurrentSymbolToSelectedFieldCell(currentStepsSymbol, clickedCellId);
        this.gameField.fillSelectedCellWithSymbol(clickedCellId, currentStepsSymbol);

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
    if (!ticTacToeGame.isPLayButtonAvailible) {
        return;
    }
    ticTacToeGame.setIsPLayButtonUnvailible();
    ticTacToeGame.toggleIsGameStarts();

    event.target.classList.add(disableButtonClassName);
    refreshButton.classList.remove(disableButtonClassName);
}

function onRefreshClick() {
    ticTacToeGame.refreshGame();
    if (!ticTacToeGame.isGameStarts) {
        ticTacToeGame.toggleIsGameStarts();
    }
}

function onPlayerVsPlayerButtonClick() {
    if (!ticTacToeGame.isPlayerVsPlayerButtonAvailible()) {
        return;
    }
    ticTacToeGame.refreshGame();
    ticTacToeGame.setPlayerVsPlayerGameMode();

    playerVsPlayerButton.classList.remove(disableButtonClassName);
    playerVsComputerButton.classList.add(disableButtonClassName);
}

function onPlayerVsComputerButtonClick() {
    if (!ticTacToeGame.isPlayerVsComputerButtonAvailible()) {
        return;
    }
    ticTacToeGame.refreshGame();
    ticTacToeGame.setPlayerVsComputerGameMode();

    playerVsComputerButton.classList.remove(disableButtonClassName);
    playerVsPlayerButton.classList.add(disableButtonClassName);
}

