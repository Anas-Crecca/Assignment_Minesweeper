import { global } from "./global.js";

const input = {};

input.click = function(event){
    //plays audio que
    let crunch = new Audio("Assignment_Minesweeper/images/cronch.mp4");
            crunch.play();
    global.blocks10[this.parentNode.rowIndex][this.cellIndex].clickReact();
    
}
input.rClick = function(event){
    //plays audio que
    let mark = new Audio("Assignment_Minesweeper/images/hitwood.mp4");
    mark.play();
    global.blocks10[this.parentNode.rowIndex][this.cellIndex].rClickReact();
    //console.log(global.blocks10[this.parentNode.rowIndex][this.cellIndex]);
}
export {input}
