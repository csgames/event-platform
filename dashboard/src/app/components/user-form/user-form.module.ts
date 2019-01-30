import { NgModule } from "@angular/core";
import { UserFormComponent } from "./user-form.component";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { FormGeneratorFactory } from "../../form-generator/factory";
import { USER_FORM_GENERATOR } from "./user-form.constants";
import { UserFormDto } from "./dto/user-form.dto";
import { DirectivesModule } from "../../directives/directives.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        DirectivesModule
    ],
    exports: [UserFormComponent],
    declarations: [UserFormComponent],
    providers: [
        { provide: USER_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(UserFormDto), deps: [FormBuilder] }
    ]
})
export class UserFormModule {}
