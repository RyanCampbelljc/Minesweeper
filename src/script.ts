import { Game } from "./module.js";
window.addEventListener("load", setup);

function setup(){
    document.getElementById("beginner")!.addEventListener("click", restartGame, false);
    document.getElementById("intermediate")!.addEventListener("click", restartGame, false);
    document.getElementById("expert")!.addEventListener("click", restartGame, false);
    document.getElementById("button")!.addEventListener("click", restartGame, false);
    //prevents context menu from appearing when right clicking a tile
    document.getElementById("table")!.addEventListener("contextmenu", 
        function (e) {
      e.preventDefault();
    });

    startGame();
}

//todo make below a little simpler

function startGame(){
    Game.getGameInstance();
}

function restartGame(){
    Game.getGameInstance().restartGame();
}


