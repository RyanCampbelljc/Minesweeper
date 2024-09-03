import { GameBoard } from "./module.js";
import CONSTANTS from "./module.js";
export class Game {
    m_gameBoard;
    m_difficulty;
    static m_GameInstance;
    m_gameOver = false;
    constructor() {
        let beg = document.getElementById("beginner");
        let interm = document.getElementById("intermediate");
        if (beg.checked) {
            this.m_difficulty = CONSTANTS.DIFFICULTY.BEGINNER;
        }
        else if (interm.checked) {
            this.m_difficulty = CONSTANTS.DIFFICULTY.INTERMEDIATE;
        }
        else {
            this.m_difficulty = CONSTANTS.DIFFICULTY.EXPERT;
        }
        this.m_gameBoard = new GameBoard(CONSTANTS.BOARD_SIZES[this.m_difficulty]);
        let txt = String(CONSTANTS.BOARD_SIZES[this.m_difficulty] + 'x' + CONSTANTS.BOARD_SIZES[this.m_difficulty]);
        document.getElementById("boardSize").innerText = txt;
    }
    static getGameInstance() {
        if (Game.m_GameInstance) {
            return Game.m_GameInstance;
        }
        Game.m_GameInstance = new Game();
        return Game.m_GameInstance;
    }
    restartGame() {
        document.getElementById("gameStatus").innerText = "";
        Game.m_GameInstance = new Game();
    }
    isGameOver() {
        return this.m_gameOver;
    }
    getDifficulty() {
        return this.m_difficulty;
    }
    tileRevealed(row, col) {
        this.m_gameBoard.tileRevealed(row, col);
    }
    setGameOver() {
        this.m_gameOver = true;
        document.getElementById("gameStatus").innerText = "Game Over!";
    }
    setGameWon() {
        this.m_gameOver = true;
        document.getElementById("gameStatus").innerText = "You Win!";
    }
}
//# sourceMappingURL=game.js.map