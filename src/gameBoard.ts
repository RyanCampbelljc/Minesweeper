import { Tile } from "./module.js";
export class GameBoard{
    private m_table: HTMLTableElement;
    private m_tileArray: Tile[][];
    private m_boardSize: number;
    constructor(size: number){
        this.m_table = document.getElementById("table") as HTMLTableElement;
        //clears the table
        while(this.m_table.firstChild){
            this.m_table.removeChild(this.m_table.firstChild);
        }
        this.m_boardSize = size;
        this.m_tileArray = this.createTileArray();
    }

    //todo assign types here
    private createTileArray(): Tile[][]{
        let tileArray: Tile[][] = []; // todo what
        for(let i = 0; i < this.m_boardSize; ++i){
            let tr = document.createElement("tr");
            const row: Tile[] = [];
            for(let j = 0; j < this.m_boardSize; ++j){
                let tableCell: HTMLTableCellElement = document.createElement("td");
                tr.appendChild(tableCell);
                row.push(new Tile(tableCell));
            }
            tileArray.push(row);
            this.m_table.appendChild(tr);
        }
        return tileArray;
        
    }
    //todo remove was for debugging
    public getTileArray(){
        return this.m_tileArray;
    }
    // private printTileArray(){
    //     for(let i = 0; i < this.m_boardSize; ++i){
    //         for(let j = 0; j < this.m_boardSize; ++j){
    //             console.log(this.m_tileArray[i][j].getTableCell())
    //         }
    //     }
    // }
}