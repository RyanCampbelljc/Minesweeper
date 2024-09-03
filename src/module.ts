export { Tile } from "./tile.js"
export { GameBoard } from "./gameBoard.js"
export { Game } from "./game.js"

//difficulty is stored as a member in Game class and can be used to index the arrays below it.
export enum DIFFICULTY {BEGINNER, INTERMEDIATE, EXPERT};
const NUM_BOMBS: number[] = [10,28,48];
const BOARD_SIZES: number[] = [9,15,20];
const CONSTANTS = {DIFFICULTY,NUM_BOMBS,BOARD_SIZES}
export default CONSTANTS;