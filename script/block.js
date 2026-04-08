import { global } from "./global.js";
import { input } from "./input.js";
class block {
    rowIndex = 0;
    columnIndex = 0;
    mine = false;
    flagged = false;
    clicked = false;
    cell = null;

    clickReact = function () {
        //checks whether clicked or flagged
        if (!this.clicked && !this.flagged) {
            this.clicked = true;
            this.cell.style.backgroundImage = 'url("Assignment_Minesweeper/images/dirt.png")';
            //checks whether mine or not
            if (this.mine) {
                global.gameOver();
            } else {
                console.log("Click!");
                //counter for mines
                let count = 0;
                //adds +1 for ever mine in a 1 block radius
                for (let i = this.rowIndex - 1; i <= this.rowIndex + 1; i++) {
                    for (let j = this.columnIndex - 1; j <= this.columnIndex + 1; j++) {
                        //ensures it only checks within the bounds of the array
                        if (i >= global.firstRow10 && i <= global.lastRow10 && j >= global.firstCol10 && j <= global.lastCol10) {
                            if (global.blocks10[i][j].mine) {
                                count += 1;
                            }
                        }
                    }
                }
                console.log(count);
                this.cell.innerHTML = count;
                //recursively activates function when no mines around
                if (count == 0) {
                    for (let i = this.rowIndex - 1; i <= this.rowIndex + 1; i++) {
                        for (let j = this.columnIndex - 1; j <= this.columnIndex + 1; j++) {
                            if (i >= global.firstRow10 && i <= global.lastRow10 && j >= global.firstCol10 && j <= global.lastCol10) {
                                if (!global.blocks10[i][j].clicked) {
                                    global.blocks10[i][j].clickReact();
                                }
                            }
                        }
                    }
                }
                //checks whether all none mines are revealed, ends game if conditions met
                global.endGame();
            }
        }
    }
    rClickReact = function () {
        //checks whether already flagged
        if (!this.clicked) {
            if (!this.flagged) {
                //flags block
                this.flagged = true;
                this.cell.style.backgroundImage = 'url("Assignment_Minesweeper/images/marker.png")';

                global.score -= 1;
                global.scoreArea.innerHTML = global.score;
            }
            else {
                //unflags block
                this.flagged = false;
                //commented code for testing purposes
                /*if (this.mine) {
                    this.cell.style.background = "red";
                } else {
                    this.cell.style.background = "aqua";
                }*/
                    this.cell.style.backgroundImage = 'url("Assignment_Minesweeper/images/grass.png")';

                global.score += 1;
                global.scoreArea.innerHTML = global.score;
            }
            global.endGame();
        }
    }
    constructor(row, column) {
        this.rowIndex = row;
        this.columnIndex = column;
        //creating corresponding cell
        global.grid.rows[row].insertCell(column);
        this.cell = global.grid.rows[row].cells[column];
        this.cell.addEventListener("click", input.click);
        this.cell.addEventListener("contextmenu", input.rClick);
        global.blocks10[row].push(this);
    }
} export { block }
