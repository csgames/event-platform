import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { InputTypes, Question, QuestionGraphNode, QuestionTypes, ValidationTypes } from "../../../../../api/models/question";
import { QuestionUtils } from "../../../../../utils/question.utils";

@Component({
    selector: "app-question-edit-card",
    templateUrl: "question-edit-card.template.html",
    styleUrls: ["./question-edit-card.style.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionEditCardComponent implements OnInit {
    @Input()
    public question: QuestionGraphNode;

    @Output()
    public clickEditQuestion = new EventEmitter<void>();

    public isOpen = false;

    constructor() { }

    ngOnInit() { }

    onOpen() {
        this.isOpen = !this.isOpen;
    }

    get icon(): string {
        return QuestionUtils.getQuestionTypeIconClass((this.question.question as Question).type);
    }

    get validationIcon(): string {
        switch ((this.question.question as Question).validationType) {
            case ValidationTypes.String:
                return "fa-align-justify";
            case ValidationTypes.Function:
                return "fa-function";
            case ValidationTypes.Regex:
                return "fa-space-shuttle";
            case ValidationTypes.None:
                return "fa-times";
        }
        return "";
    }

    get inputIcon(): string {
        switch ((this.question.question as Question).inputType) {
            case InputTypes.String:
                return "fa-align-justify";
            case InputTypes.Code:
                return "fa-file-code";
            case InputTypes.Upload:
                return "fal fa-upload";
        }
        return "";
    }

    onClickEditQuestion(event: MouseEvent) {
        event.stopPropagation();
        this.clickEditQuestion.emit();
    }
}
