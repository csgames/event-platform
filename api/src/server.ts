require("dotenv").config();

import * as fs from "fs";
import * as bodyParser from "body-parser";
import * as jwt from "express-jwt";
import * as cors from "cors";
import * as express from "express";
import * as morgan from "morgan";
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./modules/app.module";

async function bootstrap() {
    const app: express.Application = express();

    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(jwt({
        secret: fs.readFileSync(process.env.STS_PUBLIC_KEY),
        audience: [
            process.env.STS_AUDIENCE_URL,
            process.env.STS_AUDIENCE_SCOPE
        ],
        issuer: process.env.STS_ISSUER_URL
    }).unless({
        path: [/^\/registration\/.*/]
    }));
    app.use(cors({
        preflightContinue: true
    }));
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.headers["origin"]) {
            res.setHeader("Access-Control-Allow-Origin", req.headers["origin"]);
            res.setHeader("Access-Control-Allow-Credentials", "true");
        }
        next();
    });

    app.post("attendee2", function (req: express.Request, res: express.Response) {
        console.log(req.body);
        res.send({success: true});
    });

    const nestApp = await NestFactory.create(ApplicationModule, app);
    await nestApp.listen(Number(process.env.PORT));
}

bootstrap();
