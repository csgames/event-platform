import { Component, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Question } from "../../../../../api/models/question";
import { QuestionFormDto } from "../../../../../components/question-form/dto/question-form.dto";

interface UpdateQuestionModal {
    question: Question;
}

@Component({
    selector: "app-update-question",
    templateUrl: "./update-question.template.html",
    styleUrls: ["./update-question.style.scss"]
})
export class UpdateQuestionComponent extends SimpleModalComponent<UpdateQuestionModal, Question> implements OnInit {

    public question: Question;

    public questionFormDto: QuestionFormDto;

    constructor() {
        super();
    }

    ngOnInit() {
        this.questionFormDto = {
            ...this.question
        };
    }

    onClose() {
        this.close();
    }

    clickSave() {
        this.result = {
            ...this.questionFormDto,
            _id: this.question._id
        } as Question;
        this.close();
    }
}
