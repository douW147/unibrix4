"use strict";

import GameInitializationButton from "./classes/gameInitializationButtonClass.js";
import TicTacToeGame from "./classes/ticTacToeClass.js";

const fieldCellIdName = "cell";
const disableButtonClassName = "controll-buttons__controll-button_disabled";

const refreshButton = document.getElementById("refreshButton");
const playerVsPlayerButton = document.getElementById("playerVsPlayerButton");
const playerVsComputerButton = document.getElementById("playerVsComputerButton");
const fieldSizeSelect = document.getElementById("fieldSizeSelect");
const HtmlGameInitializationButton = document.getElementById("gameInitializationButton")

const ticTacToeGame = new TicTacToeGame();
const gameInitializationButton = new GameInitializationButton(true);

HtmlGameInitializationButton.addEventListener("click", onGameInitializationButtonClick);
refreshButton.addEventListener("click", onRefreshClick);
playerVsPlayerButton.addEventListener("click", onPlayerVsPlayerButtonClick);
playerVsComputerButton.addEventListener("click", onPlayerVsComputerButtonClick);
fieldSizeSelect.onchange = onFieldSizeSelectChange;

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
    } else {
        ticTacToeGame.gameStorage.isGameVsComputer(false)
    };

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
        return    
    }

    if (! gameInitializationButton.isClicked) {
        ticTacToeGame.refreshGame();
    }
    
    ticTacToeGame.gameStorage.setFieldSize(newFieldSize);
    ticTacToeGame.gameField.generateField(newFieldSize);
    ticTacToeGame.gameStorage.setGameFieldToLocalStorrage(ticTacToeGame.gameField.field);
    ticTacToeGame.htmlGameField.generateField(newFieldSize);  
}

function getCellIdFromIdName(cellId) {
    const separatorIndex = fieldCellIdName.length;
    const clickedCellId = cellId.slice(separatorIndex);
    return clickedCellId;
}
