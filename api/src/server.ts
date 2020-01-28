import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { StorageService } from "@polyhx/nest-services";
import * as morgan from "morgan";
import { ApplicationModule } from "./modules/app.module";
import { BooleanPipe } from "./pipes/boolean.pipe";

require("dotenv").config();

async function bootstrap() {
    const adapter = new ExpressAdapter();
    adapter.disable("x-powered-by");

    try {
        const app = await NestFactory.create(ApplicationModule, adapter, {
            bodyParser: true
        });

        app.use(morgan("dev"));
        app.use(StorageService.multerMemoryStorageConfig());

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
            .addBearerAuth()
            .build();

        if (process.env.NODE_ENV !== "production") {
            const document = SwaggerModule.createDocument(app, options);
            SwaggerModule.setup("/docs", app, document);
        }

        app.useWebSocketAdapter(new IoAdapter());
        app.useGlobalPipes(new BooleanPipe());

        await app.listen(Number(process.env.PORT));
    } catch (e) {
        console.log(e);
    }
}

bootstrap();
