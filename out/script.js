import { Game } from "./module.js";
window.addEventListener("load", setup);
let g;
function setup() {
    document.getElementById("beginner").addEventListener("click", startGame, false);
    document.getElementById("intermediate").addEventListener("click", startGame, false);
    document.getElementById("expert").addEventListener("click", startGame, false);
    document.getElementById("reset").addEventListener("click", debug, false);
    startGame();
}
function startGame() {
    g = new Game();
}
function debug() {
    console.log(g.getBoard().getTileArray()[0][0].getTableCell());
}
//# sourceMappingURL=script.js.map