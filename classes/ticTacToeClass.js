"use strict"

import {
    fieldSize,
    fieldIdName,
} from "../constants/constants.js";
import CellsField from "./gameFieldClass";
import HtmlCellsField from "./htmlGameFieldClass";
import GameSymbols from "./gameSymbolsClass";
import GameMode from "./gameModeClass";
import GameLocalStorage from "./gameLocalStorageClass";

class TicTacToeGame {
    #gameSymbols;
    #gameMode;
    #isGameStarts;
    constructor() {
        this.gameField = new CellsField(fieldSize);
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

    setFieldFromLocalStorrage() {
        const fieldFromLocalStorage = this.gameStorage.getField();
        const fieldSize = this.gameStorage.getFieldSize();

        this.gameField.generateField(fieldSize); 
        this.htmlGameField.generateField(fieldSize); 

        fieldFromLocalStorage.forEach((currentCell, cellIndex) => {
            this.gameField.setSymbolToSelectedFieldCell(currentCell, cellIndex);
            this.htmlGameField.setSymbolToSelctedHtmlCell(currentCell, cellIndex);
        });

        document.getElementById("fieldSizeSelect").value = fieldSize;
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

        const currentHeadingMessage = ticTacToeGame.getGameEndMessage();
        this.htmlGameField.setHeadingInnerHtml(currentHeadingMessage);

        this.#gameSymbols.toggleCurrentStepSymbol();
    }
    
    makeComputerStep() {
        const cellIdForComputerStep = this.gameField.getRandomCellIdForComputerStep();
        this.makeStep(cellIdForComputerStep);
    }
}