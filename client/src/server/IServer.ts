import {IServerResponce} from "./interfaces/IServerResponce";

export interface IServer {
    spinRequest(): Promise<IServerResponce>;
}