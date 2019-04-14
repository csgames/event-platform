import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { IoAdapter } from "@nestjs/websockets";
import { StorageService } from "@polyhx/nest-services";
import * as express from "express";
import * as morgan from "morgan";
import { ApplicationModule } from "./modules/app.module";
import { BooleanPipe } from "./pipes/boolean.pipe";

require("dotenv").config();

async function bootstrap() {
    const app: express.Application = express();

    app.use(morgan("dev"));
    app.use(StorageService.multerMemoryStorageConfig());

    try {
        const nestApp = await NestFactory.create(ApplicationModule, app, {
            bodyParser: true
        });
        const packageJson = require("../package.json");
        const options = new DocumentBuilder()
            .setTitle("Event Management API")
            .setDescription(packageJson.description)
            .setVersion(packageJson.version)
            .addTag("Attendee")
            .addTag("Activity")
            .addTag("Event")
            .addTag("School")
            .addTag("Team")
            .setSchemes("http", "https")
            .addBearerAuth()
            .setSchemes("http", "https")
            .build();
        const document = SwaggerModule.createDocument(nestApp, options);
        SwaggerModule.setup("/docs", nestApp, document);
        nestApp.useWebSocketAdapter(new IoAdapter());
        nestApp.useGlobalPipes(new BooleanPipe());
        await nestApp.listen(Number(process.env.PORT));
    } catch (e) {
        console.log(e);
    }
}

bootstrap();
