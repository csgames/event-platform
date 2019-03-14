import { NgModule } from "@angular/core";

import { CompetitionFormComponent } from "./competition-form.component";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "../../../../../directives/directives.module";
import { COMPETITION_FORM_GENERATOR } from "./competition-form.constants";
import { FormGeneratorFactory } from "../../../../../form-generator/factory";
import { CompetitionFormDto } from "./dto/competition-form.dto";
import { TranslateModule } from "@ngx-translate/core";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        TranslateModule,
        NgSelectModule
    ],
    declarations: [CompetitionFormComponent],
    exports: [CompetitionFormComponent],
    providers: [
        { provide: COMPETITION_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(CompetitionFormDto), deps: [FormBuilder] }
    ]
})
export class CompetitionFormModule {
}
