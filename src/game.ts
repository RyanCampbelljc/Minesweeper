import { GameBoard } from "./module.js";
import CONSTANTS from "./module.js";
import { DIFFICULTY } from "./module.js";
export class Game{
    private m_gameBoard: GameBoard;
    private m_difficulty: DIFFICULTY;
    //private static m_GameInstance: Game;
    constructor(){
        //todo probably better way to do this
        let beg = document.getElementById("beginner") as HTMLInputElement
        let interm = document.getElementById("intermediate") as HTMLInputElement
        if(beg.checked){
            this.m_difficulty = CONSTANTS.DIFFICULTY.BEGINNER;
        }else if(interm.checked){
            this.m_difficulty = CONSTANTS.DIFFICULTY.INTERMEDIATE;
        }else{
            this.m_difficulty = CONSTANTS.DIFFICULTY.EXPERT;
        }
        this.m_gameBoard = new GameBoard(CONSTANTS.BOARD_SIZES[this.m_difficulty]);
    }
    // public static getGameInstance(){
    //     if(this.m_GameInstance){
    //         return this.m_GameInstance;
    //     }
    //     this.m_GameInstance = new Game();
    //     return this.m_GameInstance;
    // }

    //todo remove was for debugging
    public getBoard(){
        return this.m_gameBoard;
    }

}