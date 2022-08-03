"use strict";

class HtmlCellsField {
    #firstStepSymbol;
    #firstStepSymbolClassName;
    #secondStepSymbol;
    #secondStepSymbolClassName;
    #_field;
    #_fieldIdName;
    #_rowIdAndClassName;
    #_rowTagName;
    #_cellTagName;
    #_cellIdName;
    #_cellClassName;
    #htmlMessageHeading;
    #allHtmlCells;
    constructor(
        fieldSize,
        fieldIdName,
        fieldRowIdAndClassName,
        fieldRowTagName,
        fieldCellTagName,
        cellClassName, 
        cellIdName,
        firstStepSymbol,
        firtsStepSymbolClassName,
        secondStepSymbol,
        secondStepSymbolClassName,
        messageHeadingIdName
    ) {
        this.#firstStepSymbol = firstStepSymbol;
        this.#secondStepSymbol = secondStepSymbol;
        this.#firstStepSymbolClassName = firtsStepSymbolClassName;
        this.#secondStepSymbolClassName = secondStepSymbolClassName;
        this.#_rowIdAndClassName = fieldRowIdAndClassName;
        this.#_rowTagName = fieldRowTagName;
        this.#_cellTagName = fieldCellTagName;
        this.#_cellIdName = cellIdName;
        this.#_cellClassName = cellClassName;
        this.#_fieldIdName = fieldIdName;
        this.#_field = this.generateField(fieldSize);
        this.#htmlMessageHeading = window.document.getElementById(messageHeadingIdName);
        this.#allHtmlCells = window.document.getElementsByClassName(this.#_cellClassName);
    }

    refreshHtnlCells() {
        for (let cellIndex = 0; cellIndex < this.#allHtmlCells.length; cellIndex++) {
            this.#allHtmlCells[cellIndex].innerHTML = "";
            this.#allHtmlCells[cellIndex].classList.remove(this.#firstStepSymbolClassName);
            this.#allHtmlCells[cellIndex].classList.remove(this.#secondStepSymbolClassName);
        }
    }

    refreshHeadingMessage() {
        this.#htmlMessageHeading.innerHTML = "";
        this.#htmlMessageHeading.classList.remove(this.#firstStepSymbolClassName);
        this.#htmlMessageHeading.classList.remove(this.#secondStepSymbolClassName);
    }

    setHeadingInnerHtml(message) {
        this.#htmlMessageHeading.innerHTML = message;
        if (message.slice(0, 1) === this.#firstStepSymbol) {
            this.#htmlMessageHeading.classList.remove(this.#secondStepSymbolClassName);
            this.#htmlMessageHeading.classList.add(this.#firstStepSymbolClassName);
            
        } else if (message.slice(0, 1) === this.#secondStepSymbol) {
            this.#htmlMessageHeading.classList.remove(this.#firstStepSymbolClassName);
            this.#htmlMessageHeading.classList.add(this.#secondStepSymbolClassName);
        }
    }

    setSymbolToSelctedHtmlCell(currentStepSymbol, cellId) {
        const selectedCell = window.document.getElementById(`cell${cellId}`);
        selectedCell.innerHTML = currentStepSymbol;

        if (currentStepSymbol === this.#firstStepSymbol) {
            selectedCell.classList.add(this.#firstStepSymbolClassName);
        } else {
            selectedCell.classList.add(this.#secondStepSymbolClassName);
        }
    }

    generateField(fieldSize) {
        let currentCellId = 0;
        const field = window.document.getElementById(this.#_fieldIdName);
        field.innerHTML = "";

        for (let rowIndex = 0; rowIndex < fieldSize; rowIndex++) {
            const row = this.generateRow();

            for (let columnIndex = 0; columnIndex < fieldSize; columnIndex++) {
                const cell = this.generateCell(currentCellId);
                row.appendChild(cell);

                currentCellId++;
            }
            field.appendChild(row);
        }
    }

    generateCell(cellId) {
        const cell = window.document.createElement(this.#_cellTagName);

        cell.setAttribute("id", `${this.#_cellIdName}${cellId}`);
        cell.classList.add(this.#_cellClassName);
        cell.addEventListener('click', onCellClick);

        return cell;
    }

    generateRow() {
        const row = window.document.createElement(this.#_rowTagName);

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
        this.#_fieldSize = parseInt(fieldSize);
    }

    generateFieldWithRowAndCols() {
        const gameFieldWithRowAndCols = [];
        const rowLimits = [0, this.#_fieldSize];

        for (let index = 0; index < this.#_fieldSize; index++) {
            gameFieldWithRowAndCols.push([...this.#field.slice(rowLimits[0], rowLimits[1])]);

            rowLimits[0] += this.#_fieldSize;
            rowLimits[1] += this.#_fieldSize;
        }

        return gameFieldWithRowAndCols;
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

class GameSymbols {
    #_currentStepSymbol;
    #_firstStepSymbol;
    #_secondStepSymbol;
    constructor(
        firstStepSymbol, 
        secondStepSymbol,
    ) {
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

class TicTacToeGame {
    #gameSymbols;
    #gameMode;
    #isGameStarts;
    constructor(
        firstStepSymbol,
        firstStepSymbolClassName,
        secondStepSymbol,
        secondStepSymbolClassName,
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
            fieldCellIdName,
            firstStepSymbol,
            firstStepSymbolClassName,
            secondStepSymbol,
            secondStepSymbolClassName,
            messageHeadingIdName
        );
        this.#gameSymbols = new GameSymbols(
            firstStepSymbol, 
            secondStepSymbol, 
        );
        this.#gameMode = new GameMode();
        this.#isGameStarts = false;
    }

    refreshGame() {
        this.gameField.refresh();
        this.htmlGameField.refreshHeadingMessage();
        this.htmlGameField.refreshHtnlCells();
        this.#gameSymbols.refresh();
        if (!this.#isGameStarts) {
            this.toggleIsGameStarts();
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
            return "Draw";
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
        this.htmlGameField.setHeadingInnerHtml(currentHeadingMessage);

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
const firstStepSymbolClassName = "controll-buttons__controll-button_color-blue";
const secondStepSymbolClassName = "controll-buttons__controll-button_color-red";
const initialFieldSize = 3;
const allHtmlCells = window.document.getElementsByClassName(fieldCellsClassName);
const headingMessageIdName = "messageHeading";
const disableButtonClassName = "controll-buttons__controll-button_disabled";
const refreshButton = window.document.getElementById("refreshButton");
const playerVsPlayerButton = window.document.getElementById("playerVsPlayerButton");
const playerVsComputerButton = window.document.getElementById("playerVsComputerButton");
const fieldSizeSelect = window.document.getElementById("fieldSizeSelect");
const ticTacToeGame = new TicTacToeGame(
    firstStepSymbol,
    firstStepSymbolClassName,
    secondStepSymbol,
    secondStepSymbolClassName,
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

    if (! gameInitializationButton.isClicked) {
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