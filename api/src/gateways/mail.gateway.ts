import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway({
    namespace: 'mail'
})
export class MailGateway implements OnGatewayDisconnect {

    @WebSocketServer()
    server: SocketIO.Namespace;

    public handleDisconnect(socket: SocketIO.Socket) {
        socket.leave('mail-status-changed');
    }

    @SubscribeMessage('subscribe-mail-status-changed')
    onSubscribeMailStatusChanged(client: SocketIO.Socket, data) {
        client.join('mail-status-changed');
    }

    @SubscribeMessage('mail-status-changed')
    onMailStatusChanged(client: SocketIO.Client, data) {
        this.server.to('mail-status-changed').emit(data);
    }
}
