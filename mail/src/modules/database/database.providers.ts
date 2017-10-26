import * as mongoose from "mongoose";

export const databaseProviders = [
    {
        provide: "DbConnectionToken",
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect(
                "mongodb://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD +
                "@" + process.env.DB_ADDRESS, {
                    useMongoClient: true
                });
        }
    }
];
