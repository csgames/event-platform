import { Module } from "@nestjs/common";
import { STSService } from "./sts.service";

@Module({
    providers: [
        STSService
    ],
    exports: [
        STSService
    ]
})
export class STSModule { }
