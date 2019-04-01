import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Question, QuestionTypes } from "../../../../../api/models/question";
import { QuestionUtils } from "../../../../../utils/question.utils";

@Component({
    selector: "app-question-results-card",
    templateUrl: "question-results-card.template.html",
    styleUrls: ["./question-results-card.style.scss"]
})
export class QuestionResultsCardComponent implements OnInit {

    @Input()
    question: Question;

    @Input()
    teamResults: string[];

    @Output()
    clickDownloadSubmissions = new EventEmitter<void>();

    public isOpen = false;

    constructor() { }

    ngOnInit() {}

    onOpen() {
        this.isOpen = !this.isOpen;
    }

    get icon(): string {
        return QuestionUtils.getQuestionTypeIconClass(this.question.type);
    }

    onClickDownloadSubmissions(event: MouseEvent) {
        event.stopPropagation();
        this.clickDownloadSubmissions.emit();
    }
}
