"use strict"

import {
    initialFieldSize,
    fieldIdName,
    } from "../constants/constants.js";

import GameSymbols from "./gameSymbolsClass.js";
import GameMode from "./gameModeClass.js";
import GameLocalStorage from "./gameLocalStorageClass.js";
import HtmlCellsField from "./htmlGameFieldClass.js";
import CellsField from "./gameFieldClass.js";

import { onPlayerVsComputerButtonClick } from "../app.js";

class TicTacToeGame {
    #gameSymbols;
    #gameMode;
    #isGameStarts;
    
    constructor() {
        this.gameField = new CellsField(initialFieldSize);
        this.htmlGameField = new HtmlCellsField();
        this.fieldName = fieldIdName;
        this.#gameSymbols = new GameSymbols();
        this.#gameMode = new GameMode();
        this.#isGameStarts = false;
        this.gameStorage = new GameLocalStorage();
    }

    refreshGame() {
        this.gameField.refresh();
        this.gameStorage.refresh();
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

        if (this.gameField.isAllCellsTaken()) {
            this.toggleIsGameStarts();
            return "Draw";
        }

        return "";
    }

    setGameDataFromLocalStorrage() {
        const fieldFromLocalStorage = this.gameStorage.getField();
        const fieldSize = this.gameStorage.getFieldSize();
        const currentStepSymbol = this.gameStorage.getCurrentStepSymbol();
        const currentLenghtForWin = this.gameStorage.getCellsQuantityForWin();

        this.gameField.generateField(fieldSize); 
        this.htmlGameField.generateField(fieldSize); 
        this.gameField.lenghtForWin = currentLenghtForWin;

        if(this.gameStorage.getIsGameVsComputer() === "true") {
            onPlayerVsComputerButtonClick(false)
        }

        fieldFromLocalStorage.forEach((currentCell, cellIndex) => {
            this.gameField.setSymbolToSelectedFieldCell(currentCell, cellIndex);
            this.htmlGameField.setSymbolToSelctedHtmlCell(currentCell, cellIndex);
        });

        if ((this.getGameEndMessage() === "") === false) {
            const currentHeadingMessage = this.getGameEndMessage();
            this.htmlGameField.setHeadingInnerHtml(currentHeadingMessage);
            this.toggleIsGameStarts();
        }

        this.#gameSymbols.currentStepSymbol = currentStepSymbol;

        document.getElementById("fieldSizeSelect").value = fieldSize;
        document.getElementById("fieldCellsCizeForWinSelect").value = currentLenghtForWin;
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
        this.gameStorage.setGameFieldToLocalStorrage(this.gameField.field);

        const currentHeadingMessage = this.getGameEndMessage();
        this.htmlGameField.setHeadingInnerHtml(currentHeadingMessage);

        this.#gameSymbols.toggleCurrentStepSymbol();
        this.gameStorage.setCurrentStepSymbol(this.#gameSymbols.currentStepSymbol); 
    }
    
    makeComputerStep() {
        const cellIdForComputerStep = this.gameField.getRandomCellIdForComputerStep();
        this.makeStep(cellIdForComputerStep);
    }
}

export default TicTacToeGame;