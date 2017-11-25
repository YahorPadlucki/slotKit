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
                        [0, 0, 0, 0, 0],
                        [1, 0, 1, 0, 1],
                        [2, 2, 2, 2, 2],
                        [3, 3, 3, 3, 3],
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
                    totalWin: 10,
                    reels: {
                        stopPositions: [1, 1, 1, 1, 0]
                    },
                    rewards: [
                        {
                            lineId: 0,
                            linePayout: 0,
                            symbolsCount: 3
                        },
                        {
                            lineId: 1,
                            linePayout: 0,
                            symbolsCount: 3
                        }
                    ]
                };

                resolve(serverResponse)
            }, 500);
        });
    }

}