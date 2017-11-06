import { Connection } from "mongoose";
import { ActivitiesSchema } from "./activities.model";

export const activitiesProviders = [
    {
        provide: "ActivitiesModelToken",
        useFactory: (connection: Connection) => connection.model("Activity", ActivitiesSchema),
        inject: ["DbConnectionToken"]
    }
];