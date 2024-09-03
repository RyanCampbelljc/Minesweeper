export class Tile{
    readonly BLOCK_COLOR:string = "#808080";
    readonly BLOCK_CLICK_COLOR:string = "#666";
    readonly BLOCK_HOVER_COLOR:string = "#ccc";
    readonly BLOCK_REVEALED_COLOR:string = "#fff";

    private m_isBomb: Boolean = false;
    private m_isRevealed: Boolean = false;
    private m_numAdjacentBombs: number = 0;
    private m_tableCell: HTMLTableCellElement;

    constructor(tableCell: HTMLTableCellElement){
        this.m_tableCell = tableCell
        this.addListeners(this.m_tableCell);
    }

    public setNumAdjacentBombs(numBombs: number): void{
        this.m_numAdjacentBombs = numBombs;
    }
    

    // public revealTile(): void{
    //     this.m_isRevealed = true;
    // }
    
    // public isRevealed(): Boolean{
    //     return this.m_isRevealed;
    // }

    // public isBomb(): Boolean{
    //     return this.m_isBomb;
    // }

    public getTableCell(): HTMLTableCellElement{
        return this.m_tableCell;
    }
    private updateTile(){
        if(this.m_isRevealed)
            return;
        this.m_isRevealed = true;
        this.m_tableCell.style.backgroundColor = this.BLOCK_REVEALED_COLOR;

    }

    private flagTile(){
        
    }

    private addListeners(cell:HTMLTableCellElement){
        cell.addEventListener(
            "mouseup",
            () => this.updateTile(), //works but didnt without "() =>"... something about this having undefined behaviour
            false
        );

        cell.addEventListener(
            "contextmenu",
            () => this.flagTile(),
            false
        );
    }
    
   

}