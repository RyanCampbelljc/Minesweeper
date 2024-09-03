import { Tile } from "./module.js";
import CONSTANTS from "./module.js";
import { Game } from "./module.js";
export class GameBoard{
    private m_table: HTMLTableElement;
    private m_tileArray: Tile[][];
    private m_boardSize: number;
    private m_noTilesRevealed: Boolean = true;// place bombs after the first tile is clicked
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
                row.push(new Tile(tableCell, i, j));
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

    private placeBombs(){
        let row, col:number;
        let bombsToBePlaced = CONSTANTS.NUM_BOMBS[Game.getGameInstance().getDifficulty()];
        while(bombsToBePlaced > 0){
            row = Math.floor(Math.random() * this.m_boardSize);
            col = Math.floor(Math.random() * this.m_boardSize);
            //check if its revealed cause one tile is clicked(revealed) before the bombs are placed
            if(this.m_tileArray[row][col].isBomb() || (this.m_tileArray[row][col].isRevealed()))
                continue;
            this.m_tileArray[row][col].setBomb();
            --bombsToBePlaced;
        }
        
    }

    private setNumAdjacentBombs(){
        for(let i = 0; i < this.m_boardSize; ++i){
            for(let j = 0; j < this.m_boardSize; ++j){
                //dont need to set num of adjacent bombs for tiles that are bombs
                if(this.m_tileArray[i][j].isBomb()) continue;
                
                let numBombs = 0;
                if(this.isBomb(i - 1, j)) ++numBombs;
                if(this.isBomb(i - 1, j +1)) ++numBombs;
                if(this.isBomb(i , j + 1)) ++numBombs;
                if(this.isBomb(i + 1, j + 1)) ++numBombs;
                if(this.isBomb(i + 1, j)) ++numBombs;
                if(this.isBomb(i + 1, j - 1)) ++numBombs;
                if(this.isBomb(i, j - 1)) ++numBombs;
                if(this.isBomb(i - 1, j - 1)) ++numBombs;
                this.m_tileArray[i][j].setNumAdjacentBombs(numBombs);
            }
        }
    }
    
    private isBomb(row:number, col:number){
        return this.inBounds(row,col) && this.m_tileArray[row][col].isBomb();
    }

    private inBounds(row:number, col:number){
        if (row >= this.m_boardSize || row < 0 || col >= this.m_boardSize || col < 0)
            return false;
        return true;
    }

    public tileRevealed(row:number, col:number){
        if(this.m_noTilesRevealed){//bombs placed after first tile click so you dont lose first try
            this.m_noTilesRevealed = false;
            this.placeBombs();
            this.setNumAdjacentBombs();
        }
        if(this.m_tileArray[row][col].isBomb())
            this.setGameOver();
        else if(this.m_tileArray[row][col].getNumAdjacentBombs() == 0){
            this.updateAdjacentTiles(row, col);
        }
        if(this.checkIfGameWon()){
            Game.getGameInstance().setGameWon();
        }
    }

    private checkIfGameWon(): Boolean{
        for(let i = 0; i < this.m_boardSize; ++i){
            for(let j = 0; j < this.m_boardSize; ++j){
                if(!this.m_tileArray[i][j].isBomb() && !this.m_tileArray[i][j].isRevealed())
                        return false;
            }
        }
        return true;
    }
    //recursivley updates the adjacent tiles to clear sections of the grid
    //when a tile with no adjacent bombs is pressed
    private updateAdjacentTiles(row:number, col:number){
        if(this.inBounds(row - 1, col)) this.m_tileArray[row - 1][col].updateTile();
        if(this.inBounds(row - 1, col + 1)) this.m_tileArray[row - 1][col + 1].updateTile();
        if(this.inBounds(row - 1, col - 1)) this.m_tileArray[row - 1][col - 1].updateTile();
        if(this.inBounds(row, col + 1)) this.m_tileArray[row][col + 1].updateTile();
        if(this.inBounds(row, col - 1)) this.m_tileArray[row][col - 1].updateTile();
        if(this.inBounds(row + 1, col)) this.m_tileArray[row + 1][col].updateTile();
        if(this.inBounds(row + 1, col + 1)) this.m_tileArray[row + 1][col + 1].updateTile();
        if(this.inBounds(row + 1, col - 1)) this.m_tileArray[row + 1][col - 1].updateTile();
    }

    private setGameOver(){
        this.revealBombs();
        Game.getGameInstance().setGameOver();

    }
    private revealBombs(){
        for(let i = 0; i < this.m_boardSize; ++i){
            for(let j = 0; j < this.m_boardSize; ++j){
                if(this.m_tileArray[i][j].isBomb()){
                    this.m_tileArray[i][j].getTableCell().style.backgroundImage = "url(assets/bomb.png)";
                    this.m_tileArray[i][j].getTableCell().style.backgroundSize = "contain";
                }
            }
        }
    }
    // private printTileArray(){
    //     for(let i = 0; i < this.m_boardSize; ++i){
    //         for(let j = 0; j < this.m_boardSize; ++j){
    //             console.log(this.m_tileArray[i][j].getTableCell())
    //         }
    //     }
    // }
}