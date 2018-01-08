import * as mongoose from "mongoose";

export const databaseProviders = [
    {
        provide: "DbConnectionToken",
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            mongoose.connection.on("error", err => console.log(err));
            let mongoUri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}`;
            return await mongoose.connect(mongoUri, { useMongoClient: true });
        }
    }
];
