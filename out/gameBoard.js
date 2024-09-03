import { Tile } from "./module.js";
import CONSTANTS from "./module.js";
import { Game } from "./module.js";
export class GameBoard {
    m_table;
    m_tileArray;
    m_boardSize;
    m_noTilesRevealed = true;
    constructor(size) {
        this.m_table = document.getElementById("table");
        while (this.m_table.firstChild) {
            this.m_table.removeChild(this.m_table.firstChild);
        }
        this.m_boardSize = size;
        this.m_tileArray = this.createTileArray();
    }
    createTileArray() {
        let tileArray = [];
        for (let i = 0; i < this.m_boardSize; ++i) {
            let tr = document.createElement("tr");
            const row = [];
            for (let j = 0; j < this.m_boardSize; ++j) {
                let tableCell = document.createElement("td");
                tr.appendChild(tableCell);
                row.push(new Tile(tableCell, i, j));
            }
            tileArray.push(row);
            this.m_table.appendChild(tr);
        }
        return tileArray;
    }
    getTileArray() {
        return this.m_tileArray;
    }
    placeBombs() {
        let row, col;
        let bombsToBePlaced = CONSTANTS.NUM_BOMBS[Game.getGameInstance().getDifficulty()];
        while (bombsToBePlaced > 0) {
            row = Math.floor(Math.random() * this.m_boardSize);
            col = Math.floor(Math.random() * this.m_boardSize);
            if (this.m_tileArray[row][col].isBomb() || (this.m_tileArray[row][col].isRevealed()))
                continue;
            this.m_tileArray[row][col].setBomb();
            --bombsToBePlaced;
        }
    }
    setNumAdjacentBombs() {
        for (let i = 0; i < this.m_boardSize; ++i) {
            for (let j = 0; j < this.m_boardSize; ++j) {
                if (this.m_tileArray[i][j].isBomb())
                    continue;
                let numBombs = 0;
                if (this.isBomb(i - 1, j))
                    ++numBombs;
                if (this.isBomb(i - 1, j + 1))
                    ++numBombs;
                if (this.isBomb(i, j + 1))
                    ++numBombs;
                if (this.isBomb(i + 1, j + 1))
                    ++numBombs;
                if (this.isBomb(i + 1, j))
                    ++numBombs;
                if (this.isBomb(i + 1, j - 1))
                    ++numBombs;
                if (this.isBomb(i, j - 1))
                    ++numBombs;
                if (this.isBomb(i - 1, j - 1))
                    ++numBombs;
                this.m_tileArray[i][j].setNumAdjacentBombs(numBombs);
            }
        }
    }
    isBomb(row, col) {
        return this.inBounds(row, col) && this.m_tileArray[row][col].isBomb();
    }
    inBounds(row, col) {
        if (row >= this.m_boardSize || row < 0 || col >= this.m_boardSize || col < 0)
            return false;
        return true;
    }
    tileRevealed(row, col) {
        if (this.m_noTilesRevealed) {
            this.m_noTilesRevealed = false;
            this.placeBombs();
            this.setNumAdjacentBombs();
        }
        if (this.m_tileArray[row][col].isBomb())
            this.setGameOver();
    }
    setGameOver() {
        this.revealBombs();
        Game.getGameInstance().setGameOver();
    }
    revealBombs() {
        for (let i = 0; i < this.m_boardSize; ++i) {
            for (let j = 0; j < this.m_boardSize; ++j) {
                if (this.m_tileArray[i][j].isBomb()) {
                    this.m_tileArray[i][j].getTableCell().style.backgroundImage = "url(assets/bomb.png)";
                    this.m_tileArray[i][j].getTableCell().style.backgroundSize = "contain";
                }
            }
        }
    }
}
//# sourceMappingURL=gameBoard.js.map