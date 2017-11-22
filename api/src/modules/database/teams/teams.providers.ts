import { Connection } from "mongoose";
import { TeamsSchema } from "./teams.model";

export const teamsProviders = [
    {
        provide: "TeamsModelToken",
        useFactory: (connection: Connection) => connection.model("teams", TeamsSchema),
        inject: ["DbConnectionToken"]
    }
];
