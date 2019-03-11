import { Control } from "src/app/form-generator/decorators/control.decorator";
import { Required } from "src/app/form-generator/decorators/required.decorator";

export class AddFlashoutDto {
    @Control()
    @Required()
    url: string;
    
    @Control()
    @Required()
    school: string;
}