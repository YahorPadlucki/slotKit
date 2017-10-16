import {IServerResponse} from "./interfaces/IServerResponse";

export interface IServer {
    spinRequest(): Promise<IServerResponse>;
}