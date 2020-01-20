import { NgModule } from "@angular/core";
import { QuestionFormComponent } from "./question-form.component";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { DirectivesModule } from "../../directives/directives.module";
import { CustomTextBoxModule } from "../custom-text-box/custom-text-box.module";
import { FormGeneratorFactory } from "../../form-generator/factory";
import { QuestionFormDto } from "./dto/question-form.dto";
import { QUESTION_FORM_GENERATOR } from "./question-form.constants";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        DirectivesModule,
        CustomTextBoxModule,
        FlexLayoutModule
    ],
    exports: [QuestionFormComponent],
    declarations: [QuestionFormComponent],
    providers: [
        { provide: QUESTION_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(QuestionFormDto), deps: [FormBuilder] }
    ]
})
export class QuestionFormModule {}
