import { Control } from "src/app/form-generator/decorators/control.decorator";
import { Required } from "src/app/form-generator/decorators/required.decorator";

export class FlashoutEditDto {
    @Control()
    @Required()
    videoId: string;

    @Control()
    url: string;

    @Control()
    @Required()
    school: string;
}
