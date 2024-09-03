import { Game } from "./module.js";
window.addEventListener("load", setup);
let g: Game;
function setup(){
    document.getElementById("beginner")!.addEventListener("click", restartGame, false);
    document.getElementById("intermediate")!.addEventListener("click", restartGame, false);
    document.getElementById("expert")!.addEventListener("click", restartGame, false);
    document.getElementById("button")!.addEventListener("click", restartGame, false);

    startGame();
}

function startGame(){
    Game.getGameInstance();
}

function restartGame(){
    Game.getGameInstance().restartGame();
}

//todo delete
function debug(){
    console.log(g.getBoard().getTileArray()[0][0].getTableCell());
}

