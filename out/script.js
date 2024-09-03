import { Game } from "./module.js";
window.addEventListener("load", setup);
let g;
function setup() {
    document.getElementById("beginner").addEventListener("click", restartGame, false);
    document.getElementById("intermediate").addEventListener("click", restartGame, false);
    document.getElementById("expert").addEventListener("click", restartGame, false);
    document.getElementById("button").addEventListener("click", restartGame, false);
    startGame();
}
function startGame() {
    Game.getGameInstance();
}
function restartGame() {
    Game.getGameInstance().restartGame();
}
function debug() {
    console.log(g.getBoard().getTileArray()[0][0].getTableCell());
}
//# sourceMappingURL=script.js.map