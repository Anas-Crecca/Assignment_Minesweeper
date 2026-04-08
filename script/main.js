import { global } from "./global.js";
import { block } from "./block.js";

let startGame = function (size, mines){
    console.log("button pressed");
    //starts timer + resets time
    global.gameRunning = true;
    global.curTime = 0;

    //change screen, empty grid
    global.start.style.display= "none";
    global.game.style.display= "flex";
    global.grid.innerHTML= "";
    global.blocks10.length = 0;
    //sets variables
    global.size = size;
    global.mines = mines;
    global.score = mines;
    //sets amount of markers
    global.scoreArea.innerHTML = global.score;
    //calcs boundaries 
    global.lastRow10 = size-1 ;
    global.lastCol10 = size - 1 ;
    
    //creates rows in the table and block objects wich create a corresponding cell
    for (let i = 0; i < size; i ++){
        let row = global.grid.insertRow(i);
        global.blocks10.push([]);
        for (let j = 0; j < size; j++){
            let cell = new block(i,j);
        }
    }
    console.log(global.blocks10);

    for (let k = 0; k < mines; k ++){
        //creates random coordinates within the array and makes these into mines
        let ran1 = Math.floor(Math.random()*size);
        let ran2 = Math.floor(Math.random()*size);
        global.blocks10[ran1][ran2].mine = true;
        //commented code for testing purposes
        //global.blocks10[ran1][ran2].cell.style.background = "red";
    }
}

//timer
function gameLoop(totalRunningTime) { 
    //calculates time passed
    global.timeAdd = Math.floor(totalRunningTime / 1000) - global.prevTime;
    global.prevTime = Math.floor(totalRunningTime / 1000);
    console.log(global.timeAdd);
    if (global.gameRunning == true){
        //adds time passed when game is running
        global.curTime += global.timeAdd;
        global.time.innerHTML = global.curTime;
    }
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

//three diffrent game starts
let startGame10 = function (event){
    startGame(10,10);
}
let startGame16 = function (event){
    startGame(16,30);
}
let startGame20 = function (event){
    startGame(20,60);
}
//back to main menu
let restart = function (event){
    global.game.style.display = "none";
    global.start.style.display = "block";
    global.winScreen.style.display = "none";
    global.goScreen.style.display = "none";
    global.rules.style.display = "none";
}
//resets game with same parameters
let reset = function (event){
    global.gameRunning = false;
    startGame(global.size,global.mines);
}
//opens rules
let help = function (event){
    global.rules.style.display = "block";
    global.start.style.display = "none";
}
//addEventListener hell
document.querySelector("#startBt").addEventListener("click", startGame10);
document.querySelector("#startBt2").addEventListener("click", startGame16);
document.querySelector("#startBt3").addEventListener("click", startGame20);
document.querySelector("#restart1").addEventListener("click", restart);
document.querySelector("#restart2").addEventListener("click", restart);
document.querySelector("#reset").addEventListener("click", reset);
document.querySelector("#helpBt").addEventListener("click", help);
document.querySelector("#back").addEventListener("click", restart);