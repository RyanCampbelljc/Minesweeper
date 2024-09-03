import { GameBoard } from "./module.js";
import CONSTANTS from "./module.js";
import { DIFFICULTY } from "./module.js";
export class Game{
    private m_gameBoard: GameBoard;
    private m_difficulty: DIFFICULTY;
    private static m_GameInstance: Game;
    private m_gameOver: Boolean = false;

    private constructor(){
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

    public static getGameInstance(){
        if(Game.m_GameInstance){
            return Game.m_GameInstance;
        }
        Game.m_GameInstance = new Game();
        return Game.m_GameInstance;
    }

    public restartGame(){//todo feel like this is improper for singleton but works nice here
        document.getElementById("gameStatus")!.innerText = "";
        Game.m_GameInstance = new Game();
    }
    //todo remove was for debugging
    public getBoard(){
        return this.m_gameBoard;
    }

    public isGameOver(){
        return this.m_gameOver;
    }

    public getDifficulty(): DIFFICULTY{
        return this.m_difficulty;
    }

    //todo should be setup in observer patter fasion. deals with updating necessary thigns whena tile is clicked
    public tileRevealed(row:number, col:number){
        this.m_gameBoard.tileRevealed(row,col);
    }

    public setGameOver(){
        this.m_gameOver = true;
        document.getElementById("gameStatus")!.innerText = "Game Over!"
    }

}