import {IServer} from "../IServer";

export class ServerEmulator implements IServer {

    spinRequest(): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => resolve(), 500);
        });
    }

}