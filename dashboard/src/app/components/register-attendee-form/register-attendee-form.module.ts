import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterAttendeeFormComponent } from "./register-attendee-form.component";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { REGISTER_ATTENDEE_FORM_GENERATOR } from "./register-attendee-form.constant";
import { FormGeneratorFactory } from "../../form-generator/factory";
import { RegisterAttendeeFormDto } from "./dto/register-attendee-form.dto";
import { DirectivesModule } from "../../directives/directives.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        DirectivesModule
    ],
    declarations: [RegisterAttendeeFormComponent],
    exports: [RegisterAttendeeFormComponent],
    providers: [
        {
            provide: REGISTER_ATTENDEE_FORM_GENERATOR,
            useFactory: FormGeneratorFactory.transform(RegisterAttendeeFormDto),
            deps: [FormBuilder]
        }
    ]
})
export class RegisterAttendeeFormModule {
}
