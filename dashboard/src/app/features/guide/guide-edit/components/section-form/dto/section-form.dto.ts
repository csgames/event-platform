import { Control } from "../../../../../../form-generator/decorators/control.decorator";
import { Required } from "../../../../../../form-generator/decorators/required.decorator";

export class SectionFormDto {

    @Control()
    @Required()
    type: string;
 
}
