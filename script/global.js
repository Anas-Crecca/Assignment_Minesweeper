const global = {};
//html references
global.start = document.getElementById("start");
global.game = document.getElementById("game");
global.grid = document.getElementById("grid");
global.goScreen = document.getElementById("lose");
global.winScreen = document.getElementById("win");
global.rules = document.getElementById("help");
global.scoreArea = document.getElementById("score");
global.time = document.getElementById("time");
//game variables
global.size = 0;
global.mines = 0;
global.score = 0;
//The Array (TM)
global.blocks10 = [];
//Timer variables
global.gameRunning = false;
global.timeAdd = 0;
global.curTime = 0;
global.prevTime = 0;
//boundary variables
global.firstRow10 = 0;
global.lastRow10 = 9;
global.firstCol10 = 0;
global.lastCol10 = 9;

global.gameOver = function(){
    //resets array, displays gameover-screen
    global.blocks10.length = 0;
    global.gameRunning= false;
    global.game.style.display = "none";
    global.goScreen.style.display = "block";
}
global.endGame = function(){
    //like probability in math: if all have to apply you can simply check if one doesn't
    let complete = true;
    for(let i = 0; i< global.blocks10.length; i ++){
        for(let j =0; j < global.blocks10[i].length; j++){
            if(!global.blocks10[i][j].mine){
                //if one non-mine isn't 'revealed' sets complete to false
                if(!global.blocks10[i][j].clicked){
                    complete = false;
                }
            }else{
                //if one mine isn't flagged sets complete to false
                if(!global.blocks10[i][j].flagged){
                    complete = false;
                }
            }
        }
    }
    // else game ends
    if(complete){
        global.gameRunning= false;
        global.blocks10.length = 0;
        global.game.style.display = "none";
        global.winScreen.style.display = "block";
    }
}

export { global }