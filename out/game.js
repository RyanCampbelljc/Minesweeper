import { GameBoard } from "./module.js";
import CONSTANTS from "./module.js";
export class Game {
    m_gameBoard;
    m_difficulty;
    static m_GameInstance;
    m_gameOver = false;
    m_BombsMinusFlags;
    m_time = 0;
    m_timerID = 0;
    m_mute = false;
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
        this.m_BombsMinusFlags = CONSTANTS.NUM_BOMBS[this.m_difficulty];
        document.getElementById("flags").innerText = String(this.m_BombsMinusFlags);
        document.getElementById("volume").addEventListener("click", () => this.toggleAudio(), false);
        document.getElementById("volume").innerText = CONSTANTS.PLAY_SYMBOL;
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
        document.getElementById("time").innerText = "000";
        this.stopTimer();
        Game.m_GameInstance = new Game();
    }
    isMute() {
        return this.m_mute;
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
        this.stopTimer();
    }
    setGameWon() {
        this.m_gameOver = true;
        document.getElementById("gameStatus").innerText = "You Win!";
        this.stopTimer();
    }
    flagAdded() {
        --this.m_BombsMinusFlags;
        document.getElementById("flags").innerText = String(this.m_BombsMinusFlags);
    }
    flagRemoved() {
        ++this.m_BombsMinusFlags;
        document.getElementById("flags").innerText = String(this.m_BombsMinusFlags);
    }
    setTime(time) {
        if (time > 999)
            return;
        let txt = "";
        if (time >= 100)
            txt = String(time);
        else if (time >= 10)
            txt = "0" + String(time);
        else
            txt = "00" + String(time);
        document.getElementById("time").innerText = txt;
    }
    startTimer() {
        this.m_timerID = window.setInterval(() => this.setTime(++this.m_time), 1000);
    }
    stopTimer() {
        window.clearInterval(this.m_timerID);
    }
    toggleAudio() {
        let volume = document.getElementById("volume");
        const muteSymbol = '\u{1F507}';
        const playSymbol = '\u{1F50A}';
        if (!this.m_mute) {
            volume.innerText = CONSTANTS.MUTE_SYMBOL;
            this.m_mute = true;
        }
        else {
            volume.innerText = CONSTANTS.PLAY_SYMBOL;
            this.m_mute = false;
        }
    }
}
//# sourceMappingURL=game.js.map