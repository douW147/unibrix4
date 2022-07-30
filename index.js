"use strict";

class HtmlCellsField {
    #allHtmlCells;
    constructor(gameFieldCellsClassName) {
        this.#allHtmlCells = document.getElementsByClassName(
            gameFieldCellsClassName
        );
    }

    setSymbolToSelctedHtmlCell(currentStepSymbol, cellId) {
        document.getElementById(`cell${cellId}`).innerHTML =
            currentStepSymbol;
    }


    refresh() {
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

    setSymbolToSelectedFieldCell(currentStepSymbol, selectedCellNumber) {
        this.#field[selectedCellNumber] = currentStepSymbol;
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
    constructor(_secondStepSymbol, _firstStepSymbol) {
        this.firstStepSymbol = _firstStepSymbol;
        this.secondStepSymbol = _secondStepSymbol;
        this._currentStepSymbol = this.firstStepSymbol;
    }

    refresh() {
        this.currentStepSymbol = this.firstStepSymbol;
    }

    get currentStepSymbol() {
        return this._currentStepSymbol;
    }

    set currentStepSymbol(stepsSymbol) {
        this._currentStepSymbol = stepsSymbol;
    }

    togglecurrentStepSymbol() {
        this._currentStepSymbol === this.secondStepSymbol
            ? (this._currentStepSymbol = this.firstStepSymbol)
            : (this._currentStepSymbol = this.secondStepSymbol);
    }
}

class GameMode {
    constructor() {
        this._isGameVsComputer = false;
    }

    get isGameVsComputer() {
        return this._isGameVsComputer;
    }

    set isGameVsComputer(newIsGameVsComputerValue) {
        this._isGameVsComputer = newIsGameVsComputerValue;
    }

    isPlayerVsPlayerGameMode() {
        return this.isGameVsComputer;
    }

    isPlayerVsComputerGameMode() {
        return !this.isGameVsComputer;
    }
}

class MessageHeading {
    constructor(headingIdName) {
        this.htmlMessageHeading = document.getElementById(headingIdName);
    }
    
    setInnerHtml(message) {
        this.htmlMessageHeading.innerHTML = message;
    }

    refresh() {
        this.htmlMessageHeading.innerHTML = "";
    }
}

class TicTacToeGame {
    constructor(secondStepSymbol, firstStepSymbol, _messageHeadingIdName, gameFieldCellsClassName) {
        this.htmlGameField = new HtmlCellsField(gameFieldCellsClassName);
        this.gameField = new CellsField();
        this.gameSymbols = new GameSymbols(secondStepSymbol, firstStepSymbol);
        this.gameMode = new GameMode();
        this.htmlMessageHeading = new MessageHeading(_messageHeadingIdName);
        this.isGameStarts = false;
    }

    refreshGame() {
        this.gameField.refresh();
        this.gameSymbols.refresh();
        this.htmlGameField.refresh();
        this.htmlMessageHeading.refresh();
        if (!this.isGameStarts) {
            this.toggleIsGameStarts()
        }
    }

    getGameEndMessage() {
        if (this.gameField.isWinCombination(this.gameSymbols.currentStepSymbol)) {
            this.toggleIsGameStarts();
            return `${this.gameSymbols.currentStepSymbol} wins`;
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

    isPlayerCanStepToChosenCell(clickedCellId) {
        return this.gameField.isCellEmpty(clickedCellId) && this.isGameStarts;
    }

    isComputerCanStep() {
        return (
            this.gameMode.isGameVsComputer 
            && !this.gameField.isAllCellsTaken() 
            && this.isGameStarts
        );
    }

    makeStep(clickedCellId) {
        const currentStepSymbol = this.gameSymbols.currentStepSymbol;

        this.gameField.setSymbolToSelectedFieldCell(currentStepSymbol, clickedCellId);
        this.htmlGameField.setSymbolToSelctedHtmlCell(currentStepSymbol, clickedCellId);

        const currentHeadingMessage = ticTacToeGame.getGameEndMessage();
        this.htmlMessageHeading.setInnerHtml(currentHeadingMessage);

        this.gameSymbols.togglecurrentStepSymbol();
    }
    
    makeComputerStep() {
        const cellIdForComputerStep = this.gameField.getRandomCellIdForComputerStep();
        this.makeStep(cellIdForComputerStep);
    }
}

class GameInitializationButton {
    constructor(isAvailible) {
        this._isgameInitializationButtonAvailible = isAvailible;
    }

    get isClicked() {
        return this._isgameInitializationButtonAvailible;
    }

    set isClicked(isAvailible) {
        this._isgameInitializationButtonAvailible = isAvailible;
    }
}

const headingMessageIdName = "messageHeading";
const disableButtonClassName = "controll-buttons__controll-button_disabled";
const refreshButton = document.getElementById("refreshButton");
const gameFieldCellsClassName = "field__cell";
const playerVsPlayerButton = document.getElementById("playerVsPlayerButton");
const playerVsComputerButton = document.getElementById("playerVsComputerButton");
const ticTacToeGame = new TicTacToeGame("O", "X", headingMessageIdName, gameFieldCellsClassName);
const gameInitializationButton = new GameInitializationButton(true);

function onCellClick(event) {
    const clickedCellId = event.target.id.slice(-1);

    if (!ticTacToeGame.isPlayerCanStepToChosenCell(clickedCellId)) {
        return;
    }
    ticTacToeGame.makeStep(clickedCellId);

    if (!ticTacToeGame.isComputerCanStep()) {
        return;
    }
    ticTacToeGame.makeComputerStep();
}

function onGameInitializationButtonClick(event) {
    if (!gameInitializationButton.isClicked) {
        return;
    }
    gameInitializationButton.isClicked = false;
    ticTacToeGame.toggleIsGameStarts();

    event.target.classList.add(disableButtonClassName);
    refreshButton.classList.remove(disableButtonClassName);
}

function onRefreshClick() {
    if (!gameInitializationButton.isClicked) {
        ticTacToeGame.refreshGame();
    }
}

function onPlayerVsPlayerButtonClick() {
    if (!ticTacToeGame.gameMode.isPlayerVsPlayerGameMode() || gameInitializationButton.isClicked) {
        return;
    }
    ticTacToeGame.refreshGame();
    ticTacToeGame.gameMode.isGameVsComputer = false;

    playerVsPlayerButton.classList.remove(disableButtonClassName);
    playerVsComputerButton.classList.add(disableButtonClassName);
}

function onPlayerVsComputerButtonClick() {
    if (!ticTacToeGame.gameMode.isPlayerVsComputerGameMode() || gameInitializationButton.isClicked) {
        return;
    }
    ticTacToeGame.refreshGame();
    ticTacToeGame.gameMode.isGameVsComputer = true;

    playerVsComputerButton.classList.remove(disableButtonClassName);
    playerVsPlayerButton.classList.add(disableButtonClassName);
}

