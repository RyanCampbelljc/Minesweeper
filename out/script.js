import { Game } from "./module.js";
window.addEventListener("load", setup);
function setup() {
    document.getElementById("button").addEventListener("click", restartGame, false);
    document.getElementById("table").addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });
    startGame();
}
function startGame() {
    Game.getGameInstance();
}
function restartGame() {
    Game.getGameInstance().restartGame();
}
//# sourceMappingURL=script.js.map