"use strict"

import {
    initialfieldSize,
    fieldIdName,
    fieldSizeSelectIdName,
    fieldCellsSizeForWinSelectIdName
    } from "../constants/constants.js";

import GameSymbols from "./game-symbols-class.js";
import _gameMode from "./game-mode-class.js";
import GameLocalStorage from "./game-local-storage-class.js";
import HtmlCellsField from "./html-game-field-class.js";
import CellsField from "./game-field-class.js";

import { onPlayerVsComputerButtonClick } from "../app.js";

class TicTacToeGame {
    fieldName: string;
    gameField: CellsField;
    htmlGameField: HtmlCellsField;
    gameStorage: GameLocalStorage;
    private gameSymbols: GameSymbols;
    private _gameMode: _gameMode;
    private isGameStarts: boolean;
    
    constructor() {
        this.fieldName = fieldIdName;
        this.isGameStarts = false;

        this.gameField = new CellsField(initialfieldSize);
        this.htmlGameField = new HtmlCellsField();
        this.gameSymbols = new GameSymbols();
        this._gameMode = new _gameMode();
        this.gameStorage = new GameLocalStorage();
    }

    refreshGame() {
        this.gameField.refresh();
        this.gameStorage.refresh();
        this.htmlGameField.refreshHeadingMessage();
        this.htmlGameField.refreshHtnlCells();
        this.gameSymbols.refresh();
        if (!this.isGameStarts) {
            this.toggleIsGameStarts();
        }
    }

    get gameMode(): _gameMode {
        return this._gameMode;
    }

    get gameSembolsRefresh() {
        return this.gameSymbols.refresh;
    }

    getGameEndMessage(): string {
        if (this.gameField.isWinCombination(this.gameSymbols.currentStepSymbol)) {
            this.toggleIsGameStarts();
            return `${this.gameSymbols.currentStepSymbol} wins`;
        }

        if (this.gameField.isAllCellsTaken()) {
            this.toggleIsGameStarts();
            return "Draw";
        }

        return "";
    }

    setGameDataFromLocalStorrage() {
        const fieldFromLocalStorage = this.gameStorage.getField();
        const fieldSize = this.gameStorage.getfieldSize();
        const currentStepSymbol = this.gameStorage.getCurrentStepSymbol();
        const currentlenghtForWin = this.gameStorage.getCellsQuantityForWin();

        this.gameField.generateField(fieldSize); 
        this.htmlGameField.generateField(fieldSize); 
        this.gameField.setLenghtForWin(currentlenghtForWin);

        this.set_gameModeFromLocalStorage();
        this.setSymbolsFromLocalStorageOnFields(fieldFromLocalStorage);
        this.setGameHeadingMessageFromLocalStorage();
        this.gameSymbols.currentStepSymbol = currentStepSymbol;
        this.setInputValuesFromLocalStorrage(fieldSize.toString(), currentlenghtForWin.toString());
    }

    setSymbolsFromLocalStorageOnFields(fieldFromLocalStorage: string[]) {
        fieldFromLocalStorage.forEach((currentCell, cellIndex) => {
            this.gameField.setSymbolToSelectedFieldCell(currentCell, cellIndex);
            this.htmlGameField.setSymbolToSelctedHtmlCell(currentCell, cellIndex);
        });
    }

    set_gameModeFromLocalStorage() {
        if(this.gameStorage.getIsGameVsComputer() === "true") {
            onPlayerVsComputerButtonClick(false)
        }
    }

    setGameHeadingMessageFromLocalStorage(){
        if ((this.getGameEndMessage() === "") === false) {
            const currentHeadingMessage = this.getGameEndMessage();
            
            this.htmlGameField.setHeadingInnerHtml(currentHeadingMessage);
            this.toggleIsGameStarts();
        }
    }

    setInputValuesFromLocalStorrage(fieldSize: string, currentlenghtForWin: string) {
        const fieldSizeSelect = document.getElementById(fieldSizeSelectIdName) as HTMLInputElement;
        const fieldCellsSizeForWinSelect = document.getElementById(fieldCellsSizeForWinSelectIdName) as HTMLInputElement;
        
        fieldSizeSelect.value = fieldSize;
        fieldCellsSizeForWinSelect.value = currentlenghtForWin;
    }

    toggleIsGameStarts() {
        this.isGameStarts = !this.isGameStarts;
    }

    isPlayerCanStepToChosenCell(clickedCellId: number): boolean {
        return this.gameField.isCellEmpty(clickedCellId) && this.isGameStarts;
    }

    isComputerCanStep(): boolean {
        return (
            this._gameMode.isGameVsComputer 
            && !this.gameField.isAllCellsTaken() 
            && this.isGameStarts
        );
    }

    makeStep(clickedCellId: number) {
        const currentStepSymbol = this.gameSymbols.currentStepSymbol;

        this.gameField.setSymbolToSelectedFieldCell(currentStepSymbol, clickedCellId);
        this.htmlGameField.setSymbolToSelctedHtmlCell(currentStepSymbol, clickedCellId);
        console.log(this.gameField.field);
        this.gameStorage.setGameFieldToLocalStorrage(this.gameField.field.toString());

        const currentHeadingMessage = this.getGameEndMessage();
        this.htmlGameField.setHeadingInnerHtml(currentHeadingMessage);

        this.gameSymbols.toggleCurrentStepSymbol();
        this.gameStorage.setCurrentStepSymbol(this.gameSymbols.currentStepSymbol); 
    }
    
    makeComputerStep() {
        const cellIdForComputerStep = this.gameField.getRandomCellIdForComputerStep();
        this.makeStep(cellIdForComputerStep);
    }
}

export default TicTacToeGame;