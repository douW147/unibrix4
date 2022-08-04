"use strict";

import TicTacToeGame from "./classes/ticTacToeClass.js";
import GameInitializationButton from "./classes/gameInitializationButtonClass";

const ticTacToeGame = new TicTacToeGame();
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
    if (!ticTacToeGame.gameStorage.isFieldFromLocalStorrageEmpty()
        && !ticTacToeGame.gameStorage.isFieldSizeFromLocalStorrageUndefined()) {
        ticTacToeGame.setFieldFromLocalStorrage();
    };

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
