export { Tile } from "./tile.js"
export { GameBoard } from "./gameBoard.js"
export { Game } from "./game.js"

//difficulty is stored as a member in Game class and can be used to index the arrays below it.
export enum DIFFICULTY {BEGINNER, INTERMEDIATE, EXPERT};
const NUM_BOMBS: number[] = [10,28,48];
const BOARD_SIZES: number[] = [9,15,20];
const CLICK_AUDIO_FILE: string = "assets/click.mp3";
const BOMB_FILE: string = "assets/explosion.mp3";
const MUTE_SYMBOL: string = "\u{1F507}";
const PLAY_SYMBOL: string = "\u{1F50A}";
const CONSTANTS = {DIFFICULTY, NUM_BOMBS, BOARD_SIZES, CLICK_AUDIO_FILE, BOMB_FILE, MUTE_SYMBOL, PLAY_SYMBOL}
export function playSound(file: string){
    let audio = new Audio(file);
    audio.play();
}
export default CONSTANTS;
