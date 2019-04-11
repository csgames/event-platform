import { Component } from "@angular/core";
import { Answers } from "src/app/api/models/puzzle-hero";
import { SimpleModalComponent } from "ngx-simple-modal";

interface AnswersModal {
    answers: Answers[];
}

@Component({
    selector: "app-answers",
    templateUrl: "answers.template.html"
})
export class AnswersComponent extends SimpleModalComponent<AnswersModal, void> {
    public answers: Answers[];
    
    constructor() {
        super();
    }
    
    public onClose() {
        this.close();
    }
}