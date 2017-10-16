import {IServer} from "../IServer";
import {IServerResponse} from "../interfaces/IServerResponse";

export class ServerEmulator implements IServer {

    spinRequest(): Promise<IServerResponse> {
        return new Promise(resolve => {
            setTimeout(() => {

                const serverResponse: IServerResponse = {
                    totalWin: 0,
                    reels: {
                        positions: [0, 0, 0, 0, 0]
                    }
                };

                resolve(serverResponse)
            }, 500);
        });
    }

}