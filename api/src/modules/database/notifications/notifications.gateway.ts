import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Notifications } from "./notifications.model";

@WebSocketGateway({
    namespace: 'notification'
})
export class NotificationGateway {

    @WebSocketServer()
    server: SocketIO.Namespace;

    sendNotification(dto: Partial<Notifications>) {
        this.server.emit('notification', dto);
    }
}
