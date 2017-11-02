import {IServerReelsResponse} from "./ServerResponseInterfaces";

export interface ISpinResponse {
    totalWin?: number;
    reels: IServerReelsResponse
}