import { Module } from "@nestjs/common";
import { ConfigModule } from "../configs/config.module";
import { Auth0Service } from "./auth0.service";
import { RolesService } from "./roles/services/roles.service";
import { UsersService } from "./users/services/users.service";

@Module({
    imports: [ConfigModule],
    providers: [Auth0Service, RolesService, UsersService],
    exports: [Auth0Service]
})
export class Auth0Module {}
