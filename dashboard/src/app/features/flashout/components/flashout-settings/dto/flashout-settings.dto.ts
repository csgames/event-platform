import { Control } from "src/app/form-generator/decorators/control.decorator";
import { Required } from "src/app/form-generator/decorators/required.decorator";

export class FlashoutSettingsDto {
    @Control()
    @Required()
    flashoutBeginDate: Date;

    @Control()
    @Required()
    beginTime: Date;

    @Control()
    @Required()
    flashoutEndDate: Date;
    
    @Control()
    @Required()
    endTime: Date;
}