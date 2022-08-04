"use strict"

import {
    firstStepSymbolClassName, 
    secondStepSymbolClassName,
    fieldRowIdAndClassName,
    fieldRowTagName,
    fieldCellTagName,
    cellIdName,
    cellClassName,
    fieldIdName,
    initialFieldSize,
    headingMessageIdName
} from "../constants/constants.js";
import { onCellClick } from "../app.js";

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

    constructor() {
        this.#firstStepSymbol = "X";
        this.#secondStepSymbol = "O";
        this.#firstStepSymbolClassName = firstStepSymbolClassName;
        this.#secondStepSymbolClassName = secondStepSymbolClassName;
        this.#_rowIdAndClassName = fieldRowIdAndClassName;
        this.#_rowTagName = fieldRowTagName;
        this.#_cellTagName = fieldCellTagName;
        this.#_cellIdName = cellIdName;
        this.#_cellClassName = cellClassName;
        this.#_fieldIdName = fieldIdName;
        this.#_field = this.generateField(initialFieldSize);
        this.#htmlMessageHeading = document.getElementById(headingMessageIdName);
        this.#allHtmlCells = document.getElementsByClassName(this.#_cellClassName);
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
        const selectedCell = document.getElementById(`cell${cellId}`);
        selectedCell.innerHTML = currentStepSymbol;

        if (currentStepSymbol === this.#firstStepSymbol) {
            selectedCell.classList.add(this.#firstStepSymbolClassName);
        } else if(currentStepSymbol === this.#secondStepSymbol) {
            selectedCell.classList.add(this.#secondStepSymbolClassName);
        }
    }

    generateField(fieldSize) {
        let currentCellId = 0;
        const field = document.getElementById(this.#_fieldIdName);
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
        const cell = document.createElement(this.#_cellTagName);

        cell.setAttribute("id", `${this.#_cellIdName}${cellId}`);
        cell.classList.add(this.#_cellClassName);
        cell.addEventListener('click', onCellClick);

        return cell;
    }

    generateRow() {
        const row = document.createElement(this.#_rowTagName);

        row.setAttribute("id", this.#_rowIdAndClassName);
        row.classList.add(this.#_rowIdAndClassName);

        return row;
    }
} 

export default HtmlCellsField;