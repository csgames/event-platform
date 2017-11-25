import { Connection } from "mongoose";
import { TemplatesSchema } from "./templates.model";

export const templatesProviders = [
    {
        provide: "TemplatesModelToken",
        useFactory: (connection: Connection) => connection.model("Template", TemplatesSchema),
        inject: [ "DbConnectionToken" ]
    }
];
