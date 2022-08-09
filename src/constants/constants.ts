export const firstStepSymbol = "X";
export const secondStepSymbol = "O";

export const firstStepSymbolClassName = "controll-buttons__controll-button_color-blue";
export const secondStepSymbolClassName = "controll-buttons__controll-button_color-red";

export const fieldIdName = "field";
export const fieldRowTagName = "div";
export const fieldCellTagName = "div";
export const fieldCellsClassName = "field__cell";
export const fieldCellIdName = "cell";
export const fieldRowIdAndClassName = "field__row";
export const cellClassName = "field__cell";
export const cellIdName = "cell";

export const fieldNameOfCurrentGameMode = "gameMode";
export const fieldNameOfCellsForWin = "fieldNameOfCellsForWin";
export const fieldNameOfGamefieldSize = "fieldSize";
export const fieldNameOfCurrentSymbol = "currentSymbol";

export const initialCellsForWin = 3;
export const initialIsGameVsComputer  = false;
export const initialfieldSize = 3;

export const headingMessageIdName = "messageHeading";

export const refreshButtonIdName = "refreshButton";
export const playerVsPlayerButtonIdName = "playerVsPlayerButton";
export const playerVsComputerButtonIdName = "playerVsComputerButton";
export const fieldSizeSelectIdName = "fieldSizeSelect";
export const fieldCellsSizeForWinSelectIdName = "fieldCellsSizeForWinSelect";
export const gameInitializationButtonIdName = "gameInitializationButton"; 
export const hintHeadingIdName = "hintHeading";
export const hintHeadingDisableClassName = "hint-container__heading_disable";

export const refreshButton = document.getElementById(refreshButtonIdName);
export const playerVsPlayerButton = document.getElementById(playerVsPlayerButtonIdName) as HTMLInputElement;
export const playerVsComputerButton = document.getElementById(playerVsComputerButtonIdName) as HTMLInputElement;
export const fieldSizeSelect = document.getElementById(fieldSizeSelectIdName);
export const HtmlGameInitializationButton = document.getElementById(gameInitializationButtonIdName);
export const cellForWinSelect = document.getElementById(fieldCellsSizeForWinSelectIdName);
export const htmlHintHeading = document.getElementById(hintHeadingIdName);

export const disableButtonClassName = "controll-buttons__controll-button_disabled";


