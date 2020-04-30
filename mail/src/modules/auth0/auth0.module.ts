import { Module } from "@nestjs/common";
import { ConfigModule } from "../configs/config.module";
import { Auth0Service } from "./auth0.service";
import { RolesService } from "./roles/services/roles.service";

@Module({
    imports: [ConfigModule],
    providers: [Auth0Service, RolesService],
    exports: [Auth0Service]
})
export class Auth0Module {}
