export class Tile {
    BLOCK_COLOR = "#808080";
    BLOCK_CLICK_COLOR = "#666";
    BLOCK_HOVER_COLOR = "#ccc";
    BLOCK_REVEALED_COLOR = "#fff";
    m_isBomb = false;
    m_isRevealed = false;
    m_numAdjacentBombs = 0;
    m_tableCell;
    constructor(tableCell) {
        this.m_tableCell = tableCell;
        this.addListeners(this.m_tableCell);
    }
    setNumAdjacentBombs(numBombs) {
        this.m_numAdjacentBombs = numBombs;
    }
    getTableCell() {
        return this.m_tableCell;
    }
    updateTile() {
        if (this.m_isRevealed)
            return;
        this.m_isRevealed = true;
        this.m_tableCell.style.backgroundColor = this.BLOCK_REVEALED_COLOR;
    }
    addListeners(cell) {
        cell.addEventListener("mouseup", () => this.updateTile(), false);
    }
}
//# sourceMappingURL=tile.js.map