import { Game } from "./module.js";
export class Tile{
    readonly BLOCK_COLOR:string = "#808080";
    // readonly BLOCK_CLICK_COLOR:string = "#666";
    readonly BLOCK_HOVER_COLOR:string = "#ccc";
    readonly BLOCK_REVEALED_COLOR:string = "#fff";

    private m_isBomb: Boolean = false;
    private m_isRevealed: Boolean = false;
    private m_numAdjacentBombs: number = 0;
    private m_tableCell: HTMLTableCellElement;
    private m_isFlagged: Boolean = false;
    private m_position: [number,number];
    constructor(tableCell: HTMLTableCellElement, row: number, col: number){
        this.m_tableCell = tableCell
        this.addListeners(this.m_tableCell);
        this.m_position = [row, col];
    }

    public setNumAdjacentBombs(numBombs: number): void{
        this.m_numAdjacentBombs = numBombs;
    }
    

    // public revealTile(): void{
    //     this.m_isRevealed = true;
    // }
    
    public isRevealed(): Boolean{
        return this.m_isRevealed;
    }

    public isBomb(): Boolean{
        return this.m_isBomb;
    }

    public setBomb(){
        this.m_isBomb = true;
    }

    public getTableCell(): HTMLTableCellElement{
        return this.m_tableCell;
    }
    private updateTile(){
        if(this.m_isRevealed || Game.getGameInstance().isGameOver())
            return;
        this.m_isRevealed = true;
        this.m_tableCell.style.backgroundColor = this.BLOCK_REVEALED_COLOR;
        this.m_isFlagged = false;
        Game.getGameInstance().tileRevealed(this.m_position[0],this.m_position[1]);
        if(!this.m_isBomb){
            this.m_tableCell.style.backgroundImage = ""; // clears flag if there was one there
            if(this.m_numAdjacentBombs > 0)
                this.m_tableCell.innerText = String(this.m_numAdjacentBombs);
        }     
    }

    private flagTile(){
        console.log("flag")
        if(this.m_isRevealed || Game.getGameInstance().isGameOver())
            return;
        if(this.m_isFlagged){
            this.m_tableCell.style.backgroundImage = "";
            this.m_isFlagged = false;
        }else{
            this.m_tableCell.style.backgroundImage = "url(assets/flag.ico)";
            this.m_isFlagged = true;
            this.m_tableCell.style.backgroundSize = "contain";
        }
    }

    private mouseOver(){
        if(this.m_isRevealed || Game.getGameInstance().isGameOver())
            return;
        this.m_tableCell.style.backgroundColor = this.BLOCK_HOVER_COLOR;
    }

    private mouseOut(){
        if(this.m_isRevealed || Game.getGameInstance().isGameOver())
            return;
        this.m_tableCell.style.backgroundColor = this.BLOCK_COLOR;
    }

    private addListeners(cell:HTMLTableCellElement){
        cell.addEventListener(
            "click",
            () => this.updateTile(), //works but didnt without "() =>"... something about this having undefined behaviour
            false
        );

        cell.addEventListener(
            "contextmenu",
            () => this.flagTile(),
            false
        );

        cell.addEventListener(
            "mouseover",
            () => this.mouseOver(),
            false
        )

        cell.addEventListener(
            "mouseout",
            () => this.mouseOut(),
            false
        )
    }
    
   

}