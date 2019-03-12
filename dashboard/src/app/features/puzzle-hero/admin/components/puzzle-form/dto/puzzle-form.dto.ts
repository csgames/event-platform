import { Control } from "../../../../../../form-generator/decorators/control.decorator";
import { Question } from "../../../../../../api/models/puzzle-hero";
import { Required } from "src/app/form-generator/decorators/required.decorator";

export class PuzzleFormDto {

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
    score: number;

    @Control()
    @Required()
    answer: string;

    @Control()
    @Required()
    description: any;
}
