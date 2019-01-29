import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register.component";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoadingSpinnerModule } from "../../components/loading-spinner/loading-spinner.module";
import { StoreModule } from "@ngrx/store";
import * as fromRegister from "./store/register.reducer";
import { EffectsModule } from "@ngrx/effects";
import { RegisterEffects } from "./store/register.effects";
import { RegisterFormComponent } from "./components/form/register-form.component";
import { REGISTER_FORM_GENERATOR } from "./register.contants";
import { FormGeneratorFactory } from "../../form-generator/factory";
import { CreateAttendeeFormDto } from "./dto/create-attendee-form-dto";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule,
        LoadingSpinnerModule,
        StoreModule.forFeature("register", fromRegister.reducer),
        EffectsModule.forFeature([RegisterEffects])
    ],
    exports: [],
    declarations: [RegisterComponent, RegisterFormComponent],
    providers: [
        { provide: REGISTER_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(CreateAttendeeFormDto), deps: [FormBuilder] }
    ]
})
export class RegisterModule {}
