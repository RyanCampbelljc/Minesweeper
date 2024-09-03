import { Tile } from "./module.js";
export class GameBoard {
    m_table;
    m_tileArray;
    m_boardSize;
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
                row.push(new Tile(tableCell));
            }
            tileArray.push(row);
            this.m_table.appendChild(tr);
        }
        return tileArray;
    }
    getTileArray() {
        return this.m_tileArray;
    }
}
//# sourceMappingURL=gameBoard.js.map