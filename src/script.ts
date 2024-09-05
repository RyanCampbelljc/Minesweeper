import { Game } from "./module.js";
window.addEventListener("load", setup);

function setup(){
    document.getElementById("resetButton")!.addEventListener("click", restartGame, false);
    //prevents context menu from appearing when right clicking a tile
    document.getElementById("table")!.addEventListener("contextmenu", 
        function (e) {
      e.preventDefault();
    });

    document.getElementById("dropDown")!.addEventListener("change", restartGame, false);

    startGame();
}

function startGame(){
    Game.getGameInstance();
}

function restartGame(){
    Game.getGameInstance().restartGame();
}


