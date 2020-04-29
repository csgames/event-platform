import { Injectable } from "@nestjs/common";
import { ManagementClient } from "auth0";
import { ConfigService } from "../configs/config.service";

@Injectable()
export class Auth0ManagementClient {
    public readonly client: ManagementClient;

    constructor(protected readonly configService: ConfigService) {
        this.client = new ManagementClient(this.configService.auth0);
    }
}
