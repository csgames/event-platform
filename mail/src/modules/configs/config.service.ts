import { Injectable } from "@nestjs/common";
import { Auth0Config } from "./models/auth0-config";
import { GlobalConfig } from "./models/global-config";

@Injectable()
export class ConfigService {
    public global: GlobalConfig;
    public auth0: Auth0Config;

    constructor() {
        this.loadConfigs();
    }

    private loadConfigs() {
        this.loadGlobalConfig();
        this.auth0 = new Auth0Config();
    }

    private loadGlobalConfig() {
        const packageJson = require("../../../package.json");
        this.global = {
            mode: process.env.NODE_ENV || "development",
            version: process.env.VERSION || packageJson.version
        };
    }
}
