"use strict";

class HtmlCellsField {
    #_field;
    #_fieldIdName;
    #_rowIdAndClassName;
    #_rowTagName;
    #_cellTagName;
    #_cellIdName;
    #_cellClassName;
    #allHtmlCells;
    constructor(
        fieldSize,
        fieldIdName,
        fieldRowIdAndClassName,
        fieldRowTagName,
        fieldCellTagName,
        cellClassName, 
        cellIdName,
        ) {
        this.#_rowIdAndClassName = fieldRowIdAndClassName;
        this.#_rowTagName = fieldRowTagName;
        this.#_cellTagName = fieldCellTagName;
        this.#_cellIdName = cellIdName;
        this.#_cellClassName = cellClassName;
        this.#_fieldIdName = fieldIdName;
        this.#_field = this.generateField(fieldSize);
        this.#allHtmlCells = document.getElementsByClassName(this.#_cellClassName);
    }

    refresh() {
        for (let cellIndex = 0; cellIndex < this.#allHtmlCells.length; cellIndex++) {
            this.#allHtmlCells[cellIndex].innerHTML = "";
        }
    }

    setSymbolToSelctedHtmlCell(currentStepSymbol, cellId) {
        document.getElementById(`cell${cellId}`).innerHTML =
            currentStepSymbol;
    }

    generateField(fieldSize) {
        let currentCellId = 0;
        const field = document.getElementById(this.#_fieldIdName);
        field.innerHTML = "";
        for (let rowIndex = 0; rowIndex < fieldSize; rowIndex++) {
            const row = this.generateRow();
            for (let columnIndex = 0; columnIndex < fieldSize; columnIndex++) {
                const cell = this.generateCell(currentCellId);
                currentCellId++;
                row.appendChild(cell);
            }
            field.appendChild(row);
        }
    }

    generateCell(cellId) {
        const cell = document.createElement(this.#_cellTagName);
        cell.setAttribute("id", `${this.#_cellIdName}${cellId}`);
        cell.classList.add(this.#_cellClassName);
        cell.addEventListener('click', onCellClick);
        return cell;
    }

    generateRow() {
        const row = document.createElement(this.#_rowTagName);
        row.setAttribute("id", this.#_rowIdAndClassName);
        row.classList.add(this.#_rowIdAndClassName);
        return row;
    }
} 

class CellsField {
    #field;
    #winCombinations;
    #_fieldSize;
    constructor(fieldSize) {
        this.#field;
        this.#_fieldSize = fieldSize;
        this.#winCombinations = this.generateWinCombinations(fieldSize);
        this.generateField(fieldSize);
    }

    refresh() {
        this.#field.fill("");
    }

    getRandomCellIdForComputerStep() {
        while (true) {
            const randomCellId = Math.floor(Math.random() * this.#field.length);
            if (this.isCellEmpty(randomCellId)) {
                return randomCellId;
            }
        }
    }

    generateField(fieldSize) {
        this.#field = new Array(fieldSize * fieldSize).fill("");
        this.#_fieldSize = fieldSize;
        this.#winCombinations = this.generateWinCombinations(fieldSize);
    }

    generateWinCombinations(fieldSize) {
        fieldSize = parseInt(fieldSize);
        const winCombinations = [
            [0, -fieldSize, fieldSize], 
            [0, fieldSize, fieldSize * 2],
            [0, -fieldSize, fieldSize * 2],
            [0, -1, 1],
            [0, -1, -2],
            [0, 1, 2],
            [0, -fieldSize - 1 , fieldSize + 1],
            [0, -fieldSize + 1, fieldSize - 1],
            [0, -fieldSize + 1, -fieldSize * 2 + 2],
            [0, fieldSize + 1, fieldSize * 2 + 2],
            [0, fieldSize - 1, fieldSize * 2 - 2],
            [0, -fieldSize - 1, -fieldSize * 2 - 2]
        ];
        return winCombinations;
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
        let isWin = false;
        for (let currentCellIndex = 0; currentCellIndex < this.#field.length; currentCellIndex++) {
            for (let winCombIndex = 0; winCombIndex < this.#winCombinations.length; winCombIndex++) {
                if (this.#field[currentCellIndex + this.#winCombinations[winCombIndex][0]] === currentSymbol
                    && this.#field[currentCellIndex + this.#winCombinations[winCombIndex][1]] === currentSymbol
                    && this.#field[currentCellIndex + this.#winCombinations[winCombIndex][2]] === currentSymbol) {
                    isWin = true;
                    break;
                }
            } 
            if (isWin === true) {
                break
            }       
        }
        return isWin;
    }
}

class GameSymbols {
    #_secondStepSymbol;
    #_currentStepSymbol;
    #_firstStepSymbol;
    constructor(firstStepSymbol, secondStepSymbol) {
        this.#_firstStepSymbol = firstStepSymbol;
        this.#_secondStepSymbol = secondStepSymbol;
        this.#_currentStepSymbol = this.firstStepSymbol;
    }

    refresh() {
        this.#_currentStepSymbol = this.#_firstStepSymbol;
    }

    get firstStepSymbol () {
        return this.#_firstStepSymbol;
    }

    get currentStepSymbol() {
        return this.#_currentStepSymbol;
    }

    set currentStepSymbol(stepsSymbol) {
        this.#_currentStepSymbol = stepsSymbol;
    }

    togglecurrentStepSymbol() {
        this.#_currentStepSymbol === this.#_secondStepSymbol
            ? (this.#_currentStepSymbol = this.#_firstStepSymbol)
            : (this.#_currentStepSymbol = this.#_secondStepSymbol);
    }
}

class GameMode {
    #isGameVsComputer;
    constructor() {
        this.#isGameVsComputer = false;
    }

    get isGameVsComputer() {
        return this.#isGameVsComputer;
    }

    set isGameVsComputer(newIsGameVsComputerValue) {
        this.#isGameVsComputer = newIsGameVsComputerValue;
    }

    isPlayerVsPlayerGameMode() {
        return this.#isGameVsComputer;
    }

    isPlayerVsComputerGameMode() {
        return !this.#isGameVsComputer;
    }
}

class MessageHeading {
    #_htmlMessageHeading;
    constructor(headingIdName) {
        this.#_htmlMessageHeading = document.getElementById(headingIdName);
    }
    
    setInnerHtml(message) {
        this.#_htmlMessageHeading.innerHTML = message;
    }

    refresh() {
        this.#_htmlMessageHeading.innerHTML = "";
    }
}

class TicTacToeGame {
    #gameSymbols;
    #gameMode;
    #htmlMessageHeading;
    #isGameStarts;
    constructor(
        firstStepSymbol, 
        secondStepSymbol, 
        messageHeadingIdName, 
        fieldSize,
        fieldIdName,
        fieldRowIdAndClassName,
        fieldRowTagName,
        fieldCellTagName,
        fieldCellsClassName, 
        fieldCellIdName,
        ) {
        this.gameField = new CellsField(fieldSize);
        this.htmlGameField = new HtmlCellsField(
            fieldSize,
            fieldIdName,
            fieldRowIdAndClassName,
            fieldRowTagName,
            fieldCellTagName,
            fieldCellsClassName, 
            fieldCellIdName
        );
        this.#gameSymbols = new GameSymbols(firstStepSymbol, secondStepSymbol);
        this.#gameMode = new GameMode();
        this.#htmlMessageHeading = new MessageHeading(messageHeadingIdName);
        this.#isGameStarts = false;
    }

    refreshGame() {
        this.gameField.refresh();
        this.htmlGameField.refresh();
        this.#gameSymbols.refresh();
        this.#htmlMessageHeading.refresh();
        if (!this.#isGameStarts) {
            this.toggleIsGameStarts()
        }
    }

    get gameMode() {
        return this.#gameMode;
    }

    get gameSembolsRefresh() {
        return this.#gameSymbols.refresh;
    }

    getGameEndMessage() {
        if (this.gameField.isWinCombination(this.#gameSymbols.currentStepSymbol)) {
            this.toggleIsGameStarts();
            return `${this.#gameSymbols.currentStepSymbol} wins`;
        }
        if (this.gameField.isDraw()) {
            this.toggleIsGameStarts();
            return "draw";
        }
        return "";
    }

    toggleIsGameStarts() {
        this.#isGameStarts = !this.#isGameStarts;
    }

    isPlayerCanStepToChosenCell(clickedCellId) {
        return this.gameField.isCellEmpty(clickedCellId) && this.#isGameStarts;
    }

    isComputerCanStep() {
        return (
            this.#gameMode.isGameVsComputer 
            && !this.gameField.isAllCellsTaken() 
            && this.#isGameStarts
        );
    }

    makeStep(clickedCellId) {
        const currentStepSymbol = this.#gameSymbols.currentStepSymbol;

        this.gameField.setSymbolToSelectedFieldCell(currentStepSymbol, clickedCellId);
        this.htmlGameField.setSymbolToSelctedHtmlCell(currentStepSymbol, clickedCellId);

        const currentHeadingMessage = ticTacToeGame.getGameEndMessage();
        this.#htmlMessageHeading.setInnerHtml(currentHeadingMessage);

        this.#gameSymbols.togglecurrentStepSymbol();
    }
    
    makeComputerStep() {
        const cellIdForComputerStep = this.gameField.getRandomCellIdForComputerStep();
        this.makeStep(cellIdForComputerStep);
    }
}

class GameInitializationButton {
    #_isAvailible;
    constructor(isAvailible) {
        this.#_isAvailible = isAvailible;
    }

    get isClicked() {
        return this.#_isAvailible;
    }

    set isClicked(isAvailible) {
        this.#_isAvailible = isAvailible;
    }
}

const fieldIdName = "field";
const fieldRowTagName = "div";
const fieldCellTagName = "div";
const fieldCellsClassName = "field__cell";
const fieldCellIdName = "cell";
const fieldRowIdAndClassName = "field__row";
const firstStepSymbol = "X";
const secondStepSymbol = "O";
const initialFieldSize = 3;
const allHtmlCells = document.getElementsByClassName(fieldCellsClassName);
const headingMessageIdName = "messageHeading";
const disableButtonClassName = "controll-buttons__controll-button_disabled";
const refreshButton = document.getElementById("refreshButton");
const playerVsPlayerButton = document.getElementById("playerVsPlayerButton");
const playerVsComputerButton = document.getElementById("playerVsComputerButton");
const fieldSizeSelect = document.getElementById("fieldSizeSelect");
const ticTacToeGame = new TicTacToeGame(
    firstStepSymbol, 
    secondStepSymbol, 
    headingMessageIdName, 
    initialFieldSize,
    fieldIdName,
    fieldRowIdAndClassName,
    fieldRowTagName,
    fieldCellTagName,
    fieldCellsClassName, 
    fieldCellIdName,
    );
const gameInitializationButton = new GameInitializationButton(true);

function onCellClick(event) {
    const clickedCellId = getCellIdFromIdName(event.target.id);

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

function onFieldSizeSelectChange(event) {
    const newFieldSize = event.target.value;

    if (gameInitializationButton.isClicked) {
        ticTacToeGame.refreshGame();
    }
    ticTacToeGame.gameField.generateField(newFieldSize); 
    ticTacToeGame.htmlGameField.generateField(newFieldSize);  
}

function getCellIdFromIdName(cellId) {
    let clickedCellId = cellId.slice(-2);
    clickedCellId = isNaN(parseInt(clickedCellId)) ? clickedCellId.slice(-1): clickedCellId;
    return clickedCellId;
}