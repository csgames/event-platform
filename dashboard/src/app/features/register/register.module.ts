import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoadingSpinnerModule } from "../../components/loading-spinner/loading-spinner.module";
import { TranslateModule } from "@ngx-translate/core";
import { StoreModule } from "@ngrx/store";
import * as fromRegister from "./store/register.reducer";
import { EffectsModule } from "@ngrx/effects";
import { RegisterEffects } from "./store/register.effects";
import { DirectivesModule } from "../../directives/directives.module";
import { UserFormModule } from "../../components/user-form/user-form.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule,
        LoadingSpinnerModule,
        TranslateModule,
        DirectivesModule,
        UserFormModule,
        StoreModule.forFeature("register", fromRegister.reducer),
        EffectsModule.forFeature([RegisterEffects])
    ],
    exports: [],
    declarations: [RegisterComponent],
    providers: []
})
export class RegisterModule {}
