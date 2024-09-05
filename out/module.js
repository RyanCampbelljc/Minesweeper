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
const NUM_BOMBS = [10, 28, 48];
const BOARD_SIZES = [9, 15, 20];
const CLICK_AUDIO_FILE = "assets/click.mp3";
const BOMB_FILE = "assets/explosion.mp3";
const MUTE_SYMBOL = "\u{1F507}";
const PLAY_SYMBOL = "\u{1F50A}";
const CONSTANTS = { DIFFICULTY, NUM_BOMBS, BOARD_SIZES, CLICK_AUDIO_FILE, BOMB_FILE, MUTE_SYMBOL, PLAY_SYMBOL };
export function playSound(file) {
    let audio = new Audio(file);
    audio.play();
}
export default CONSTANTS;
//# sourceMappingURL=module.js.map