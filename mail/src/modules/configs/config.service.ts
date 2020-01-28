import { Injectable } from "@nestjs/common";
import { GlobalConfig } from "./models/global-config";

@Injectable()
export class ConfigService {
    public global: GlobalConfig;

    constructor() {
        this.loadConfigs();
    }

    private loadConfigs() {
        this.loadGlobalConfig();
    }

    private loadGlobalConfig() {
        const packageJson = require("../../../package.json");
        this.global = {
            mode: process.env.NODE_ENV || "development",
            version: process.env.VERSION || packageJson.version
        };
    }
}
