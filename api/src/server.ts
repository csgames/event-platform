import { IoAdapter } from '@nestjs/websockets';
import { StorageService } from "@polyhx/nest-services";

require("dotenv").config();

import * as express from "express";
import * as morgan from "morgan";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ApplicationModule } from "./modules/app.module";

async function bootstrap() {
    const app: express.Application = express();

    app.use(morgan("dev"));
    app.use(StorageService.multerMemoryStorageConfig());
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.headers["origin"]) {
            res.setHeader("Access-Control-Allow-Origin", req.headers["origin"]);
            res.setHeader("Access-Control-Allow-Credentials", "true");
        }
        next();
    });

    try {
        const nestApp = await NestFactory.create(ApplicationModule, app, {
            cors: true,
            bodyParser: true
        });
        const packageJson = require('../package.json');
        const options = new DocumentBuilder()
            .setTitle('Event Management API')
            .setDescription(packageJson.description)
            .setVersion(packageJson.version)
            .addTag('Attendee')
            .addTag('Event')
            .addTag('School')
            .addTag('Team')
            .setSchemes('http', 'https')
            .addBearerAuth()
            .setSchemes('http', 'https')
            .build();
        const document = SwaggerModule.createDocument(nestApp, options);
        SwaggerModule.setup('/docs', nestApp, document);
        nestApp.useWebSocketAdapter(new IoAdapter());
        await nestApp.listen(Number(process.env.PORT));
    } catch (e) {
        console.log(e);
    }
}

bootstrap();
