require("dotenv").config();
import * as morgan from "morgan";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { ApplicationModule } from "./modules/app.module";

async function bootstrap() {
    const adapter = new ExpressAdapter();
    adapter.disable("x-powered-by");

    const app = await NestFactory.create(ApplicationModule, adapter, {
        bodyParser: true,
        cors: {
            allowedHeaders: [
                "origin",
                "content-type",
                "authorization",
                ...(process.env.ALLOW_HEADERS || "").split(" ")
            ],
            origin: (process.env.ALLOW_ORIGINS || "").split(" "),
            credentials: true
        }
    });

    app.use(morgan("dev"));

    await app.listen(Number(process.env.PORT));
}

bootstrap();
