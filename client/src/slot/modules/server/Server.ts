import {IServer} from "./IServer";
import {IServerResponce} from "./interfaces/IServerResponce";

export class Server implements IServer {
    spinRequest(): Promise<IServerResponce> {
        throw new Error("Method not implemented.");
    }

}