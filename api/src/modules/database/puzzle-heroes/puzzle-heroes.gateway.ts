import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

export enum PuzzleHeroMessageTypes {
    ScoreboardUpdate = 'scoreboard_update'
}

@WebSocketGateway(8081)
export class PuzzleHeroesGateway {
    @WebSocketServer()
    private server: Server;

    public sendScoreboardUpdateMessage() {
        this.server.emit(PuzzleHeroMessageTypes.ScoreboardUpdate);
    }
}
