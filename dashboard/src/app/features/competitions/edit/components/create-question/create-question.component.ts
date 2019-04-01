import { Component, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Question } from "../../../../../api/models/question";
import { QuestionFormDto } from "../../../../../components/question-form/dto/question-form.dto";

@Component({
    selector: "app-create-question",
    templateUrl: "create-question.template.html"
})
export class CreateQuestionComponent extends SimpleModalComponent<void, Question> implements OnInit {

    public questionFormDto: QuestionFormDto = new QuestionFormDto();

    constructor() {
        super();
    }

    ngOnInit() {
    }

    onClose() {
        this.close();
    }

    clickSave() {
        this.result = this.questionFormDto as Question;
        this.close();
    }
}
