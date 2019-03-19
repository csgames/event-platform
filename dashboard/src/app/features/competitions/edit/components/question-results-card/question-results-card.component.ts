import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Question, QuestionTypes } from "../../../../../api/models/question";

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
        switch (this.question.type) {
            case QuestionTypes.Crypto:
                return "fal fa-key";
            case QuestionTypes.Gaming:
                return "fal fa-gamepad";
            case QuestionTypes.Scavenger:
                return "fal fa-camera-alt";
            case QuestionTypes.Upload:
                return "fal fa-upload";
        }
        return "";
    }

    onClickDownloadSubmissions(event: MouseEvent) {
        event.stopPropagation();
        this.clickDownloadSubmissions.emit();
    }
}
