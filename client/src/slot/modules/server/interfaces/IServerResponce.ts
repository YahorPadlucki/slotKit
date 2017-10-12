import {IServerReelsResponce} from "./ServerResponceInterfaces";

export interface IServerResponce{
    totalWin?:number;
    reels:IServerReelsResponce
}