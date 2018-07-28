import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot("mongodb://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD +
            "@" + process.env.DB_ADDRESS, {
            useMongoClient: true
        })
    ]
})
export class DatabaseModule {
}
