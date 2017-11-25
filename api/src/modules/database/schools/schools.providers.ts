import { Connection } from "mongoose";
import { SchoolsSchema } from "./schools.model";

export const schoolsProviders = [
    {
        provide: "SchoolsModelToken",
        useFactory: (connection: Connection) => connection.model("schools", SchoolsSchema),
        inject: ["DbConnectionToken"]
    }
];
