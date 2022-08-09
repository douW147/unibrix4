"use strict"

import {
    firstStepSymbol,
    firstStepSymbolClassName, 
    secondStepSymbolClassName,
    secondStepSymbol,
    fieldRowIdAndClassName,
    fieldRowTagName,
    fieldCellTagName,
    cellIdName,
    cellClassName,
    fieldIdName,
    initialfieldSize,
    headingMessageIdName
} from "../constants/constants.js";
import { onCellClick } from "../app.js";

class HtmlCellsField {
    private firstStepSymbol: string;
    private firstStepSymbolClassName: string;
    private secondStepSymbol: string;
    private secondStepSymbolClassName: string;
    private fieldIdName: string;
    private rowIdAndClassName: string;
    private rowTagName: string;
    private cellTagName: string;
    private cellIdName: string;
    private cellClassName: string;
    private htmlMessageHeading: HTMLElement;
    private allHtmlCells: HTMLCollection;

    constructor() {
        this.firstStepSymbol = firstStepSymbol;
        this.secondStepSymbol = secondStepSymbol;
        this.firstStepSymbolClassName = firstStepSymbolClassName;
        this.secondStepSymbolClassName = secondStepSymbolClassName;

        this.cellTagName = fieldCellTagName;
        this.cellIdName = cellIdName;
        this.cellClassName = cellClassName;
        this.rowIdAndClassName = fieldRowIdAndClassName;
        this.rowTagName = fieldRowTagName;
        this.fieldIdName = fieldIdName;

        this.generateField(initialfieldSize);

        this.htmlMessageHeading = document.getElementById(headingMessageIdName);
        this.allHtmlCells = document.getElementsByClassName(this.cellClassName) as HTMLCollectionOf<HTMLElement>;
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
            
        } else if (message.slice(0, 1) === this.secondStepSymbol) {
            this.htmlMessageHeading.classList.remove(this.firstStepSymbolClassName);
            this.htmlMessageHeading.classList.add(this.secondStepSymbolClassName);
        }
    }

    setSymbolToSelctedHtmlCell(currentStepSymbol, cellId) {
        const selectedCell = document.getElementById(`cell${cellId}`);
        selectedCell.innerHTML = currentStepSymbol;

        if (currentStepSymbol === this.firstStepSymbol) {
            selectedCell.classList.add(this.firstStepSymbolClassName);
        } else if(currentStepSymbol === this.secondStepSymbol) {
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
        cell.addEventListener('click', onCellClick);

        return cell;
    }
} 

export default HtmlCellsField;