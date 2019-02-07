import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { reducer } from "./store/change-password.reducer";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ChangePasswordEffects } from "./store/change-password.effects";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { ChangePasswordComponent } from "./change-password.component";
import { UserService } from "./providers/user.service";
import { CHANGE_PASSWORD_GENERATOR } from "./change-password.constants";
import { FormGeneratorFactory } from "src/app/form-generator/factory";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DirectivesModule } from "src/app/directives/directives.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        StoreModule.forFeature("changePassword", reducer),
        EffectsModule.forFeature([ChangePasswordEffects]),
        TranslateModule,
        LoadingSpinnerModule,
        DirectivesModule
    ],
    declarations: [ChangePasswordComponent],
    entryComponents: [ChangePasswordComponent],
    providers: [
        UserService,
        { provide: CHANGE_PASSWORD_GENERATOR, useFactory: FormGeneratorFactory.transform(ChangePasswordDto), deps: [FormBuilder] }
    ]
})
export class ChangePasswordModule { }