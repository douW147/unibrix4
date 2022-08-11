/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onCellClick": () => (/* binding */ onCellClick),
/* harmony export */   "onPlayerVsComputerButtonClick": () => (/* binding */ onPlayerVsComputerButtonClick),
/* harmony export */   "onPlayerVsPlayerButtonClick": () => (/* binding */ onPlayerVsPlayerButtonClick)
/* harmony export */ });
/* harmony import */ var _classes_game_initialization_button_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/game-initialization-button-class */ "./src/classes/game-initialization-button-class.ts");
/* harmony import */ var _classes_tic_tac_toe_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/tic-tac-toe-class */ "./src/classes/tic-tac-toe-class.ts");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants/constants */ "./src/constants/constants.ts");




const ticTacToeGame = new _classes_tic_tac_toe_class__WEBPACK_IMPORTED_MODULE_1__["default"]();
const gameInitializationButton = new _classes_game_initialization_button_class__WEBPACK_IMPORTED_MODULE_0__["default"]();
_constants_constants__WEBPACK_IMPORTED_MODULE_2__.HtmlGameInitializationButton.addEventListener("click", onGameInitializationButtonClick);
_constants_constants__WEBPACK_IMPORTED_MODULE_2__.refreshButton.addEventListener("click", onRefreshClick);
_constants_constants__WEBPACK_IMPORTED_MODULE_2__.playerVsPlayerButton.addEventListener("click", () => {
    onPlayerVsPlayerButtonClick();
});
_constants_constants__WEBPACK_IMPORTED_MODULE_2__.playerVsComputerButton.addEventListener("click", () => {
    onPlayerVsComputerButtonClick();
});
_constants_constants__WEBPACK_IMPORTED_MODULE_2__.fieldSizeSelect.onchange = onFieldSizeSelectChange;
_constants_constants__WEBPACK_IMPORTED_MODULE_2__.cellForWinSelect.onchange = onCellSizeForWinChange;
function onCellClick(event) {
    const clickedCellId = parseInt(getCellIdFromIdName(event.target.id));
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
    if (!ticTacToeGame.gameStorage.isOneOfFieldUndefined()) {
        ticTacToeGame.setGameDataFromLocalStorrage();
    }
    else {
        ticTacToeGame.gameStorage.setDefaultData();
    }
    ;
    _constants_constants__WEBPACK_IMPORTED_MODULE_2__.htmlHintHeading.classList.add(_constants_constants__WEBPACK_IMPORTED_MODULE_2__.hintHeadingDisableClassName);
    event.target.classList.add(_constants_constants__WEBPACK_IMPORTED_MODULE_2__.disableButtonClassName);
    _constants_constants__WEBPACK_IMPORTED_MODULE_2__.refreshButton.classList.remove(_constants_constants__WEBPACK_IMPORTED_MODULE_2__.disableButtonClassName);
}
function onRefreshClick() {
    if (!gameInitializationButton.isClicked) {
        ticTacToeGame.refreshGame();
    }
}
function onPlayerVsPlayerButtonClick(refreshFields = true) {
    if (!ticTacToeGame.gameMode.isPlayerVsPlayerGameMode() || gameInitializationButton.isClicked) {
        return;
    }
    if (refreshFields) {
        ticTacToeGame.refreshGame();
    }
    ticTacToeGame.gameMode.isGameVsComputer = false;
    ticTacToeGame.gameStorage.setIsGameVsComputer(false);
    _constants_constants__WEBPACK_IMPORTED_MODULE_2__.playerVsPlayerButton.classList.remove(_constants_constants__WEBPACK_IMPORTED_MODULE_2__.disableButtonClassName);
    _constants_constants__WEBPACK_IMPORTED_MODULE_2__.playerVsComputerButton.classList.add(_constants_constants__WEBPACK_IMPORTED_MODULE_2__.disableButtonClassName);
}
function onPlayerVsComputerButtonClick(refreshFields = true) {
    if (!ticTacToeGame.gameMode.isPlayerVsComputerGameMode() || gameInitializationButton.isClicked) {
        return;
    }
    if (refreshFields) {
        ticTacToeGame.refreshGame();
    }
    ticTacToeGame.gameMode.isGameVsComputer = true;
    ticTacToeGame.gameStorage.setIsGameVsComputer(true);
    _constants_constants__WEBPACK_IMPORTED_MODULE_2__.playerVsComputerButton.classList.remove(_constants_constants__WEBPACK_IMPORTED_MODULE_2__.disableButtonClassName);
    _constants_constants__WEBPACK_IMPORTED_MODULE_2__.playerVsPlayerButton.classList.add(_constants_constants__WEBPACK_IMPORTED_MODULE_2__.disableButtonClassName);
}
function onFieldSizeSelectChange(event) {
    const newFieldSize = parseInt(event.target.value);
    if (newFieldSize < 3 || newFieldSize > 100) {
        window.alert("Must be in range(3, 100)");
        return;
    }
    if (!gameInitializationButton.isClicked) {
        ticTacToeGame.refreshGame();
    }
    ticTacToeGame.gameStorage.setFieldSize(newFieldSize);
    ticTacToeGame.gameField.generateField(newFieldSize);
    ticTacToeGame.gameStorage.setGameFieldToLocalStorrage(ticTacToeGame.gameField.field.toString());
    ticTacToeGame.htmlGameField.generateField(newFieldSize);
}
function onCellSizeForWinChange(event) {
    const newCellSizeForWin = parseInt(event.target.value);
    if (newCellSizeForWin < 3 || newCellSizeForWin > 100) {
        window.alert("Must be in range(3, 100)");
        return;
    }
    if (newCellSizeForWin > ticTacToeGame.gameField.getFieldSize()) {
        window.alert("Must be less then field size");
        return;
    }
    ticTacToeGame.gameField.setLenghtForWin(newCellSizeForWin);
    ticTacToeGame.gameStorage.setCellsQuantityForWin(newCellSizeForWin);
}
function getCellIdFromIdName(cellId) {
    const separatorIndex = _constants_constants__WEBPACK_IMPORTED_MODULE_2__.fieldCellIdName.length;
    const clickedCellIdString = cellId.toString().slice(separatorIndex);
    return clickedCellIdString;
}


/***/ }),

/***/ "./src/classes/game-field-class.ts":
/*!*****************************************!*\
  !*** ./src/classes/game-field-class.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/constants */ "./src/constants/constants.ts");


class CellsField {
    constructor(fieldSize) {
        this.field;
        this.fieldSize = fieldSize;
        this.generateField(fieldSize);
        this.gameFieldWithRowAndCols = this.generateFieldWithRowAndCols();
        this.lenghtForWin = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.initialCellsForWin;
    }
    refresh() {
        this.field.fill("");
    }
    getRandomCellIdForComputerStep() {
        while (true) {
            const randomCellId = Math.floor(Math.random() * this.field.length);
            if (this.isCellEmpty(randomCellId)) {
                return randomCellId;
            }
        }
    }
    getLenghtForWin() {
        return this.lenghtForWin;
    }
    getFieldSize() {
        return this.fieldSize;
    }
    setSymbolToSelectedFieldCell(currentStepSymbol, selectedCellNumber) {
        this.field[selectedCellNumber] = currentStepSymbol;
    }
    setLenghtForWin(newlenghtForWin) {
        this.lenghtForWin = newlenghtForWin;
    }
    isCellEmpty(cellIndex) {
        return this.field[cellIndex] === "";
    }
    isAllCellsTaken() {
        return this.field.every((cell) => cell !== "");
    }
    isCellExistsOnField(firstIndex, secondIndex) {
        return (this.gameFieldWithRowAndCols[firstIndex] !== undefined
            && this.gameFieldWithRowAndCols[firstIndex][secondIndex] !== undefined);
    }
    isWinCombination(currentSymbol) {
        this.gameFieldWithRowAndCols = this.generateFieldWithRowAndCols();
        if (this.isWinOnRow(currentSymbol)) {
            return true;
        }
        if (this.isWinOnColumn(currentSymbol)) {
            return true;
        }
        if (this.isWinOnMainDiagonal(currentSymbol)) {
            return true;
        }
        if (this.isWinOnSecondaryDiagonal(currentSymbol)) {
            return true;
        }
        return false;
    }
    isWinOnRow(currentSymbol) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            let currentStrick = 0;
            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                if (this.gameFieldWithRowAndCols[rowIndex][columnIndex] === currentSymbol) {
                    currentStrick++;
                }
                else {
                    currentStrick = 0;
                }
                if (currentStrick === this.lenghtForWin) {
                    return true;
                }
            }
        }
    }
    isWinOnColumn(currentSymbol) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            let currentStrick = 0;
            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                if (this.gameFieldWithRowAndCols[columnIndex][rowIndex] === currentSymbol) {
                    currentStrick++;
                }
                else {
                    currentStrick = 0;
                }
                if (currentStrick === this.lenghtForWin) {
                    return true;
                }
            }
        }
    }
    isWinOnMainDiagonal(currentSymbol) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                let currentStrick = 0;
                for (let indexDelta = 0; indexDelta < this.lenghtForWin + 1; indexDelta++) {
                    const rowShiftedIndex = rowIndex + indexDelta;
                    const columnShiftedIndex = columnIndex + indexDelta;
                    if (this.isCellExistsOnField(rowShiftedIndex, columnShiftedIndex)
                        && this.gameFieldWithRowAndCols[rowShiftedIndex][columnShiftedIndex] === currentSymbol) {
                        currentStrick++;
                    }
                    if (currentStrick === this.lenghtForWin) {
                        return true;
                    }
                }
            }
        }
    }
    isWinOnSecondaryDiagonal(currentSymbol) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                let currentStrick = 0;
                for (let indexDelta = 0; indexDelta < this.lenghtForWin + 1; indexDelta++) {
                    const rowShiftedIndex = rowIndex + indexDelta;
                    const columnShiftedIndex = columnIndex - indexDelta;
                    if (this.isCellExistsOnField(columnShiftedIndex, rowShiftedIndex)
                        && this.gameFieldWithRowAndCols[columnShiftedIndex][rowShiftedIndex] === currentSymbol) {
                        currentStrick++;
                    }
                    if (currentStrick === this.lenghtForWin) {
                        return true;
                    }
                }
            }
        }
    }
    generateField(fieldSize) {
        this.field = new Array(fieldSize * fieldSize).fill("");
        this.fieldSize = fieldSize;
    }
    generateFieldWithRowAndCols() {
        this.gameFieldWithRowAndCols = [];
        const rowLimits = [0, this.fieldSize];
        for (let index = 0; index < this.fieldSize; index++) {
            this.gameFieldWithRowAndCols.push([...this.field.slice(rowLimits[0], rowLimits[1])]);
            rowLimits[0] += this.fieldSize;
            rowLimits[1] += this.fieldSize;
        }
        return this.gameFieldWithRowAndCols;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CellsField);


/***/ }),

/***/ "./src/classes/game-initialization-button-class.ts":
/*!*********************************************************!*\
  !*** ./src/classes/game-initialization-button-class.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/constants */ "./src/constants/constants.ts");


class GameInitializationButton {
    constructor() {
        this.isAvailible = true;
        this.htmlButton = document.getElementById(_constants_constants__WEBPACK_IMPORTED_MODULE_0__.gameInitializationButtonIdName);
    }
    get isClicked() {
        return this.isAvailible;
    }
    set isClicked(isAvailible) {
        this.isAvailible = isAvailible;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameInitializationButton);


/***/ }),

/***/ "./src/classes/game-local-storage-class.ts":
/*!*************************************************!*\
  !*** ./src/classes/game-local-storage-class.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/constants */ "./src/constants/constants.ts");


class GameLocalStorage {
    constructor() {
        this.fieldNameOfGameField = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.fieldIdName;
        this.fieldNameOfGameFieldSize = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.fieldNameOfGamefieldSize;
        this.fieldNameOfCurrentSymbol = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.fieldNameOfCurrentSymbol;
        this.fieldNameOfIsGameVsComputer = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.fieldNameOfCurrentGameMode;
        this.fieldNameOfCellsForWin = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.fieldNameOfCellsForWin;
        this.gameLocalStorage = window.localStorage;
    }
    refresh() {
        const field = this.getField();
        for (let cellIndex = 0; cellIndex < field.length; cellIndex++) {
            field[cellIndex] = "";
        }
        console.log(field.join(","));
        this.setGameFieldToLocalStorrage(field.join(",").toString());
    }
    clear() {
        this.gameLocalStorage.clear();
    }
    getfieldSize() {
        return parseInt(this.gameLocalStorage[this.fieldNameOfGameFieldSize]);
    }
    getField() {
        const fieldArray = this.gameLocalStorage[this.fieldNameOfGameField].split(",");
        return fieldArray;
    }
    getCurrentStepSymbol() {
        return this.gameLocalStorage[this.fieldNameOfCurrentSymbol];
    }
    getIsGameVsComputer() {
        return this.gameLocalStorage[this.fieldNameOfIsGameVsComputer];
    }
    getCellsQuantityForWin() {
        return parseInt(this.gameLocalStorage[this.fieldNameOfCellsForWin]);
    }
    setDefaultData() {
        this.setFieldSize(_constants_constants__WEBPACK_IMPORTED_MODULE_0__.initialfieldSize);
        this.setCurrentStepSymbol(_constants_constants__WEBPACK_IMPORTED_MODULE_0__.firstStepSymbol);
        this.setIsGameVsComputer(_constants_constants__WEBPACK_IMPORTED_MODULE_0__.initialIsGameVsComputer);
        this.setCellsQuantityForWin(_constants_constants__WEBPACK_IMPORTED_MODULE_0__.initialCellsForWin);
    }
    setFieldSize(fieldSize) {
        this.gameLocalStorage[this.fieldNameOfGameFieldSize] = fieldSize;
    }
    setGameFieldToLocalStorrage(value) {
        this.gameLocalStorage.setItem(this.fieldNameOfGameField, value.toString());
    }
    setCurrentStepSymbol(currentSymbol) {
        this.gameLocalStorage[this.fieldNameOfCurrentSymbol] = currentSymbol;
    }
    setIsGameVsComputer(currentGameMode) {
        this.gameLocalStorage[this.fieldNameOfIsGameVsComputer] = currentGameMode;
    }
    setCellsQuantityForWin(newCellSizeForWin) {
        this.gameLocalStorage[this.fieldNameOfCellsForWin] = newCellSizeForWin;
    }
    isOneOfFieldUndefined() {
        return (this.isGameVsComputerUndefined()
            || this.isCurrentStepSymbolUndefined()
            || this.isFieldFromLocalStorrageEmpty()
            || this.isfieldSizeFromLocalStorrageUndefined()
            || this.isCellsForWinUndefined());
    }
    isGameVsComputerUndefined() {
        return this.gameLocalStorage[this.fieldNameOfIsGameVsComputer] === undefined;
    }
    isCurrentStepSymbolUndefined() {
        this.gameLocalStorage[this.fieldNameOfCurrentSymbol] === undefined;
    }
    isFieldFromLocalStorrageEmpty() {
        return this.gameLocalStorage[this.fieldNameOfGameField] === undefined;
    }
    isfieldSizeFromLocalStorrageUndefined() {
        return (this.gameLocalStorage[this.fieldNameOfGameFieldSize] === undefined
            || isNaN(this.gameLocalStorage[this.fieldNameOfGameFieldSize]));
    }
    isCellsForWinUndefined() {
        this.gameLocalStorage[this.fieldNameOfCellsForWin] === undefined;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameLocalStorage);


/***/ }),

/***/ "./src/classes/game-mode-class.ts":
/*!****************************************!*\
  !*** ./src/classes/game-mode-class.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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
        return this._isGameVsComputer;
    }
    isPlayerVsComputerGameMode() {
        return !this._isGameVsComputer;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameMode);


/***/ }),

/***/ "./src/classes/game-symbols-class.ts":
/*!*******************************************!*\
  !*** ./src/classes/game-symbols-class.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/constants */ "./src/constants/constants.ts");


class GameSymbols {
    constructor() {
        this._firstStepSymbol = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.firstStepSymbol;
        this._secondStepSymbol = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.secondStepSymbol;
        this._currentStepSymbol = this.firstStepSymbol;
    }
    refresh() {
        this._currentStepSymbol = this._firstStepSymbol;
    }
    get firstStepSymbol() {
        return this._firstStepSymbol;
    }
    get currentStepSymbol() {
        return this._currentStepSymbol;
    }
    set currentStepSymbol(stepSymbol) {
        this._currentStepSymbol = stepSymbol;
    }
    toggleCurrentStepSymbol() {
        this._currentStepSymbol = this._currentStepSymbol === this._secondStepSymbol
            ? this._firstStepSymbol
            : this._secondStepSymbol;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameSymbols);


/***/ }),

/***/ "./src/classes/html-game-field-class.ts":
/*!**********************************************!*\
  !*** ./src/classes/html-game-field-class.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/constants */ "./src/constants/constants.ts");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app */ "./src/app.ts");



class HtmlCellsField {
    constructor() {
        this.firstStepSymbol = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.firstStepSymbol;
        this.secondStepSymbol = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.secondStepSymbol;
        this.firstStepSymbolClassName = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.firstStepSymbolClassName;
        this.secondStepSymbolClassName = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.secondStepSymbolClassName;
        this.cellTagName = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.fieldCellTagName;
        this.cellIdName = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.cellIdName;
        this.cellClassName = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.cellClassName;
        this.rowIdAndClassName = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.fieldRowIdAndClassName;
        this.rowTagName = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.fieldRowTagName;
        this.fieldIdName = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.fieldIdName;
        this.generateField(_constants_constants__WEBPACK_IMPORTED_MODULE_0__.initialfieldSize);
        this.htmlMessageHeading = document.getElementById(_constants_constants__WEBPACK_IMPORTED_MODULE_0__.headingMessageIdName);
        this.allHtmlCells = document.getElementsByClassName(this.cellClassName);
    }
    refreshHtnlCells() {
        for (let cellIndex = 0; cellIndex < this.allHtmlCells.length; cellIndex++) {
            this.allHtmlCells[cellIndex].innerHTML = "";
            this.allHtmlCells[cellIndex].classList.remove(this.firstStepSymbolClassName);
            this.allHtmlCells[cellIndex].classList.remove(this.secondStepSymbolClassName);
        }
    }
    refreshHeadingMessage() {
        this.htmlMessageHeading.innerHTML = "";
        this.htmlMessageHeading.classList.remove(this.firstStepSymbolClassName);
        this.htmlMessageHeading.classList.remove(this.secondStepSymbolClassName);
    }
    setHeadingInnerHtml(message) {
        this.htmlMessageHeading.innerHTML = message;
        if (message.slice(0, 1) === this.firstStepSymbol) {
            this.htmlMessageHeading.classList.remove(this.secondStepSymbolClassName);
            this.htmlMessageHeading.classList.add(this.firstStepSymbolClassName);
        }
        else if (message.slice(0, 1) === this.secondStepSymbol) {
            this.htmlMessageHeading.classList.remove(this.firstStepSymbolClassName);
            this.htmlMessageHeading.classList.add(this.secondStepSymbolClassName);
        }
    }
    setSymbolToSelctedHtmlCell(currentStepSymbol, cellId) {
        const selectedCell = document.getElementById(`cell${cellId}`);
        selectedCell.innerHTML = currentStepSymbol;
        if (currentStepSymbol === this.firstStepSymbol) {
            selectedCell.classList.add(this.firstStepSymbolClassName);
        }
        else if (currentStepSymbol === this.secondStepSymbol) {
            selectedCell.classList.add(this.secondStepSymbolClassName);
        }
    }
    generateField(fieldSize) {
        let currentCellId = 0;
        const field = document.getElementById(this.fieldIdName);
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
    generateRow() {
        const row = document.createElement(this.rowTagName);
        row.setAttribute("id", this.rowIdAndClassName);
        row.classList.add(this.rowIdAndClassName);
        return row;
    }
    generateCell(cellId) {
        const cell = document.createElement(this.cellTagName);
        cell.setAttribute("id", `${this.cellIdName}${cellId}`);
        cell.classList.add(this.cellClassName);
        cell.addEventListener('click', _app__WEBPACK_IMPORTED_MODULE_1__.onCellClick);
        return cell;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HtmlCellsField);


/***/ }),

/***/ "./src/classes/tic-tac-toe-class.ts":
/*!******************************************!*\
  !*** ./src/classes/tic-tac-toe-class.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/constants */ "./src/constants/constants.ts");
/* harmony import */ var _game_symbols_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-symbols-class */ "./src/classes/game-symbols-class.ts");
/* harmony import */ var _game_mode_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-mode-class */ "./src/classes/game-mode-class.ts");
/* harmony import */ var _game_local_storage_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game-local-storage-class */ "./src/classes/game-local-storage-class.ts");
/* harmony import */ var _html_game_field_class__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./html-game-field-class */ "./src/classes/html-game-field-class.ts");
/* harmony import */ var _game_field_class__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game-field-class */ "./src/classes/game-field-class.ts");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../app */ "./src/app.ts");








class TicTacToeGame {
    constructor() {
        this.fieldName = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.fieldIdName;
        this.isGameStarts = false;
        this.gameField = new _game_field_class__WEBPACK_IMPORTED_MODULE_5__["default"](_constants_constants__WEBPACK_IMPORTED_MODULE_0__.initialfieldSize);
        this.htmlGameField = new _html_game_field_class__WEBPACK_IMPORTED_MODULE_4__["default"]();
        this.gameSymbols = new _game_symbols_class__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this._gameMode = new _game_mode_class__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.gameStorage = new _game_local_storage_class__WEBPACK_IMPORTED_MODULE_3__["default"]();
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
    get gameMode() {
        return this._gameMode;
    }
    get gameSembolsRefresh() {
        return this.gameSymbols.refresh;
    }
    getGameEndMessage() {
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
    setSymbolsFromLocalStorageOnFields(fieldFromLocalStorage) {
        fieldFromLocalStorage.forEach((currentCell, cellIndex) => {
            this.gameField.setSymbolToSelectedFieldCell(currentCell, cellIndex);
            this.htmlGameField.setSymbolToSelctedHtmlCell(currentCell, cellIndex);
        });
    }
    set_gameModeFromLocalStorage() {
        if (this.gameStorage.getIsGameVsComputer() === "true") {
            (0,_app__WEBPACK_IMPORTED_MODULE_6__.onPlayerVsComputerButtonClick)(false);
        }
    }
    setGameHeadingMessageFromLocalStorage() {
        if ((this.getGameEndMessage() === "") === false) {
            const currentHeadingMessage = this.getGameEndMessage();
            this.htmlGameField.setHeadingInnerHtml(currentHeadingMessage);
            this.toggleIsGameStarts();
        }
    }
    setInputValuesFromLocalStorrage(fieldSize, currentlenghtForWin) {
        const fieldSizeSelect = document.getElementById(_constants_constants__WEBPACK_IMPORTED_MODULE_0__.fieldSizeSelectIdName);
        const fieldCellsSizeForWinSelect = document.getElementById(_constants_constants__WEBPACK_IMPORTED_MODULE_0__.fieldCellsSizeForWinSelectIdName);
        fieldSizeSelect.value = fieldSize;
        fieldCellsSizeForWinSelect.value = currentlenghtForWin;
    }
    toggleIsGameStarts() {
        this.isGameStarts = !this.isGameStarts;
    }
    isPlayerCanStepToChosenCell(clickedCellId) {
        return this.gameField.isCellEmpty(clickedCellId) && this.isGameStarts;
    }
    isComputerCanStep() {
        return (this._gameMode.isGameVsComputer
            && !this.gameField.isAllCellsTaken()
            && this.isGameStarts);
    }
    makeStep(clickedCellId) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TicTacToeGame);


/***/ }),

/***/ "./src/constants/constants.ts":
/*!************************************!*\
  !*** ./src/constants/constants.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HtmlGameInitializationButton": () => (/* binding */ HtmlGameInitializationButton),
/* harmony export */   "cellClassName": () => (/* binding */ cellClassName),
/* harmony export */   "cellForWinSelect": () => (/* binding */ cellForWinSelect),
/* harmony export */   "cellIdName": () => (/* binding */ cellIdName),
/* harmony export */   "disableButtonClassName": () => (/* binding */ disableButtonClassName),
/* harmony export */   "fieldCellIdName": () => (/* binding */ fieldCellIdName),
/* harmony export */   "fieldCellTagName": () => (/* binding */ fieldCellTagName),
/* harmony export */   "fieldCellsClassName": () => (/* binding */ fieldCellsClassName),
/* harmony export */   "fieldCellsSizeForWinSelectIdName": () => (/* binding */ fieldCellsSizeForWinSelectIdName),
/* harmony export */   "fieldIdName": () => (/* binding */ fieldIdName),
/* harmony export */   "fieldNameOfCellsForWin": () => (/* binding */ fieldNameOfCellsForWin),
/* harmony export */   "fieldNameOfCurrentGameMode": () => (/* binding */ fieldNameOfCurrentGameMode),
/* harmony export */   "fieldNameOfCurrentSymbol": () => (/* binding */ fieldNameOfCurrentSymbol),
/* harmony export */   "fieldNameOfGamefieldSize": () => (/* binding */ fieldNameOfGamefieldSize),
/* harmony export */   "fieldRowIdAndClassName": () => (/* binding */ fieldRowIdAndClassName),
/* harmony export */   "fieldRowTagName": () => (/* binding */ fieldRowTagName),
/* harmony export */   "fieldSizeSelect": () => (/* binding */ fieldSizeSelect),
/* harmony export */   "fieldSizeSelectIdName": () => (/* binding */ fieldSizeSelectIdName),
/* harmony export */   "firstStepSymbol": () => (/* binding */ firstStepSymbol),
/* harmony export */   "firstStepSymbolClassName": () => (/* binding */ firstStepSymbolClassName),
/* harmony export */   "gameInitializationButtonIdName": () => (/* binding */ gameInitializationButtonIdName),
/* harmony export */   "headingMessageIdName": () => (/* binding */ headingMessageIdName),
/* harmony export */   "hintHeadingDisableClassName": () => (/* binding */ hintHeadingDisableClassName),
/* harmony export */   "hintHeadingIdName": () => (/* binding */ hintHeadingIdName),
/* harmony export */   "htmlHintHeading": () => (/* binding */ htmlHintHeading),
/* harmony export */   "initialCellsForWin": () => (/* binding */ initialCellsForWin),
/* harmony export */   "initialIsGameVsComputer": () => (/* binding */ initialIsGameVsComputer),
/* harmony export */   "initialfieldSize": () => (/* binding */ initialfieldSize),
/* harmony export */   "playerVsComputerButton": () => (/* binding */ playerVsComputerButton),
/* harmony export */   "playerVsComputerButtonIdName": () => (/* binding */ playerVsComputerButtonIdName),
/* harmony export */   "playerVsPlayerButton": () => (/* binding */ playerVsPlayerButton),
/* harmony export */   "playerVsPlayerButtonIdName": () => (/* binding */ playerVsPlayerButtonIdName),
/* harmony export */   "refreshButton": () => (/* binding */ refreshButton),
/* harmony export */   "refreshButtonIdName": () => (/* binding */ refreshButtonIdName),
/* harmony export */   "secondStepSymbol": () => (/* binding */ secondStepSymbol),
/* harmony export */   "secondStepSymbolClassName": () => (/* binding */ secondStepSymbolClassName)
/* harmony export */ });
const firstStepSymbol = "X";
const secondStepSymbol = "O";
const firstStepSymbolClassName = "controll-buttons__controll-button_color-blue";
const secondStepSymbolClassName = "controll-buttons__controll-button_color-red";
const fieldIdName = "field";
const fieldRowTagName = "div";
const fieldCellTagName = "div";
const fieldCellsClassName = "field__cell";
const fieldCellIdName = "cell";
const fieldRowIdAndClassName = "field__row";
const cellClassName = "field__cell";
const cellIdName = "cell";
const fieldNameOfCurrentGameMode = "gameMode";
const fieldNameOfCellsForWin = "fieldNameOfCellsForWin";
const fieldNameOfGamefieldSize = "fieldSize";
const fieldNameOfCurrentSymbol = "currentSymbol";
const initialCellsForWin = 3;
const initialIsGameVsComputer = false;
const initialfieldSize = 3;
const headingMessageIdName = "messageHeading";
const refreshButtonIdName = "refreshButton";
const playerVsPlayerButtonIdName = "playerVsPlayerButton";
const playerVsComputerButtonIdName = "playerVsComputerButton";
const fieldSizeSelectIdName = "fieldSizeSelect";
const fieldCellsSizeForWinSelectIdName = "fieldCellsSizeForWinSelect";
const gameInitializationButtonIdName = "gameInitializationButton";
const hintHeadingIdName = "hintHeading";
const hintHeadingDisableClassName = "hint-container__heading_disable";
const refreshButton = document.getElementById(refreshButtonIdName);
const playerVsPlayerButton = document.getElementById(playerVsPlayerButtonIdName);
const playerVsComputerButton = document.getElementById(playerVsComputerButtonIdName);
const fieldSizeSelect = document.getElementById(fieldSizeSelectIdName);
const HtmlGameInitializationButton = document.getElementById(gameInitializationButtonIdName);
const cellForWinSelect = document.getElementById(fieldCellsSizeForWinSelectIdName);
const htmlHintHeading = document.getElementById(hintHeadingIdName);
const disableButtonClassName = "controll-buttons__controll-button_disabled";


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNuQ1A7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91bmlicml4NC0xLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly91bmlicml4NC0xLy4vc3JjL2NsYXNzZXMvZ2FtZS1maWVsZC1jbGFzcy50cyIsIndlYnBhY2s6Ly91bmlicml4NC0xLy4vc3JjL2NsYXNzZXMvZ2FtZS1pbml0aWFsaXphdGlvbi1idXR0b24tY2xhc3MudHMiLCJ3ZWJwYWNrOi8vdW5pYnJpeDQtMS8uL3NyYy9jbGFzc2VzL2dhbWUtbG9jYWwtc3RvcmFnZS1jbGFzcy50cyIsIndlYnBhY2s6Ly91bmlicml4NC0xLy4vc3JjL2NsYXNzZXMvZ2FtZS1tb2RlLWNsYXNzLnRzIiwid2VicGFjazovL3VuaWJyaXg0LTEvLi9zcmMvY2xhc3Nlcy9nYW1lLXN5bWJvbHMtY2xhc3MudHMiLCJ3ZWJwYWNrOi8vdW5pYnJpeDQtMS8uL3NyYy9jbGFzc2VzL2h0bWwtZ2FtZS1maWVsZC1jbGFzcy50cyIsIndlYnBhY2s6Ly91bmlicml4NC0xLy4vc3JjL2NsYXNzZXMvdGljLXRhYy10b2UtY2xhc3MudHMiLCJ3ZWJwYWNrOi8vdW5pYnJpeDQtMS8uL3NyYy9jb25zdGFudHMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3VuaWJyaXg0LTEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdW5pYnJpeDQtMS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdW5pYnJpeDQtMS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3VuaWJyaXg0LTEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91bmlicml4NC0xL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdW5pYnJpeDQtMS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdW5pYnJpeDQtMS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgR2FtZUluaXRpYWxpemF0aW9uQnV0dG9uIGZyb20gXCIuL2NsYXNzZXMvZ2FtZS1pbml0aWFsaXphdGlvbi1idXR0b24tY2xhc3NcIjtcbmltcG9ydCBUaWNUYWNUb2VHYW1lIGZyb20gXCIuL2NsYXNzZXMvdGljLXRhYy10b2UtY2xhc3NcIjtcbmltcG9ydCB7IGZpZWxkQ2VsbElkTmFtZSwgZGlzYWJsZUJ1dHRvbkNsYXNzTmFtZSwgaGludEhlYWRpbmdEaXNhYmxlQ2xhc3NOYW1lLCByZWZyZXNoQnV0dG9uLCBwbGF5ZXJWc1BsYXllckJ1dHRvbiwgcGxheWVyVnNDb21wdXRlckJ1dHRvbiwgZmllbGRTaXplU2VsZWN0LCBjZWxsRm9yV2luU2VsZWN0LCBIdG1sR2FtZUluaXRpYWxpemF0aW9uQnV0dG9uLCBodG1sSGludEhlYWRpbmcgfSBmcm9tIFwiLi9jb25zdGFudHMvY29uc3RhbnRzXCI7XG5jb25zdCB0aWNUYWNUb2VHYW1lID0gbmV3IFRpY1RhY1RvZUdhbWUoKTtcbmNvbnN0IGdhbWVJbml0aWFsaXphdGlvbkJ1dHRvbiA9IG5ldyBHYW1lSW5pdGlhbGl6YXRpb25CdXR0b24oKTtcbkh0bWxHYW1lSW5pdGlhbGl6YXRpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uR2FtZUluaXRpYWxpemF0aW9uQnV0dG9uQ2xpY2spO1xucmVmcmVzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25SZWZyZXNoQ2xpY2spO1xucGxheWVyVnNQbGF5ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBvblBsYXllclZzUGxheWVyQnV0dG9uQ2xpY2soKTtcbn0pO1xucGxheWVyVnNDb21wdXRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG9uUGxheWVyVnNDb21wdXRlckJ1dHRvbkNsaWNrKCk7XG59KTtcbmZpZWxkU2l6ZVNlbGVjdC5vbmNoYW5nZSA9IG9uRmllbGRTaXplU2VsZWN0Q2hhbmdlO1xuY2VsbEZvcldpblNlbGVjdC5vbmNoYW5nZSA9IG9uQ2VsbFNpemVGb3JXaW5DaGFuZ2U7XG5leHBvcnQgZnVuY3Rpb24gb25DZWxsQ2xpY2soZXZlbnQpIHtcbiAgICBjb25zdCBjbGlja2VkQ2VsbElkID0gcGFyc2VJbnQoZ2V0Q2VsbElkRnJvbUlkTmFtZShldmVudC50YXJnZXQuaWQpKTtcbiAgICBpZiAoIXRpY1RhY1RvZUdhbWUuaXNQbGF5ZXJDYW5TdGVwVG9DaG9zZW5DZWxsKGNsaWNrZWRDZWxsSWQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGljVGFjVG9lR2FtZS5tYWtlU3RlcChjbGlja2VkQ2VsbElkKTtcbiAgICBpZiAoIXRpY1RhY1RvZUdhbWUuaXNDb21wdXRlckNhblN0ZXAoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRpY1RhY1RvZUdhbWUubWFrZUNvbXB1dGVyU3RlcCgpO1xufVxuZnVuY3Rpb24gb25HYW1lSW5pdGlhbGl6YXRpb25CdXR0b25DbGljayhldmVudCkge1xuICAgIGlmICghZ2FtZUluaXRpYWxpemF0aW9uQnV0dG9uLmlzQ2xpY2tlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGdhbWVJbml0aWFsaXphdGlvbkJ1dHRvbi5pc0NsaWNrZWQgPSBmYWxzZTtcbiAgICB0aWNUYWNUb2VHYW1lLnRvZ2dsZUlzR2FtZVN0YXJ0cygpO1xuICAgIGlmICghdGljVGFjVG9lR2FtZS5nYW1lU3RvcmFnZS5pc09uZU9mRmllbGRVbmRlZmluZWQoKSkge1xuICAgICAgICB0aWNUYWNUb2VHYW1lLnNldEdhbWVEYXRhRnJvbUxvY2FsU3RvcnJhZ2UoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRpY1RhY1RvZUdhbWUuZ2FtZVN0b3JhZ2Uuc2V0RGVmYXVsdERhdGEoKTtcbiAgICB9XG4gICAgO1xuICAgIGh0bWxIaW50SGVhZGluZy5jbGFzc0xpc3QuYWRkKGhpbnRIZWFkaW5nRGlzYWJsZUNsYXNzTmFtZSk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoZGlzYWJsZUJ1dHRvbkNsYXNzTmFtZSk7XG4gICAgcmVmcmVzaEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVCdXR0b25DbGFzc05hbWUpO1xufVxuZnVuY3Rpb24gb25SZWZyZXNoQ2xpY2soKSB7XG4gICAgaWYgKCFnYW1lSW5pdGlhbGl6YXRpb25CdXR0b24uaXNDbGlja2VkKSB7XG4gICAgICAgIHRpY1RhY1RvZUdhbWUucmVmcmVzaEdhbWUoKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gb25QbGF5ZXJWc1BsYXllckJ1dHRvbkNsaWNrKHJlZnJlc2hGaWVsZHMgPSB0cnVlKSB7XG4gICAgaWYgKCF0aWNUYWNUb2VHYW1lLmdhbWVNb2RlLmlzUGxheWVyVnNQbGF5ZXJHYW1lTW9kZSgpIHx8IGdhbWVJbml0aWFsaXphdGlvbkJ1dHRvbi5pc0NsaWNrZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVmcmVzaEZpZWxkcykge1xuICAgICAgICB0aWNUYWNUb2VHYW1lLnJlZnJlc2hHYW1lKCk7XG4gICAgfVxuICAgIHRpY1RhY1RvZUdhbWUuZ2FtZU1vZGUuaXNHYW1lVnNDb21wdXRlciA9IGZhbHNlO1xuICAgIHRpY1RhY1RvZUdhbWUuZ2FtZVN0b3JhZ2Uuc2V0SXNHYW1lVnNDb21wdXRlcihmYWxzZSk7XG4gICAgcGxheWVyVnNQbGF5ZXJCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShkaXNhYmxlQnV0dG9uQ2xhc3NOYW1lKTtcbiAgICBwbGF5ZXJWc0NvbXB1dGVyQnV0dG9uLmNsYXNzTGlzdC5hZGQoZGlzYWJsZUJ1dHRvbkNsYXNzTmFtZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gb25QbGF5ZXJWc0NvbXB1dGVyQnV0dG9uQ2xpY2socmVmcmVzaEZpZWxkcyA9IHRydWUpIHtcbiAgICBpZiAoIXRpY1RhY1RvZUdhbWUuZ2FtZU1vZGUuaXNQbGF5ZXJWc0NvbXB1dGVyR2FtZU1vZGUoKSB8fCBnYW1lSW5pdGlhbGl6YXRpb25CdXR0b24uaXNDbGlja2VkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHJlZnJlc2hGaWVsZHMpIHtcbiAgICAgICAgdGljVGFjVG9lR2FtZS5yZWZyZXNoR2FtZSgpO1xuICAgIH1cbiAgICB0aWNUYWNUb2VHYW1lLmdhbWVNb2RlLmlzR2FtZVZzQ29tcHV0ZXIgPSB0cnVlO1xuICAgIHRpY1RhY1RvZUdhbWUuZ2FtZVN0b3JhZ2Uuc2V0SXNHYW1lVnNDb21wdXRlcih0cnVlKTtcbiAgICBwbGF5ZXJWc0NvbXB1dGVyQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoZGlzYWJsZUJ1dHRvbkNsYXNzTmFtZSk7XG4gICAgcGxheWVyVnNQbGF5ZXJCdXR0b24uY2xhc3NMaXN0LmFkZChkaXNhYmxlQnV0dG9uQ2xhc3NOYW1lKTtcbn1cbmZ1bmN0aW9uIG9uRmllbGRTaXplU2VsZWN0Q2hhbmdlKGV2ZW50KSB7XG4gICAgY29uc3QgbmV3RmllbGRTaXplID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICBpZiAobmV3RmllbGRTaXplIDwgMyB8fCBuZXdGaWVsZFNpemUgPiAxMDApIHtcbiAgICAgICAgd2luZG93LmFsZXJ0KFwiTXVzdCBiZSBpbiByYW5nZSgzLCAxMDApXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZ2FtZUluaXRpYWxpemF0aW9uQnV0dG9uLmlzQ2xpY2tlZCkge1xuICAgICAgICB0aWNUYWNUb2VHYW1lLnJlZnJlc2hHYW1lKCk7XG4gICAgfVxuICAgIHRpY1RhY1RvZUdhbWUuZ2FtZVN0b3JhZ2Uuc2V0RmllbGRTaXplKG5ld0ZpZWxkU2l6ZSk7XG4gICAgdGljVGFjVG9lR2FtZS5nYW1lRmllbGQuZ2VuZXJhdGVGaWVsZChuZXdGaWVsZFNpemUpO1xuICAgIHRpY1RhY1RvZUdhbWUuZ2FtZVN0b3JhZ2Uuc2V0R2FtZUZpZWxkVG9Mb2NhbFN0b3JyYWdlKHRpY1RhY1RvZUdhbWUuZ2FtZUZpZWxkLmZpZWxkLnRvU3RyaW5nKCkpO1xuICAgIHRpY1RhY1RvZUdhbWUuaHRtbEdhbWVGaWVsZC5nZW5lcmF0ZUZpZWxkKG5ld0ZpZWxkU2l6ZSk7XG59XG5mdW5jdGlvbiBvbkNlbGxTaXplRm9yV2luQ2hhbmdlKGV2ZW50KSB7XG4gICAgY29uc3QgbmV3Q2VsbFNpemVGb3JXaW4gPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUpO1xuICAgIGlmIChuZXdDZWxsU2l6ZUZvcldpbiA8IDMgfHwgbmV3Q2VsbFNpemVGb3JXaW4gPiAxMDApIHtcbiAgICAgICAgd2luZG93LmFsZXJ0KFwiTXVzdCBiZSBpbiByYW5nZSgzLCAxMDApXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChuZXdDZWxsU2l6ZUZvcldpbiA+IHRpY1RhY1RvZUdhbWUuZ2FtZUZpZWxkLmdldEZpZWxkU2l6ZSgpKSB7XG4gICAgICAgIHdpbmRvdy5hbGVydChcIk11c3QgYmUgbGVzcyB0aGVuIGZpZWxkIHNpemVcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGljVGFjVG9lR2FtZS5nYW1lRmllbGQuc2V0TGVuZ2h0Rm9yV2luKG5ld0NlbGxTaXplRm9yV2luKTtcbiAgICB0aWNUYWNUb2VHYW1lLmdhbWVTdG9yYWdlLnNldENlbGxzUXVhbnRpdHlGb3JXaW4obmV3Q2VsbFNpemVGb3JXaW4pO1xufVxuZnVuY3Rpb24gZ2V0Q2VsbElkRnJvbUlkTmFtZShjZWxsSWQpIHtcbiAgICBjb25zdCBzZXBhcmF0b3JJbmRleCA9IGZpZWxkQ2VsbElkTmFtZS5sZW5ndGg7XG4gICAgY29uc3QgY2xpY2tlZENlbGxJZFN0cmluZyA9IGNlbGxJZC50b1N0cmluZygpLnNsaWNlKHNlcGFyYXRvckluZGV4KTtcbiAgICByZXR1cm4gY2xpY2tlZENlbGxJZFN0cmluZztcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgaW5pdGlhbENlbGxzRm9yV2luIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9jb25zdGFudHNcIjtcbmNsYXNzIENlbGxzRmllbGQge1xuICAgIGNvbnN0cnVjdG9yKGZpZWxkU2l6ZSkge1xuICAgICAgICB0aGlzLmZpZWxkO1xuICAgICAgICB0aGlzLmZpZWxkU2l6ZSA9IGZpZWxkU2l6ZTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUZpZWxkKGZpZWxkU2l6ZSk7XG4gICAgICAgIHRoaXMuZ2FtZUZpZWxkV2l0aFJvd0FuZENvbHMgPSB0aGlzLmdlbmVyYXRlRmllbGRXaXRoUm93QW5kQ29scygpO1xuICAgICAgICB0aGlzLmxlbmdodEZvcldpbiA9IGluaXRpYWxDZWxsc0ZvcldpbjtcbiAgICB9XG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5maWVsZC5maWxsKFwiXCIpO1xuICAgIH1cbiAgICBnZXRSYW5kb21DZWxsSWRGb3JDb21wdXRlclN0ZXAoKSB7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCByYW5kb21DZWxsSWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmZpZWxkLmxlbmd0aCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0NlbGxFbXB0eShyYW5kb21DZWxsSWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbmRvbUNlbGxJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRMZW5naHRGb3JXaW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxlbmdodEZvcldpbjtcbiAgICB9XG4gICAgZ2V0RmllbGRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWVsZFNpemU7XG4gICAgfVxuICAgIHNldFN5bWJvbFRvU2VsZWN0ZWRGaWVsZENlbGwoY3VycmVudFN0ZXBTeW1ib2wsIHNlbGVjdGVkQ2VsbE51bWJlcikge1xuICAgICAgICB0aGlzLmZpZWxkW3NlbGVjdGVkQ2VsbE51bWJlcl0gPSBjdXJyZW50U3RlcFN5bWJvbDtcbiAgICB9XG4gICAgc2V0TGVuZ2h0Rm9yV2luKG5ld2xlbmdodEZvcldpbikge1xuICAgICAgICB0aGlzLmxlbmdodEZvcldpbiA9IG5ld2xlbmdodEZvcldpbjtcbiAgICB9XG4gICAgaXNDZWxsRW1wdHkoY2VsbEluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkW2NlbGxJbmRleF0gPT09IFwiXCI7XG4gICAgfVxuICAgIGlzQWxsQ2VsbHNUYWtlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGQuZXZlcnkoKGNlbGwpID0+IGNlbGwgIT09IFwiXCIpO1xuICAgIH1cbiAgICBpc0NlbGxFeGlzdHNPbkZpZWxkKGZpcnN0SW5kZXgsIHNlY29uZEluZGV4KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5nYW1lRmllbGRXaXRoUm93QW5kQ29sc1tmaXJzdEluZGV4XSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAmJiB0aGlzLmdhbWVGaWVsZFdpdGhSb3dBbmRDb2xzW2ZpcnN0SW5kZXhdW3NlY29uZEluZGV4XSAhPT0gdW5kZWZpbmVkKTtcbiAgICB9XG4gICAgaXNXaW5Db21iaW5hdGlvbihjdXJyZW50U3ltYm9sKSB7XG4gICAgICAgIHRoaXMuZ2FtZUZpZWxkV2l0aFJvd0FuZENvbHMgPSB0aGlzLmdlbmVyYXRlRmllbGRXaXRoUm93QW5kQ29scygpO1xuICAgICAgICBpZiAodGhpcy5pc1dpbk9uUm93KGN1cnJlbnRTeW1ib2wpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc1dpbk9uQ29sdW1uKGN1cnJlbnRTeW1ib2wpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc1dpbk9uTWFpbkRpYWdvbmFsKGN1cnJlbnRTeW1ib2wpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc1dpbk9uU2Vjb25kYXJ5RGlhZ29uYWwoY3VycmVudFN5bWJvbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaXNXaW5PblJvdyhjdXJyZW50U3ltYm9sKSB7XG4gICAgICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCB0aGlzLmdhbWVGaWVsZFdpdGhSb3dBbmRDb2xzLmxlbmd0aDsgcm93SW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRTdHJpY2sgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uSW5kZXggPSAwOyBjb2x1bW5JbmRleCA8IHRoaXMuZ2FtZUZpZWxkV2l0aFJvd0FuZENvbHNbcm93SW5kZXhdLmxlbmd0aDsgY29sdW1uSW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWVGaWVsZFdpdGhSb3dBbmRDb2xzW3Jvd0luZGV4XVtjb2x1bW5JbmRleF0gPT09IGN1cnJlbnRTeW1ib2wpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0cmljaysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0cmljayA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3RyaWNrID09PSB0aGlzLmxlbmdodEZvcldpbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNXaW5PbkNvbHVtbihjdXJyZW50U3ltYm9sKSB7XG4gICAgICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCB0aGlzLmdhbWVGaWVsZFdpdGhSb3dBbmRDb2xzLmxlbmd0aDsgcm93SW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRTdHJpY2sgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uSW5kZXggPSAwOyBjb2x1bW5JbmRleCA8IHRoaXMuZ2FtZUZpZWxkV2l0aFJvd0FuZENvbHNbcm93SW5kZXhdLmxlbmd0aDsgY29sdW1uSW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWVGaWVsZFdpdGhSb3dBbmRDb2xzW2NvbHVtbkluZGV4XVtyb3dJbmRleF0gPT09IGN1cnJlbnRTeW1ib2wpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0cmljaysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0cmljayA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3RyaWNrID09PSB0aGlzLmxlbmdodEZvcldpbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNXaW5Pbk1haW5EaWFnb25hbChjdXJyZW50U3ltYm9sKSB7XG4gICAgICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCB0aGlzLmdhbWVGaWVsZFdpdGhSb3dBbmRDb2xzLmxlbmd0aDsgcm93SW5kZXgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uSW5kZXggPSAwOyBjb2x1bW5JbmRleCA8IHRoaXMuZ2FtZUZpZWxkV2l0aFJvd0FuZENvbHNbcm93SW5kZXhdLmxlbmd0aDsgY29sdW1uSW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U3RyaWNrID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleERlbHRhID0gMDsgaW5kZXhEZWx0YSA8IHRoaXMubGVuZ2h0Rm9yV2luICsgMTsgaW5kZXhEZWx0YSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd1NoaWZ0ZWRJbmRleCA9IHJvd0luZGV4ICsgaW5kZXhEZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uU2hpZnRlZEluZGV4ID0gY29sdW1uSW5kZXggKyBpbmRleERlbHRhO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NlbGxFeGlzdHNPbkZpZWxkKHJvd1NoaWZ0ZWRJbmRleCwgY29sdW1uU2hpZnRlZEluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5nYW1lRmllbGRXaXRoUm93QW5kQ29sc1tyb3dTaGlmdGVkSW5kZXhdW2NvbHVtblNoaWZ0ZWRJbmRleF0gPT09IGN1cnJlbnRTeW1ib2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdHJpY2srKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN0cmljayA9PT0gdGhpcy5sZW5naHRGb3JXaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlzV2luT25TZWNvbmRhcnlEaWFnb25hbChjdXJyZW50U3ltYm9sKSB7XG4gICAgICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCB0aGlzLmdhbWVGaWVsZFdpdGhSb3dBbmRDb2xzLmxlbmd0aDsgcm93SW5kZXgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uSW5kZXggPSAwOyBjb2x1bW5JbmRleCA8IHRoaXMuZ2FtZUZpZWxkV2l0aFJvd0FuZENvbHNbcm93SW5kZXhdLmxlbmd0aDsgY29sdW1uSW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U3RyaWNrID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleERlbHRhID0gMDsgaW5kZXhEZWx0YSA8IHRoaXMubGVuZ2h0Rm9yV2luICsgMTsgaW5kZXhEZWx0YSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd1NoaWZ0ZWRJbmRleCA9IHJvd0luZGV4ICsgaW5kZXhEZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uU2hpZnRlZEluZGV4ID0gY29sdW1uSW5kZXggLSBpbmRleERlbHRhO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NlbGxFeGlzdHNPbkZpZWxkKGNvbHVtblNoaWZ0ZWRJbmRleCwgcm93U2hpZnRlZEluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5nYW1lRmllbGRXaXRoUm93QW5kQ29sc1tjb2x1bW5TaGlmdGVkSW5kZXhdW3Jvd1NoaWZ0ZWRJbmRleF0gPT09IGN1cnJlbnRTeW1ib2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdHJpY2srKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN0cmljayA9PT0gdGhpcy5sZW5naHRGb3JXaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGdlbmVyYXRlRmllbGQoZmllbGRTaXplKSB7XG4gICAgICAgIHRoaXMuZmllbGQgPSBuZXcgQXJyYXkoZmllbGRTaXplICogZmllbGRTaXplKS5maWxsKFwiXCIpO1xuICAgICAgICB0aGlzLmZpZWxkU2l6ZSA9IGZpZWxkU2l6ZTtcbiAgICB9XG4gICAgZ2VuZXJhdGVGaWVsZFdpdGhSb3dBbmRDb2xzKCkge1xuICAgICAgICB0aGlzLmdhbWVGaWVsZFdpdGhSb3dBbmRDb2xzID0gW107XG4gICAgICAgIGNvbnN0IHJvd0xpbWl0cyA9IFswLCB0aGlzLmZpZWxkU2l6ZV07XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmZpZWxkU2l6ZTsgaW5kZXgrKykge1xuICAgICAgICAgICAgdGhpcy5nYW1lRmllbGRXaXRoUm93QW5kQ29scy5wdXNoKFsuLi50aGlzLmZpZWxkLnNsaWNlKHJvd0xpbWl0c1swXSwgcm93TGltaXRzWzFdKV0pO1xuICAgICAgICAgICAgcm93TGltaXRzWzBdICs9IHRoaXMuZmllbGRTaXplO1xuICAgICAgICAgICAgcm93TGltaXRzWzFdICs9IHRoaXMuZmllbGRTaXplO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVGaWVsZFdpdGhSb3dBbmRDb2xzO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENlbGxzRmllbGQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCB7IGdhbWVJbml0aWFsaXphdGlvbkJ1dHRvbklkTmFtZSB9IGZyb20gXCIuLi9jb25zdGFudHMvY29uc3RhbnRzXCI7XG5jbGFzcyBHYW1lSW5pdGlhbGl6YXRpb25CdXR0b24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlzQXZhaWxpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5odG1sQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZ2FtZUluaXRpYWxpemF0aW9uQnV0dG9uSWROYW1lKTtcbiAgICB9XG4gICAgZ2V0IGlzQ2xpY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNBdmFpbGlibGU7XG4gICAgfVxuICAgIHNldCBpc0NsaWNrZWQoaXNBdmFpbGlibGUpIHtcbiAgICAgICAgdGhpcy5pc0F2YWlsaWJsZSA9IGlzQXZhaWxpYmxlO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEdhbWVJbml0aWFsaXphdGlvbkJ1dHRvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgZmllbGRJZE5hbWUsIGZpZWxkTmFtZU9mR2FtZWZpZWxkU2l6ZSwgZmllbGROYW1lT2ZDdXJyZW50U3ltYm9sLCBmaWVsZE5hbWVPZkN1cnJlbnRHYW1lTW9kZSwgZmllbGROYW1lT2ZDZWxsc0ZvcldpbiwgZmlyc3RTdGVwU3ltYm9sLCBpbml0aWFsZmllbGRTaXplLCBpbml0aWFsQ2VsbHNGb3JXaW4sIGluaXRpYWxJc0dhbWVWc0NvbXB1dGVyIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9jb25zdGFudHNcIjtcbmNsYXNzIEdhbWVMb2NhbFN0b3JhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmZpZWxkTmFtZU9mR2FtZUZpZWxkID0gZmllbGRJZE5hbWU7XG4gICAgICAgIHRoaXMuZmllbGROYW1lT2ZHYW1lRmllbGRTaXplID0gZmllbGROYW1lT2ZHYW1lZmllbGRTaXplO1xuICAgICAgICB0aGlzLmZpZWxkTmFtZU9mQ3VycmVudFN5bWJvbCA9IGZpZWxkTmFtZU9mQ3VycmVudFN5bWJvbDtcbiAgICAgICAgdGhpcy5maWVsZE5hbWVPZklzR2FtZVZzQ29tcHV0ZXIgPSBmaWVsZE5hbWVPZkN1cnJlbnRHYW1lTW9kZTtcbiAgICAgICAgdGhpcy5maWVsZE5hbWVPZkNlbGxzRm9yV2luID0gZmllbGROYW1lT2ZDZWxsc0ZvcldpbjtcbiAgICAgICAgdGhpcy5nYW1lTG9jYWxTdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICB9XG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLmdldEZpZWxkKCk7XG4gICAgICAgIGZvciAobGV0IGNlbGxJbmRleCA9IDA7IGNlbGxJbmRleCA8IGZpZWxkLmxlbmd0aDsgY2VsbEluZGV4KyspIHtcbiAgICAgICAgICAgIGZpZWxkW2NlbGxJbmRleF0gPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGZpZWxkLmpvaW4oXCIsXCIpKTtcbiAgICAgICAgdGhpcy5zZXRHYW1lRmllbGRUb0xvY2FsU3RvcnJhZ2UoZmllbGQuam9pbihcIixcIikudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmdhbWVMb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG4gICAgZ2V0ZmllbGRTaXplKCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5nYW1lTG9jYWxTdG9yYWdlW3RoaXMuZmllbGROYW1lT2ZHYW1lRmllbGRTaXplXSk7XG4gICAgfVxuICAgIGdldEZpZWxkKCkge1xuICAgICAgICBjb25zdCBmaWVsZEFycmF5ID0gdGhpcy5nYW1lTG9jYWxTdG9yYWdlW3RoaXMuZmllbGROYW1lT2ZHYW1lRmllbGRdLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgcmV0dXJuIGZpZWxkQXJyYXk7XG4gICAgfVxuICAgIGdldEN1cnJlbnRTdGVwU3ltYm9sKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lTG9jYWxTdG9yYWdlW3RoaXMuZmllbGROYW1lT2ZDdXJyZW50U3ltYm9sXTtcbiAgICB9XG4gICAgZ2V0SXNHYW1lVnNDb21wdXRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZUxvY2FsU3RvcmFnZVt0aGlzLmZpZWxkTmFtZU9mSXNHYW1lVnNDb21wdXRlcl07XG4gICAgfVxuICAgIGdldENlbGxzUXVhbnRpdHlGb3JXaW4oKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLmdhbWVMb2NhbFN0b3JhZ2VbdGhpcy5maWVsZE5hbWVPZkNlbGxzRm9yV2luXSk7XG4gICAgfVxuICAgIHNldERlZmF1bHREYXRhKCkge1xuICAgICAgICB0aGlzLnNldEZpZWxkU2l6ZShpbml0aWFsZmllbGRTaXplKTtcbiAgICAgICAgdGhpcy5zZXRDdXJyZW50U3RlcFN5bWJvbChmaXJzdFN0ZXBTeW1ib2wpO1xuICAgICAgICB0aGlzLnNldElzR2FtZVZzQ29tcHV0ZXIoaW5pdGlhbElzR2FtZVZzQ29tcHV0ZXIpO1xuICAgICAgICB0aGlzLnNldENlbGxzUXVhbnRpdHlGb3JXaW4oaW5pdGlhbENlbGxzRm9yV2luKTtcbiAgICB9XG4gICAgc2V0RmllbGRTaXplKGZpZWxkU2l6ZSkge1xuICAgICAgICB0aGlzLmdhbWVMb2NhbFN0b3JhZ2VbdGhpcy5maWVsZE5hbWVPZkdhbWVGaWVsZFNpemVdID0gZmllbGRTaXplO1xuICAgIH1cbiAgICBzZXRHYW1lRmllbGRUb0xvY2FsU3RvcnJhZ2UodmFsdWUpIHtcbiAgICAgICAgdGhpcy5nYW1lTG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5maWVsZE5hbWVPZkdhbWVGaWVsZCwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIHNldEN1cnJlbnRTdGVwU3ltYm9sKGN1cnJlbnRTeW1ib2wpIHtcbiAgICAgICAgdGhpcy5nYW1lTG9jYWxTdG9yYWdlW3RoaXMuZmllbGROYW1lT2ZDdXJyZW50U3ltYm9sXSA9IGN1cnJlbnRTeW1ib2w7XG4gICAgfVxuICAgIHNldElzR2FtZVZzQ29tcHV0ZXIoY3VycmVudEdhbWVNb2RlKSB7XG4gICAgICAgIHRoaXMuZ2FtZUxvY2FsU3RvcmFnZVt0aGlzLmZpZWxkTmFtZU9mSXNHYW1lVnNDb21wdXRlcl0gPSBjdXJyZW50R2FtZU1vZGU7XG4gICAgfVxuICAgIHNldENlbGxzUXVhbnRpdHlGb3JXaW4obmV3Q2VsbFNpemVGb3JXaW4pIHtcbiAgICAgICAgdGhpcy5nYW1lTG9jYWxTdG9yYWdlW3RoaXMuZmllbGROYW1lT2ZDZWxsc0Zvcldpbl0gPSBuZXdDZWxsU2l6ZUZvcldpbjtcbiAgICB9XG4gICAgaXNPbmVPZkZpZWxkVW5kZWZpbmVkKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuaXNHYW1lVnNDb21wdXRlclVuZGVmaW5lZCgpXG4gICAgICAgICAgICB8fCB0aGlzLmlzQ3VycmVudFN0ZXBTeW1ib2xVbmRlZmluZWQoKVxuICAgICAgICAgICAgfHwgdGhpcy5pc0ZpZWxkRnJvbUxvY2FsU3RvcnJhZ2VFbXB0eSgpXG4gICAgICAgICAgICB8fCB0aGlzLmlzZmllbGRTaXplRnJvbUxvY2FsU3RvcnJhZ2VVbmRlZmluZWQoKVxuICAgICAgICAgICAgfHwgdGhpcy5pc0NlbGxzRm9yV2luVW5kZWZpbmVkKCkpO1xuICAgIH1cbiAgICBpc0dhbWVWc0NvbXB1dGVyVW5kZWZpbmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lTG9jYWxTdG9yYWdlW3RoaXMuZmllbGROYW1lT2ZJc0dhbWVWc0NvbXB1dGVyXSA9PT0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpc0N1cnJlbnRTdGVwU3ltYm9sVW5kZWZpbmVkKCkge1xuICAgICAgICB0aGlzLmdhbWVMb2NhbFN0b3JhZ2VbdGhpcy5maWVsZE5hbWVPZkN1cnJlbnRTeW1ib2xdID09PSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlzRmllbGRGcm9tTG9jYWxTdG9ycmFnZUVtcHR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lTG9jYWxTdG9yYWdlW3RoaXMuZmllbGROYW1lT2ZHYW1lRmllbGRdID09PSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlzZmllbGRTaXplRnJvbUxvY2FsU3RvcnJhZ2VVbmRlZmluZWQoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5nYW1lTG9jYWxTdG9yYWdlW3RoaXMuZmllbGROYW1lT2ZHYW1lRmllbGRTaXplXSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICB8fCBpc05hTih0aGlzLmdhbWVMb2NhbFN0b3JhZ2VbdGhpcy5maWVsZE5hbWVPZkdhbWVGaWVsZFNpemVdKSk7XG4gICAgfVxuICAgIGlzQ2VsbHNGb3JXaW5VbmRlZmluZWQoKSB7XG4gICAgICAgIHRoaXMuZ2FtZUxvY2FsU3RvcmFnZVt0aGlzLmZpZWxkTmFtZU9mQ2VsbHNGb3JXaW5dID09PSB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgR2FtZUxvY2FsU3RvcmFnZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuY2xhc3MgR2FtZU1vZGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9pc0dhbWVWc0NvbXB1dGVyID0gZmFsc2U7XG4gICAgfVxuICAgIGdldCBpc0dhbWVWc0NvbXB1dGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNHYW1lVnNDb21wdXRlcjtcbiAgICB9XG4gICAgc2V0IGlzR2FtZVZzQ29tcHV0ZXIobmV3SXNHYW1lVnNDb21wdXRlclZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2lzR2FtZVZzQ29tcHV0ZXIgPSBuZXdJc0dhbWVWc0NvbXB1dGVyVmFsdWU7XG4gICAgfVxuICAgIGlzUGxheWVyVnNQbGF5ZXJHYW1lTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzR2FtZVZzQ29tcHV0ZXI7XG4gICAgfVxuICAgIGlzUGxheWVyVnNDb21wdXRlckdhbWVNb2RlKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX2lzR2FtZVZzQ29tcHV0ZXI7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgR2FtZU1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCB7IGZpcnN0U3RlcFN5bWJvbCwgc2Vjb25kU3RlcFN5bWJvbCB9IGZyb20gXCIuLi9jb25zdGFudHMvY29uc3RhbnRzXCI7XG5jbGFzcyBHYW1lU3ltYm9scyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0U3RlcFN5bWJvbCA9IGZpcnN0U3RlcFN5bWJvbDtcbiAgICAgICAgdGhpcy5fc2Vjb25kU3RlcFN5bWJvbCA9IHNlY29uZFN0ZXBTeW1ib2w7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGVwU3ltYm9sID0gdGhpcy5maXJzdFN0ZXBTeW1ib2w7XG4gICAgfVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGVwU3ltYm9sID0gdGhpcy5fZmlyc3RTdGVwU3ltYm9sO1xuICAgIH1cbiAgICBnZXQgZmlyc3RTdGVwU3ltYm9sKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3RTdGVwU3ltYm9sO1xuICAgIH1cbiAgICBnZXQgY3VycmVudFN0ZXBTeW1ib2woKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50U3RlcFN5bWJvbDtcbiAgICB9XG4gICAgc2V0IGN1cnJlbnRTdGVwU3ltYm9sKHN0ZXBTeW1ib2wpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFN0ZXBTeW1ib2wgPSBzdGVwU3ltYm9sO1xuICAgIH1cbiAgICB0b2dnbGVDdXJyZW50U3RlcFN5bWJvbCgpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFN0ZXBTeW1ib2wgPSB0aGlzLl9jdXJyZW50U3RlcFN5bWJvbCA9PT0gdGhpcy5fc2Vjb25kU3RlcFN5bWJvbFxuICAgICAgICAgICAgPyB0aGlzLl9maXJzdFN0ZXBTeW1ib2xcbiAgICAgICAgICAgIDogdGhpcy5fc2Vjb25kU3RlcFN5bWJvbDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBHYW1lU3ltYm9scztcbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgZmlyc3RTdGVwU3ltYm9sLCBmaXJzdFN0ZXBTeW1ib2xDbGFzc05hbWUsIHNlY29uZFN0ZXBTeW1ib2xDbGFzc05hbWUsIHNlY29uZFN0ZXBTeW1ib2wsIGZpZWxkUm93SWRBbmRDbGFzc05hbWUsIGZpZWxkUm93VGFnTmFtZSwgZmllbGRDZWxsVGFnTmFtZSwgY2VsbElkTmFtZSwgY2VsbENsYXNzTmFtZSwgZmllbGRJZE5hbWUsIGluaXRpYWxmaWVsZFNpemUsIGhlYWRpbmdNZXNzYWdlSWROYW1lIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9jb25zdGFudHNcIjtcbmltcG9ydCB7IG9uQ2VsbENsaWNrIH0gZnJvbSBcIi4uL2FwcFwiO1xuY2xhc3MgSHRtbENlbGxzRmllbGQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmZpcnN0U3RlcFN5bWJvbCA9IGZpcnN0U3RlcFN5bWJvbDtcbiAgICAgICAgdGhpcy5zZWNvbmRTdGVwU3ltYm9sID0gc2Vjb25kU3RlcFN5bWJvbDtcbiAgICAgICAgdGhpcy5maXJzdFN0ZXBTeW1ib2xDbGFzc05hbWUgPSBmaXJzdFN0ZXBTeW1ib2xDbGFzc05hbWU7XG4gICAgICAgIHRoaXMuc2Vjb25kU3RlcFN5bWJvbENsYXNzTmFtZSA9IHNlY29uZFN0ZXBTeW1ib2xDbGFzc05hbWU7XG4gICAgICAgIHRoaXMuY2VsbFRhZ05hbWUgPSBmaWVsZENlbGxUYWdOYW1lO1xuICAgICAgICB0aGlzLmNlbGxJZE5hbWUgPSBjZWxsSWROYW1lO1xuICAgICAgICB0aGlzLmNlbGxDbGFzc05hbWUgPSBjZWxsQ2xhc3NOYW1lO1xuICAgICAgICB0aGlzLnJvd0lkQW5kQ2xhc3NOYW1lID0gZmllbGRSb3dJZEFuZENsYXNzTmFtZTtcbiAgICAgICAgdGhpcy5yb3dUYWdOYW1lID0gZmllbGRSb3dUYWdOYW1lO1xuICAgICAgICB0aGlzLmZpZWxkSWROYW1lID0gZmllbGRJZE5hbWU7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVGaWVsZChpbml0aWFsZmllbGRTaXplKTtcbiAgICAgICAgdGhpcy5odG1sTWVzc2FnZUhlYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoZWFkaW5nTWVzc2FnZUlkTmFtZSk7XG4gICAgICAgIHRoaXMuYWxsSHRtbENlbGxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmNlbGxDbGFzc05hbWUpO1xuICAgIH1cbiAgICByZWZyZXNoSHRubENlbGxzKCkge1xuICAgICAgICBmb3IgKGxldCBjZWxsSW5kZXggPSAwOyBjZWxsSW5kZXggPCB0aGlzLmFsbEh0bWxDZWxscy5sZW5ndGg7IGNlbGxJbmRleCsrKSB7XG4gICAgICAgICAgICB0aGlzLmFsbEh0bWxDZWxsc1tjZWxsSW5kZXhdLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICB0aGlzLmFsbEh0bWxDZWxsc1tjZWxsSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5maXJzdFN0ZXBTeW1ib2xDbGFzc05hbWUpO1xuICAgICAgICAgICAgdGhpcy5hbGxIdG1sQ2VsbHNbY2VsbEluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2Vjb25kU3RlcFN5bWJvbENsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVmcmVzaEhlYWRpbmdNZXNzYWdlKCkge1xuICAgICAgICB0aGlzLmh0bWxNZXNzYWdlSGVhZGluZy5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB0aGlzLmh0bWxNZXNzYWdlSGVhZGluZy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZmlyc3RTdGVwU3ltYm9sQ2xhc3NOYW1lKTtcbiAgICAgICAgdGhpcy5odG1sTWVzc2FnZUhlYWRpbmcuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNlY29uZFN0ZXBTeW1ib2xDbGFzc05hbWUpO1xuICAgIH1cbiAgICBzZXRIZWFkaW5nSW5uZXJIdG1sKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5odG1sTWVzc2FnZUhlYWRpbmcuaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICAgICAgaWYgKG1lc3NhZ2Uuc2xpY2UoMCwgMSkgPT09IHRoaXMuZmlyc3RTdGVwU3ltYm9sKSB7XG4gICAgICAgICAgICB0aGlzLmh0bWxNZXNzYWdlSGVhZGluZy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2Vjb25kU3RlcFN5bWJvbENsYXNzTmFtZSk7XG4gICAgICAgICAgICB0aGlzLmh0bWxNZXNzYWdlSGVhZGluZy5jbGFzc0xpc3QuYWRkKHRoaXMuZmlyc3RTdGVwU3ltYm9sQ2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtZXNzYWdlLnNsaWNlKDAsIDEpID09PSB0aGlzLnNlY29uZFN0ZXBTeW1ib2wpIHtcbiAgICAgICAgICAgIHRoaXMuaHRtbE1lc3NhZ2VIZWFkaW5nLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5maXJzdFN0ZXBTeW1ib2xDbGFzc05hbWUpO1xuICAgICAgICAgICAgdGhpcy5odG1sTWVzc2FnZUhlYWRpbmcuY2xhc3NMaXN0LmFkZCh0aGlzLnNlY29uZFN0ZXBTeW1ib2xDbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldFN5bWJvbFRvU2VsY3RlZEh0bWxDZWxsKGN1cnJlbnRTdGVwU3ltYm9sLCBjZWxsSWQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNlbGwke2NlbGxJZH1gKTtcbiAgICAgICAgc2VsZWN0ZWRDZWxsLmlubmVySFRNTCA9IGN1cnJlbnRTdGVwU3ltYm9sO1xuICAgICAgICBpZiAoY3VycmVudFN0ZXBTeW1ib2wgPT09IHRoaXMuZmlyc3RTdGVwU3ltYm9sKSB7XG4gICAgICAgICAgICBzZWxlY3RlZENlbGwuY2xhc3NMaXN0LmFkZCh0aGlzLmZpcnN0U3RlcFN5bWJvbENsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXBTeW1ib2wgPT09IHRoaXMuc2Vjb25kU3RlcFN5bWJvbCkge1xuICAgICAgICAgICAgc2VsZWN0ZWRDZWxsLmNsYXNzTGlzdC5hZGQodGhpcy5zZWNvbmRTdGVwU3ltYm9sQ2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW5lcmF0ZUZpZWxkKGZpZWxkU2l6ZSkge1xuICAgICAgICBsZXQgY3VycmVudENlbGxJZCA9IDA7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5maWVsZElkTmFtZSk7XG4gICAgICAgIGZpZWxkLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCBmaWVsZFNpemU7IHJvd0luZGV4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ2VuZXJhdGVSb3coKTtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbkluZGV4ID0gMDsgY29sdW1uSW5kZXggPCBmaWVsZFNpemU7IGNvbHVtbkluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZW5lcmF0ZUNlbGwoY3VycmVudENlbGxJZCk7XG4gICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRDZWxsSWQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpZWxkLmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuZXJhdGVSb3coKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5yb3dUYWdOYW1lKTtcbiAgICAgICAgcm93LnNldEF0dHJpYnV0ZShcImlkXCIsIHRoaXMucm93SWRBbmRDbGFzc05hbWUpO1xuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCh0aGlzLnJvd0lkQW5kQ2xhc3NOYW1lKTtcbiAgICAgICAgcmV0dXJuIHJvdztcbiAgICB9XG4gICAgZ2VuZXJhdGVDZWxsKGNlbGxJZCkge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLmNlbGxUYWdOYW1lKTtcbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHt0aGlzLmNlbGxJZE5hbWV9JHtjZWxsSWR9YCk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCh0aGlzLmNlbGxDbGFzc05hbWUpO1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DZWxsQ2xpY2spO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBIdG1sQ2VsbHNGaWVsZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgaW5pdGlhbGZpZWxkU2l6ZSwgZmllbGRJZE5hbWUsIGZpZWxkU2l6ZVNlbGVjdElkTmFtZSwgZmllbGRDZWxsc1NpemVGb3JXaW5TZWxlY3RJZE5hbWUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2NvbnN0YW50c1wiO1xuaW1wb3J0IEdhbWVTeW1ib2xzIGZyb20gXCIuL2dhbWUtc3ltYm9scy1jbGFzc1wiO1xuaW1wb3J0IF9nYW1lTW9kZSBmcm9tIFwiLi9nYW1lLW1vZGUtY2xhc3NcIjtcbmltcG9ydCBHYW1lTG9jYWxTdG9yYWdlIGZyb20gXCIuL2dhbWUtbG9jYWwtc3RvcmFnZS1jbGFzc1wiO1xuaW1wb3J0IEh0bWxDZWxsc0ZpZWxkIGZyb20gXCIuL2h0bWwtZ2FtZS1maWVsZC1jbGFzc1wiO1xuaW1wb3J0IENlbGxzRmllbGQgZnJvbSBcIi4vZ2FtZS1maWVsZC1jbGFzc1wiO1xuaW1wb3J0IHsgb25QbGF5ZXJWc0NvbXB1dGVyQnV0dG9uQ2xpY2sgfSBmcm9tIFwiLi4vYXBwXCI7XG5jbGFzcyBUaWNUYWNUb2VHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5maWVsZE5hbWUgPSBmaWVsZElkTmFtZTtcbiAgICAgICAgdGhpcy5pc0dhbWVTdGFydHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nYW1lRmllbGQgPSBuZXcgQ2VsbHNGaWVsZChpbml0aWFsZmllbGRTaXplKTtcbiAgICAgICAgdGhpcy5odG1sR2FtZUZpZWxkID0gbmV3IEh0bWxDZWxsc0ZpZWxkKCk7XG4gICAgICAgIHRoaXMuZ2FtZVN5bWJvbHMgPSBuZXcgR2FtZVN5bWJvbHMoKTtcbiAgICAgICAgdGhpcy5fZ2FtZU1vZGUgPSBuZXcgX2dhbWVNb2RlKCk7XG4gICAgICAgIHRoaXMuZ2FtZVN0b3JhZ2UgPSBuZXcgR2FtZUxvY2FsU3RvcmFnZSgpO1xuICAgIH1cbiAgICByZWZyZXNoR2FtZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lRmllbGQucmVmcmVzaCgpO1xuICAgICAgICB0aGlzLmdhbWVTdG9yYWdlLnJlZnJlc2goKTtcbiAgICAgICAgdGhpcy5odG1sR2FtZUZpZWxkLnJlZnJlc2hIZWFkaW5nTWVzc2FnZSgpO1xuICAgICAgICB0aGlzLmh0bWxHYW1lRmllbGQucmVmcmVzaEh0bmxDZWxscygpO1xuICAgICAgICB0aGlzLmdhbWVTeW1ib2xzLnJlZnJlc2goKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzR2FtZVN0YXJ0cykge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVJc0dhbWVTdGFydHMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgZ2FtZU1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lTW9kZTtcbiAgICB9XG4gICAgZ2V0IGdhbWVTZW1ib2xzUmVmcmVzaCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZVN5bWJvbHMucmVmcmVzaDtcbiAgICB9XG4gICAgZ2V0R2FtZUVuZE1lc3NhZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVGaWVsZC5pc1dpbkNvbWJpbmF0aW9uKHRoaXMuZ2FtZVN5bWJvbHMuY3VycmVudFN0ZXBTeW1ib2wpKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUlzR2FtZVN0YXJ0cygpO1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2FtZVN5bWJvbHMuY3VycmVudFN0ZXBTeW1ib2x9IHdpbnNgO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmdhbWVGaWVsZC5pc0FsbENlbGxzVGFrZW4oKSkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVJc0dhbWVTdGFydHMoKTtcbiAgICAgICAgICAgIHJldHVybiBcIkRyYXdcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgc2V0R2FtZURhdGFGcm9tTG9jYWxTdG9ycmFnZSgpIHtcbiAgICAgICAgY29uc3QgZmllbGRGcm9tTG9jYWxTdG9yYWdlID0gdGhpcy5nYW1lU3RvcmFnZS5nZXRGaWVsZCgpO1xuICAgICAgICBjb25zdCBmaWVsZFNpemUgPSB0aGlzLmdhbWVTdG9yYWdlLmdldGZpZWxkU2l6ZSgpO1xuICAgICAgICBjb25zdCBjdXJyZW50U3RlcFN5bWJvbCA9IHRoaXMuZ2FtZVN0b3JhZ2UuZ2V0Q3VycmVudFN0ZXBTeW1ib2woKTtcbiAgICAgICAgY29uc3QgY3VycmVudGxlbmdodEZvcldpbiA9IHRoaXMuZ2FtZVN0b3JhZ2UuZ2V0Q2VsbHNRdWFudGl0eUZvcldpbigpO1xuICAgICAgICB0aGlzLmdhbWVGaWVsZC5nZW5lcmF0ZUZpZWxkKGZpZWxkU2l6ZSk7XG4gICAgICAgIHRoaXMuaHRtbEdhbWVGaWVsZC5nZW5lcmF0ZUZpZWxkKGZpZWxkU2l6ZSk7XG4gICAgICAgIHRoaXMuZ2FtZUZpZWxkLnNldExlbmdodEZvcldpbihjdXJyZW50bGVuZ2h0Rm9yV2luKTtcbiAgICAgICAgdGhpcy5zZXRfZ2FtZU1vZGVGcm9tTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMuc2V0U3ltYm9sc0Zyb21Mb2NhbFN0b3JhZ2VPbkZpZWxkcyhmaWVsZEZyb21Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICB0aGlzLnNldEdhbWVIZWFkaW5nTWVzc2FnZUZyb21Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5nYW1lU3ltYm9scy5jdXJyZW50U3RlcFN5bWJvbCA9IGN1cnJlbnRTdGVwU3ltYm9sO1xuICAgICAgICB0aGlzLnNldElucHV0VmFsdWVzRnJvbUxvY2FsU3RvcnJhZ2UoZmllbGRTaXplLnRvU3RyaW5nKCksIGN1cnJlbnRsZW5naHRGb3JXaW4udG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIHNldFN5bWJvbHNGcm9tTG9jYWxTdG9yYWdlT25GaWVsZHMoZmllbGRGcm9tTG9jYWxTdG9yYWdlKSB7XG4gICAgICAgIGZpZWxkRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChjdXJyZW50Q2VsbCwgY2VsbEluZGV4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdhbWVGaWVsZC5zZXRTeW1ib2xUb1NlbGVjdGVkRmllbGRDZWxsKGN1cnJlbnRDZWxsLCBjZWxsSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5odG1sR2FtZUZpZWxkLnNldFN5bWJvbFRvU2VsY3RlZEh0bWxDZWxsKGN1cnJlbnRDZWxsLCBjZWxsSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0X2dhbWVNb2RlRnJvbUxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZVN0b3JhZ2UuZ2V0SXNHYW1lVnNDb21wdXRlcigpID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgb25QbGF5ZXJWc0NvbXB1dGVyQnV0dG9uQ2xpY2soZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldEdhbWVIZWFkaW5nTWVzc2FnZUZyb21Mb2NhbFN0b3JhZ2UoKSB7XG4gICAgICAgIGlmICgodGhpcy5nZXRHYW1lRW5kTWVzc2FnZSgpID09PSBcIlwiKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRIZWFkaW5nTWVzc2FnZSA9IHRoaXMuZ2V0R2FtZUVuZE1lc3NhZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuaHRtbEdhbWVGaWVsZC5zZXRIZWFkaW5nSW5uZXJIdG1sKGN1cnJlbnRIZWFkaW5nTWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUlzR2FtZVN0YXJ0cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldElucHV0VmFsdWVzRnJvbUxvY2FsU3RvcnJhZ2UoZmllbGRTaXplLCBjdXJyZW50bGVuZ2h0Rm9yV2luKSB7XG4gICAgICAgIGNvbnN0IGZpZWxkU2l6ZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZpZWxkU2l6ZVNlbGVjdElkTmFtZSk7XG4gICAgICAgIGNvbnN0IGZpZWxkQ2VsbHNTaXplRm9yV2luU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZmllbGRDZWxsc1NpemVGb3JXaW5TZWxlY3RJZE5hbWUpO1xuICAgICAgICBmaWVsZFNpemVTZWxlY3QudmFsdWUgPSBmaWVsZFNpemU7XG4gICAgICAgIGZpZWxkQ2VsbHNTaXplRm9yV2luU2VsZWN0LnZhbHVlID0gY3VycmVudGxlbmdodEZvcldpbjtcbiAgICB9XG4gICAgdG9nZ2xlSXNHYW1lU3RhcnRzKCkge1xuICAgICAgICB0aGlzLmlzR2FtZVN0YXJ0cyA9ICF0aGlzLmlzR2FtZVN0YXJ0cztcbiAgICB9XG4gICAgaXNQbGF5ZXJDYW5TdGVwVG9DaG9zZW5DZWxsKGNsaWNrZWRDZWxsSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZUZpZWxkLmlzQ2VsbEVtcHR5KGNsaWNrZWRDZWxsSWQpICYmIHRoaXMuaXNHYW1lU3RhcnRzO1xuICAgIH1cbiAgICBpc0NvbXB1dGVyQ2FuU3RlcCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9nYW1lTW9kZS5pc0dhbWVWc0NvbXB1dGVyXG4gICAgICAgICAgICAmJiAhdGhpcy5nYW1lRmllbGQuaXNBbGxDZWxsc1Rha2VuKClcbiAgICAgICAgICAgICYmIHRoaXMuaXNHYW1lU3RhcnRzKTtcbiAgICB9XG4gICAgbWFrZVN0ZXAoY2xpY2tlZENlbGxJZCkge1xuICAgICAgICBjb25zdCBjdXJyZW50U3RlcFN5bWJvbCA9IHRoaXMuZ2FtZVN5bWJvbHMuY3VycmVudFN0ZXBTeW1ib2w7XG4gICAgICAgIHRoaXMuZ2FtZUZpZWxkLnNldFN5bWJvbFRvU2VsZWN0ZWRGaWVsZENlbGwoY3VycmVudFN0ZXBTeW1ib2wsIGNsaWNrZWRDZWxsSWQpO1xuICAgICAgICB0aGlzLmh0bWxHYW1lRmllbGQuc2V0U3ltYm9sVG9TZWxjdGVkSHRtbENlbGwoY3VycmVudFN0ZXBTeW1ib2wsIGNsaWNrZWRDZWxsSWQpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdhbWVGaWVsZC5maWVsZCk7XG4gICAgICAgIHRoaXMuZ2FtZVN0b3JhZ2Uuc2V0R2FtZUZpZWxkVG9Mb2NhbFN0b3JyYWdlKHRoaXMuZ2FtZUZpZWxkLmZpZWxkLnRvU3RyaW5nKCkpO1xuICAgICAgICBjb25zdCBjdXJyZW50SGVhZGluZ01lc3NhZ2UgPSB0aGlzLmdldEdhbWVFbmRNZXNzYWdlKCk7XG4gICAgICAgIHRoaXMuaHRtbEdhbWVGaWVsZC5zZXRIZWFkaW5nSW5uZXJIdG1sKGN1cnJlbnRIZWFkaW5nTWVzc2FnZSk7XG4gICAgICAgIHRoaXMuZ2FtZVN5bWJvbHMudG9nZ2xlQ3VycmVudFN0ZXBTeW1ib2woKTtcbiAgICAgICAgdGhpcy5nYW1lU3RvcmFnZS5zZXRDdXJyZW50U3RlcFN5bWJvbCh0aGlzLmdhbWVTeW1ib2xzLmN1cnJlbnRTdGVwU3ltYm9sKTtcbiAgICB9XG4gICAgbWFrZUNvbXB1dGVyU3RlcCgpIHtcbiAgICAgICAgY29uc3QgY2VsbElkRm9yQ29tcHV0ZXJTdGVwID0gdGhpcy5nYW1lRmllbGQuZ2V0UmFuZG9tQ2VsbElkRm9yQ29tcHV0ZXJTdGVwKCk7XG4gICAgICAgIHRoaXMubWFrZVN0ZXAoY2VsbElkRm9yQ29tcHV0ZXJTdGVwKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBUaWNUYWNUb2VHYW1lO1xuIiwiZXhwb3J0IGNvbnN0IGZpcnN0U3RlcFN5bWJvbCA9IFwiWFwiO1xuZXhwb3J0IGNvbnN0IHNlY29uZFN0ZXBTeW1ib2wgPSBcIk9cIjtcbmV4cG9ydCBjb25zdCBmaXJzdFN0ZXBTeW1ib2xDbGFzc05hbWUgPSBcImNvbnRyb2xsLWJ1dHRvbnNfX2NvbnRyb2xsLWJ1dHRvbl9jb2xvci1ibHVlXCI7XG5leHBvcnQgY29uc3Qgc2Vjb25kU3RlcFN5bWJvbENsYXNzTmFtZSA9IFwiY29udHJvbGwtYnV0dG9uc19fY29udHJvbGwtYnV0dG9uX2NvbG9yLXJlZFwiO1xuZXhwb3J0IGNvbnN0IGZpZWxkSWROYW1lID0gXCJmaWVsZFwiO1xuZXhwb3J0IGNvbnN0IGZpZWxkUm93VGFnTmFtZSA9IFwiZGl2XCI7XG5leHBvcnQgY29uc3QgZmllbGRDZWxsVGFnTmFtZSA9IFwiZGl2XCI7XG5leHBvcnQgY29uc3QgZmllbGRDZWxsc0NsYXNzTmFtZSA9IFwiZmllbGRfX2NlbGxcIjtcbmV4cG9ydCBjb25zdCBmaWVsZENlbGxJZE5hbWUgPSBcImNlbGxcIjtcbmV4cG9ydCBjb25zdCBmaWVsZFJvd0lkQW5kQ2xhc3NOYW1lID0gXCJmaWVsZF9fcm93XCI7XG5leHBvcnQgY29uc3QgY2VsbENsYXNzTmFtZSA9IFwiZmllbGRfX2NlbGxcIjtcbmV4cG9ydCBjb25zdCBjZWxsSWROYW1lID0gXCJjZWxsXCI7XG5leHBvcnQgY29uc3QgZmllbGROYW1lT2ZDdXJyZW50R2FtZU1vZGUgPSBcImdhbWVNb2RlXCI7XG5leHBvcnQgY29uc3QgZmllbGROYW1lT2ZDZWxsc0ZvcldpbiA9IFwiZmllbGROYW1lT2ZDZWxsc0ZvcldpblwiO1xuZXhwb3J0IGNvbnN0IGZpZWxkTmFtZU9mR2FtZWZpZWxkU2l6ZSA9IFwiZmllbGRTaXplXCI7XG5leHBvcnQgY29uc3QgZmllbGROYW1lT2ZDdXJyZW50U3ltYm9sID0gXCJjdXJyZW50U3ltYm9sXCI7XG5leHBvcnQgY29uc3QgaW5pdGlhbENlbGxzRm9yV2luID0gMztcbmV4cG9ydCBjb25zdCBpbml0aWFsSXNHYW1lVnNDb21wdXRlciA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IGluaXRpYWxmaWVsZFNpemUgPSAzO1xuZXhwb3J0IGNvbnN0IGhlYWRpbmdNZXNzYWdlSWROYW1lID0gXCJtZXNzYWdlSGVhZGluZ1wiO1xuZXhwb3J0IGNvbnN0IHJlZnJlc2hCdXR0b25JZE5hbWUgPSBcInJlZnJlc2hCdXR0b25cIjtcbmV4cG9ydCBjb25zdCBwbGF5ZXJWc1BsYXllckJ1dHRvbklkTmFtZSA9IFwicGxheWVyVnNQbGF5ZXJCdXR0b25cIjtcbmV4cG9ydCBjb25zdCBwbGF5ZXJWc0NvbXB1dGVyQnV0dG9uSWROYW1lID0gXCJwbGF5ZXJWc0NvbXB1dGVyQnV0dG9uXCI7XG5leHBvcnQgY29uc3QgZmllbGRTaXplU2VsZWN0SWROYW1lID0gXCJmaWVsZFNpemVTZWxlY3RcIjtcbmV4cG9ydCBjb25zdCBmaWVsZENlbGxzU2l6ZUZvcldpblNlbGVjdElkTmFtZSA9IFwiZmllbGRDZWxsc1NpemVGb3JXaW5TZWxlY3RcIjtcbmV4cG9ydCBjb25zdCBnYW1lSW5pdGlhbGl6YXRpb25CdXR0b25JZE5hbWUgPSBcImdhbWVJbml0aWFsaXphdGlvbkJ1dHRvblwiO1xuZXhwb3J0IGNvbnN0IGhpbnRIZWFkaW5nSWROYW1lID0gXCJoaW50SGVhZGluZ1wiO1xuZXhwb3J0IGNvbnN0IGhpbnRIZWFkaW5nRGlzYWJsZUNsYXNzTmFtZSA9IFwiaGludC1jb250YWluZXJfX2hlYWRpbmdfZGlzYWJsZVwiO1xuZXhwb3J0IGNvbnN0IHJlZnJlc2hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChyZWZyZXNoQnV0dG9uSWROYW1lKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXJWc1BsYXllckJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllclZzUGxheWVyQnV0dG9uSWROYW1lKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXJWc0NvbXB1dGVyQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxheWVyVnNDb21wdXRlckJ1dHRvbklkTmFtZSk7XG5leHBvcnQgY29uc3QgZmllbGRTaXplU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZmllbGRTaXplU2VsZWN0SWROYW1lKTtcbmV4cG9ydCBjb25zdCBIdG1sR2FtZUluaXRpYWxpemF0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZ2FtZUluaXRpYWxpemF0aW9uQnV0dG9uSWROYW1lKTtcbmV4cG9ydCBjb25zdCBjZWxsRm9yV2luU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZmllbGRDZWxsc1NpemVGb3JXaW5TZWxlY3RJZE5hbWUpO1xuZXhwb3J0IGNvbnN0IGh0bWxIaW50SGVhZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhpbnRIZWFkaW5nSWROYW1lKTtcbmV4cG9ydCBjb25zdCBkaXNhYmxlQnV0dG9uQ2xhc3NOYW1lID0gXCJjb250cm9sbC1idXR0b25zX19jb250cm9sbC1idXR0b25fZGlzYWJsZWRcIjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9