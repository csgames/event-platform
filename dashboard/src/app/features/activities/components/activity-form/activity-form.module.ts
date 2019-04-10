import { NgModule } from "@angular/core";
import { ActivityFormComponent } from "./activity-form.component";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "src/app/directives/directives.module";
import { ACTIVITY_FORM_GENERATOR } from "./activity-form.constants";
import { FormGeneratorFactory } from "../../../../form-generator/factory";
import { ActivityFormDto } from "./dto/activity-form.dto";
import { TranslateModule } from "@ngx-translate/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { CustomTextBoxModule } from "src/app/components/custom-text-box/custom-text-box.module";
import { DatepickerModule, BsDatepickerModule, TimepickerModule } from "ngx-bootstrap";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        TranslateModule,
        NgSelectModule,
        CustomTextBoxModule,
        DatepickerModule,
        BsDatepickerModule,
        TimepickerModule,
        FlexLayoutModule
    ],
    declarations: [ActivityFormComponent],
    exports: [ActivityFormComponent],
    providers: [
        { provide: ACTIVITY_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(ActivityFormDto), deps: [FormBuilder] }
    ]
})
export class ActivityFormModule {
}
