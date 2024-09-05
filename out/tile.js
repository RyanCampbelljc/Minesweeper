import { Game } from "./module.js";
import CONSTANTS from "./module.js";
import { playSound } from "./module.js";
export class Tile {
    BLOCK_COLOR = "#808080";
    BLOCK_HOVER_COLOR = "#ccc";
    BLOCK_REVEALED_COLOR = "#fff";
    colorArray = [
        "",
        "blue",
        "green",
        "red",
        "purple",
        "darkred",
        "teal",
        "black",
        "grey",
    ];
    m_isBomb = false;
    m_isRevealed = false;
    m_numAdjacentBombs = 0;
    m_tableCell;
    m_isFlagged = false;
    m_position;
    constructor(tableCell, row, col) {
        this.m_tableCell = tableCell;
        this.addListeners(this.m_tableCell);
        this.m_position = [row, col];
    }
    setNumAdjacentBombs(numBombs) {
        this.m_numAdjacentBombs = numBombs;
    }
    getNumAdjacentBombs() {
        return this.m_numAdjacentBombs;
    }
    isRevealed() {
        return this.m_isRevealed;
    }
    isBomb() {
        return this.m_isBomb;
    }
    setBomb() {
        this.m_isBomb = true;
    }
    getTableCell() {
        return this.m_tableCell;
    }
    updateTile() {
        if (this.m_isRevealed || Game.getGameInstance().isGameOver())
            return;
        this.m_isRevealed = true;
        this.m_tableCell.style.backgroundColor = this.BLOCK_REVEALED_COLOR;
        this.m_isFlagged = false;
        Game.getGameInstance().tileRevealed(this.m_position[0], this.m_position[1]);
        if (!this.m_isBomb) {
            this.m_tableCell.style.backgroundImage = "";
            if (this.m_numAdjacentBombs > 0) {
                this.m_tableCell.innerText = String(this.m_numAdjacentBombs);
                this.m_tableCell.style.color = this.colorArray[this.m_numAdjacentBombs];
                this.m_tableCell.style.fontWeight = "bold";
                this.m_tableCell.style.fontSize = "18px";
            }
        }
    }
    flagTile() {
        console.log("flag");
        if (this.m_isRevealed || Game.getGameInstance().isGameOver())
            return;
        if (this.m_isFlagged) {
            this.m_tableCell.style.backgroundImage = "";
            this.m_isFlagged = false;
            Game.getGameInstance().flagRemoved();
        }
        else {
            this.m_tableCell.style.backgroundImage = "url(assets/flag.ico)";
            this.m_isFlagged = true;
            this.m_tableCell.style.backgroundSize = "contain";
            Game.getGameInstance().flagAdded();
        }
    }
    mouseOver() {
        if (this.m_isRevealed || Game.getGameInstance().isGameOver())
            return;
        this.m_tableCell.style.backgroundColor = this.BLOCK_HOVER_COLOR;
    }
    mouseOut() {
        if (this.m_isRevealed || Game.getGameInstance().isGameOver())
            return;
        this.m_tableCell.style.backgroundColor = this.BLOCK_COLOR;
    }
    addListeners(cell) {
        cell.addEventListener("click", () => {
            if (!Game.getGameInstance().isGameOver() && !this.m_isRevealed && !this.m_isBomb && !Game.getGameInstance().isMute())
                playSound(CONSTANTS.CLICK_AUDIO_FILE);
            else if (!Game.getGameInstance().isGameOver() && !this.m_isRevealed && this.m_isBomb && !Game.getGameInstance().isMute())
                playSound(CONSTANTS.BOMB_FILE);
            this.updateTile();
        }, false);
        cell.addEventListener("contextmenu", () => this.flagTile(), false);
        cell.addEventListener("mouseover", () => this.mouseOver(), false);
        cell.addEventListener("mouseout", () => this.mouseOut(), false);
    }
}
//# sourceMappingURL=tile.js.map