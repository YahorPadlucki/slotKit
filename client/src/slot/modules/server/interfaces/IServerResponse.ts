import {IServerReelsResponse} from "./ServerResponseInterfaces";

export interface IServerResponse {
    totalWin?: number;
    reels: IServerReelsResponse
}