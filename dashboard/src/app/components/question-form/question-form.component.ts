import { Component, OnDestroy, OnInit, Inject, forwardRef } from "@angular/core";
import { QuestionFormDto } from "./dto/question-form.dto";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { QUESTION_FORM_GENERATOR } from "./question-form.constants";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subscription } from "rxjs";
import { InputTypes, QuestionTypes, ValidationTypes } from "../../api/models/question";
import { QuestionUtils } from "../../utils/question.utils";

@Component({
    selector: "app-question-form",
    templateUrl: "question-form.template.html",
    styleUrls: ["question-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => QuestionFormComponent),
            multi: true
        }
    ]
})
export class QuestionFormComponent implements OnInit, ControlValueAccessor, OnDestroy {

    constructor(@Inject(QUESTION_FORM_GENERATOR) private formGenerator: FormGenerator<QuestionFormDto>) { }

    public validationTypes: string[];
    public questionTypes: string[];
    public inputTypes: string[];

    public formGroup: FormGroup;
    private valueChangeSub$: Subscription;

    private propagate: (questionFormDto: QuestionFormDto) => void;

    ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });

        this.validationTypes = [];
        for (const i of Object.keys(ValidationTypes)) {
            this.validationTypes.push(ValidationTypes[i]);
        }

        this.questionTypes = [];
        for (const i of Object.keys(QuestionTypes)) {
            this.questionTypes.push(QuestionTypes[i]);
        }

        this.inputTypes = [];
        for (const i of Object.keys(InputTypes)) {
            this.inputTypes.push(InputTypes[i]);
        }
    }

    ngOnDestroy() {
        this.valueChangeSub$.unsubscribe();
    }

    registerOnChange(fn: (questionFormDto: QuestionFormDto) => void): void {
        this.propagate = fn;
    }

    registerOnTouched(fn: any): void {
        // NO-OP
    }

    writeValue(questionFormDto: QuestionFormDto): void {
        if (questionFormDto) {
            this.formGenerator.patchValues(questionFormDto);
        }
    }

    validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }
        this.formGenerator.markAsDirty();
        return false;
    }

    getQuestionTypeIcon(type: QuestionTypes): string {
        return QuestionUtils.getQuestionTypeIconClass(type);
    }

    getValidationIcon(type: string): string {
        switch (type) {
            case ValidationTypes.String:
                return "fa-align-justify";
            case ValidationTypes.Function:
                return "fa-function";
            case ValidationTypes.Regex:
                return "fa-space-shuttle";
            case ValidationTypes.None:
                return "fa-times";
            case ValidationTypes.Manual:
                return "fa-user-check";
        }
        return "";
    }

    getInputTypeIcon(type: string): string {
        switch (type) {
            case InputTypes.String:
                return "fa-align-justify";
            case InputTypes.Code:
                return "fa-file-code";
            case InputTypes.Upload:
                return "fal fa-upload";
        }
        return "";
    }
}
