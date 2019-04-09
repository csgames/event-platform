import { NgModule } from "@angular/core";

import { AddTeamFormComponent } from "./add-team-form.component";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { DirectivesModule } from "../../../../../directives/directives.module";
import { ADD_TEAM_FORM_GENERATOR } from "../../team-edit.constants";
import { FormGeneratorFactory } from "../../../../../form-generator/factory";
import { AddTeamFormDto } from "./dto/add-team-form.dto";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        NgSelectModule,
        DirectivesModule
    ],
    declarations: [AddTeamFormComponent],
    providers: [
        { provide: ADD_TEAM_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(AddTeamFormDto), deps: [FormBuilder] }
    ],
    exports: [AddTeamFormComponent]
})
export class AddTeamFormModule {
}
