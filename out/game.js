import { GameBoard } from "./module.js";
import CONSTANTS from "./module.js";
export class Game {
    m_gameBoard;
    m_difficulty;
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
    }
    getBoard() {
        return this.m_gameBoard;
    }
}
//# sourceMappingURL=game.js.map