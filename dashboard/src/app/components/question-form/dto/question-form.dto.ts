import { Control } from "../../../form-generator/decorators/control.decorator";
import { Required } from "src/app/form-generator/decorators/required.decorator";

export class QuestionFormDto {
    @Control()
    @Required()
    label: string;

    @Control()
    @Required()
    type: string;

    @Control()
    @Required()
    validationType: string;

    @Control()
    @Required()
    inputType: string;

    @Control()
    @Required()
    score: number;

    @Control()
    answer: string;

    @Control()
    @Required()
    description: any;
}
