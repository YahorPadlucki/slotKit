import {IServer} from "../IServer";
import {IServerResponse} from "../interfaces/IServerResponse";

export class ServerEmulator implements IServer {

    private spinRequestTimeout: any;

    spinRequest(): Promise<IServerResponse> {
        return new Promise(resolve => {
            clearTimeout(this.spinRequestTimeout);
            this.spinRequestTimeout = setTimeout(() => {

                const serverResponse: IServerResponse = {
                    totalWin: 0,
                    reels: {
                        positions: [0, 1, 2, 3, 20]
                    }
                };

                resolve(serverResponse)
            }, 500);
        });
    }

}