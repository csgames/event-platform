import { Module } from "@nestjs/common";
import { STSService } from "./sts.service";

@Module({
    components: [ STSService ],
    exports: [ STSService ]
})
export class STSModule { }
