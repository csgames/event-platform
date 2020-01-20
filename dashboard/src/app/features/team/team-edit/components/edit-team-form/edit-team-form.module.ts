import { NgModule } from "@angular/core";

import { EditTeamFormComponent } from "./edit-team-form.component";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { DirectivesModule } from "../../../../../directives/directives.module";
import { EDIT_TEAM_FORM_GENERATOR } from "../../team-edit.constants";
import { FormGeneratorFactory } from "../../../../../form-generator/factory";
import { EditTeamFormDto } from "./dto/edit-team-form.dto";
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
    declarations: [EditTeamFormComponent],
    providers: [
        { provide: EDIT_TEAM_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(EditTeamFormDto), deps: [FormBuilder] }
    ],
    exports: [EditTeamFormComponent]
})
export class EditTeamFormModule {
}
