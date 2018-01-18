import { Connection } from "mongoose";
import { NotificationsSchema } from "./notifications.model";

export const NotificationsProviders = [
    {
        provide: "NotificationsModelToken",
        useFactory: (connection: Connection) => connection.model("Notifications", NotificationsSchema),
        inject: ["DbConnectionToken"]
    }
];
