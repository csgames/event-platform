import { NgModule } from "@angular/core";
import { AttendeeFormComponent } from "./attendee-form.component";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormGeneratorFactory } from "../../form-generator/factory";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ATTENDEE_FORM_GENERATOR } from "./attendee-form.constants";
import { AttendeeFormDto } from "./dto/attendee-form.dto";
import { NgxMaskModule } from "ngx-mask";
import { TranslateModule } from "@ngx-translate/core"

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgxMaskModule.forChild(),
        TranslateModule
    ],
    declarations: [AttendeeFormComponent],
    providers: [
        { provide: ATTENDEE_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(AttendeeFormDto), deps: [FormBuilder] }
    ],
    exports: [AttendeeFormComponent],
})
export class AttendeeFormModule {
}
