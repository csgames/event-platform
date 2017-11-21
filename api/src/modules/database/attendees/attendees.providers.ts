import { Connection } from "mongoose";
import { AttendeesSchema } from "./attendees.model";

export const attendeesProviders = [
    {
        provide: "AttendeesModelToken",
        useFactory: (connection: Connection) => connection.model("attendees", AttendeesSchema),
        inject: ["DbConnectionToken"]
    }
];
