require("dotenv").config();

import * as express from "express";
import * as morgan from "morgan";
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./modules/app.module";

async function bootstrap() {
    const app: express.Application = express();

    app.use(morgan("dev"));
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.headers[ "origin" ]) {
            res.setHeader("Access-Control-Allow-Origin", req.headers[ "origin" ]);
            res.setHeader("Access-Control-Allow-Credentials", "true");
        }
        next();
    });

    const nestApp = await NestFactory.create(ApplicationModule, app, {
        bodyParser: true,
        cors: true
    });
    await nestApp.listen(Number(process.env.PORT));
}

bootstrap();
