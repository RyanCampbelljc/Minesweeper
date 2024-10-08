import { Game } from "./module.js";
import CONSTANTS from "./module.js";
import { playSound } from "./module.js";
export class Tile{
    readonly BLOCK_COLOR:string = "#808080";
    // readonly BLOCK_CLICK_COLOR:string = "#666";
    readonly BLOCK_HOVER_COLOR:string = "#ccc";
    readonly BLOCK_REVEALED_COLOR:string = "#fff";
    readonly colorArray = [
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
    
    public getNumAdjacentBombs(): number {
        return this.m_numAdjacentBombs;
    }

    public isRevealed(): Boolean{
        return this.m_isRevealed;
    }

    public isBomb(): Boolean{
        return this.m_isBomb;
    }

    public setBomb(): void{
        this.m_isBomb = true;
    }

    public getTableCell(): HTMLTableCellElement{
        return this.m_tableCell;
    }
    public updateTile(){
        if(this.m_isRevealed || Game.getGameInstance().isGameOver())
            return;
        this.m_isRevealed = true;
        this.m_tableCell.style.backgroundColor = this.BLOCK_REVEALED_COLOR;
        this.m_isFlagged = false;
        Game.getGameInstance().tileRevealed(this.m_position[0],this.m_position[1]);
        if(!this.m_isBomb){
            this.m_tableCell.style.backgroundImage = ""; // clears flag if there was one there
            if(this.m_numAdjacentBombs > 0){
                this.m_tableCell.innerText = String(this.m_numAdjacentBombs);
                this.m_tableCell.style.color = this.colorArray[this.m_numAdjacentBombs];
                this.m_tableCell.style.fontWeight = "bold";
                this.m_tableCell.style.fontSize = "18px";
            }
            
        }     
    }

    private flagTile(){
        console.log("flag")
        if(this.m_isRevealed || Game.getGameInstance().isGameOver())
            return;
        if(this.m_isFlagged){
            this.m_tableCell.style.backgroundImage = "";
            this.m_isFlagged = false;
            Game.getGameInstance().flagRemoved();
        }else{
            this.m_tableCell.style.backgroundImage = "url(assets/flag.ico)";
            this.m_isFlagged = true;
            this.m_tableCell.style.backgroundSize = "contain";
            Game.getGameInstance().flagAdded();
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
            () => {
                if(!Game.getGameInstance().isGameOver() && !this.m_isRevealed && !this.m_isBomb && !Game.getGameInstance().isMute())
                    playSound(CONSTANTS.CLICK_AUDIO_FILE);
                else if(!Game.getGameInstance().isGameOver() && !this.m_isRevealed && this.m_isBomb && !Game.getGameInstance().isMute())
                    playSound(CONSTANTS.BOMB_FILE);
                this.updateTile()
            } , //works but didnt without "() =>"... something about this having undefined behaviour
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