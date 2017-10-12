import {IServer} from "../IServer";
import {IServerResponce} from "../interfaces/IServerResponce";

export class ServerEmulator implements IServer {

    spinRequest(): Promise<IServerResponce> {
        return new Promise(resolve => {
            setTimeout(() => {

                const serverResponse: IServerResponce = {
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