import { GameBoard } from "./module.js";
import CONSTANTS from "./module.js";
import { DIFFICULTY } from "./module.js";
export class Game{
    private m_gameBoard: GameBoard;
    private m_difficulty: DIFFICULTY;
    private static m_GameInstance: Game;
    private m_gameOver: Boolean = false;
    private m_BombsMinusFlags;
    private m_time: number = 0;
    private m_timerID: number = 0;
    private m_mute: Boolean = false;

    private constructor(){
        //todo probably better way to do this
        let dropDown = document.getElementById("dropDown") as HTMLSelectElement
        if(dropDown.value === "beginner"){
            this.m_difficulty = CONSTANTS.DIFFICULTY.BEGINNER;
        }else if(dropDown.value === "intermediate"){
            this.m_difficulty = CONSTANTS.DIFFICULTY.INTERMEDIATE;
        }else{
            this.m_difficulty = CONSTANTS.DIFFICULTY.EXPERT;
        }
        this.m_gameBoard = new GameBoard(CONSTANTS.BOARD_SIZES[this.m_difficulty]);
        this.m_BombsMinusFlags =  CONSTANTS.NUM_BOMBS[this.m_difficulty];
        document.getElementById("flags")!.innerText = String(this.m_BombsMinusFlags);
        document.getElementById("volume")!.addEventListener("click", () => this.toggleAudio() ,false);
        document.getElementById("volume")!.innerText = CONSTANTS.PLAY_SYMBOL;
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
        document.getElementById("time")!.innerText = "000";
        this.stopTimer();
        Game.m_GameInstance = new Game();
    }

    public isMute(): Boolean{
        return this.m_mute;
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
        this.stopTimer();
    }

    public setGameWon(){
        this.m_gameOver = true;
        document.getElementById("gameStatus")!.innerText = "You Win!"
        this.stopTimer();
    }

    public flagAdded(){
        --this.m_BombsMinusFlags;
        document.getElementById("flags")!.innerText = String(this.m_BombsMinusFlags);
    }
    public flagRemoved(){
        ++this.m_BombsMinusFlags;
        document.getElementById("flags")!.innerText = String(this.m_BombsMinusFlags);
    }

    
    private setTime(time: number){
        if(time > 999)
            return;
        let txt: string = "";
        if(time >= 100)
            txt = String(time);
        else if (time >= 10)
            txt = "0" + String(time);
        else
            txt = "00" + String(time);
        document.getElementById("time")!.innerText = txt;
    }

    public startTimer() {
        this.m_timerID = window.setInterval(() => this.setTime(++this.m_time), 1000);
    }
    private stopTimer() {
        window.clearInterval(this.m_timerID);
      }

    private toggleAudio(){
        let volume = document.getElementById("volume");
        const muteSymbol = '\u{1F507}';
        const playSymbol = '\u{1F50A}';
        if(!this.m_mute){
            volume!.innerText = CONSTANTS.MUTE_SYMBOL
            this.m_mute = true;
        }
        else{
            volume!.innerText = CONSTANTS.PLAY_SYMBOL
            this.m_mute = false;
        }
    }

}