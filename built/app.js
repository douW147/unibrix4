"use strict";
import GameInitializationButton from "./classes/game-initialization-button-class";
import TicTacToeGame from "./classes/tic-tac-toe-class";
import { fieldCellIdName, disableButtonClassName, hintHeadingDisableClassName, refreshButton, playerVsPlayerButton, playerVsComputerButton, fieldSizeSelect, cellForWinSelect, HtmlGameInitializationButton, htmlHintHeading } from "./constants/constants";
const ticTacToeGame = new TicTacToeGame();
const gameInitializationButton = new GameInitializationButton();
HtmlGameInitializationButton.addEventListener("click", onGameInitializationButtonClick);
refreshButton.addEventListener("click", onRefreshClick);
playerVsPlayerButton.addEventListener("click", () => {
    onPlayerVsPlayerButtonClick();
});
playerVsComputerButton.addEventListener("click", () => {
    onPlayerVsComputerButtonClick();
});
fieldSizeSelect.onchange = onFieldSizeSelectChange;
cellForWinSelect.onchange = onCellSizeForWinChange;
export function onCellClick(event) {
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
    if (!ticTacToeGame.gameStorage.isOneOfFieldUndefined()) {
        ticTacToeGame.setGameDataFromLocalStorrage();
    }
    else {
        ticTacToeGame.gameStorage.setDefaultData();
    }
    ;
    htmlHintHeading.classList.add(hintHeadingDisableClassName);
    event.target.classList.add(disableButtonClassName);
    refreshButton.classList.remove(disableButtonClassName);
}
function onRefreshClick() {
    if (!gameInitializationButton.isClicked) {
        ticTacToeGame.refreshGame();
    }
}
export function onPlayerVsPlayerButtonClick(refreshFields = true) {
    if (!ticTacToeGame.gameMode.isPlayerVsPlayerGameMode() || gameInitializationButton.isClicked) {
        return;
    }
    if (refreshFields) {
        ticTacToeGame.refreshGame();
    }
    ticTacToeGame.gameMode.isGameVsComputer = false;
    ticTacToeGame.gameStorage.setIsGameVsComputer(false);
    playerVsPlayerButton.classList.remove(disableButtonClassName);
    playerVsComputerButton.classList.add(disableButtonClassName);
}
export function onPlayerVsComputerButtonClick(refreshFields = true) {
    if (!ticTacToeGame.gameMode.isPlayerVsComputerGameMode() || gameInitializationButton.isClicked) {
        return;
    }
    if (refreshFields) {
        ticTacToeGame.refreshGame();
    }
    ticTacToeGame.gameMode.isGameVsComputer = true;
    ticTacToeGame.gameStorage.setIsGameVsComputer(true);
    playerVsComputerButton.classList.remove(disableButtonClassName);
    playerVsPlayerButton.classList.add(disableButtonClassName);
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
    ticTacToeGame.gameStorage.setGameFieldToLocalStorrage(ticTacToeGame.gameField.field);
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
    const separatorIndex = fieldCellIdName.length;
    const clickedCellId = cellId.slice(separatorIndex);
    return clickedCellId;
}
