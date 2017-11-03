import {IServer} from "../IServer";
import {ISpinResponse} from "../interfaces/ISpinResponse";
import {IInitResponse} from "../interfaces/IInitResponse";

export class ServerEmulator implements IServer {

    private spinRequestTimeout: any;
    private initTimeout: any;

    initRequest(): Promise<IInitResponse> {
        return new Promise(resolve => {
            clearTimeout(this.initTimeout);
            this.initTimeout = setTimeout(() => {
                const serverResponse: IInitResponse = {
                    lines: [
                        [1, 1, 1, 1, 1],
                        [2, 2, 2, 2, 2],
                        [3, 3, 3, 3, 3],
                        [4, 4, 4, 4, 4]
                    ],
                    reels: {
                        stopPositions: [1, 2, 3, 4, 0],
                        tapes: [
                            [3, 3, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
                            [2, 2, 3, 2, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
                            [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
                            [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
                            [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]
                        ]
                    }
                };
                resolve(serverResponse)
            }, 500);
        })
    }

    spinRequest(): Promise<ISpinResponse> {
        return new Promise(resolve => {
            clearTimeout(this.spinRequestTimeout);
            this.spinRequestTimeout = setTimeout(() => {

                const serverResponse: ISpinResponse = {
                    totalWin: 0,
                    reels: {
                        stopPositions: [1, 1, 1, 1, 0]
                    }
                };

                resolve(serverResponse)
            }, 500);
        });
    }

}