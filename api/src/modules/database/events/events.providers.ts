import { Connection } from "mongoose";
import { EventsSchema } from "./events.model";

export const eventsProviders = [
    {
        provide: "EventsModelToken",
        useFactory: (connection: Connection) => connection.model("events", EventsSchema),
        inject: ["DbConnectionToken"]
    }
];
