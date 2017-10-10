import {IServer} from "./IServer";

export class Server implements IServer {
    spinRequest(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}