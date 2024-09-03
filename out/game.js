import { GameBoard } from "./module.js";
import CONSTANTS from "./module.js";
export class Game {
    m_gameBoard;
    m_difficulty;
    static m_GameInstance;
    m_gameOver = false;
    constructor() {
        let dropDown = document.getElementById("dropDown");
        if (dropDown.value === "beginner") {
            this.m_difficulty = CONSTANTS.DIFFICULTY.BEGINNER;
        }
        else if (dropDown.value === "intermediate") {
            this.m_difficulty = CONSTANTS.DIFFICULTY.INTERMEDIATE;
        }
        else {
            this.m_difficulty = CONSTANTS.DIFFICULTY.EXPERT;
        }
        this.m_gameBoard = new GameBoard(CONSTANTS.BOARD_SIZES[this.m_difficulty]);
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