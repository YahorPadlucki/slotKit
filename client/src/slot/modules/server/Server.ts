import {IServer} from "./IServer";
import {IServerResponse} from "./interfaces/IServerResponse";

export class Server implements IServer {
    spinRequest(): Promise<IServerResponse> {
        throw new Error("Method not implemented.");
    }

}