export { Tile } from "./tile.js";
export { GameBoard } from "./gameBoard.js";
export { Game } from "./game.js";
export var DIFFICULTY;
(function (DIFFICULTY) {
    DIFFICULTY[DIFFICULTY["BEGINNER"] = 0] = "BEGINNER";
    DIFFICULTY[DIFFICULTY["INTERMEDIATE"] = 1] = "INTERMEDIATE";
    DIFFICULTY[DIFFICULTY["EXPERT"] = 2] = "EXPERT";
})(DIFFICULTY || (DIFFICULTY = {}));
;
const NUM_BOMBS = [10, 40, 70];
const BOARD_SIZES = [9, 15, 20];
const CONSTANTS = { DIFFICULTY, NUM_BOMBS, BOARD_SIZES };
export default CONSTANTS;
//# sourceMappingURL=module.js.map