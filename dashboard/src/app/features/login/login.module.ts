import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoadingSpinnerModule } from "../../components/loading-spinner/loading-spinner.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { LoginEffects } from "./store/login.effects";
import * as fromLogin from "./store/login.reducer";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule,
        LoadingSpinnerModule,

        StoreModule.forFeature("login", fromLogin.reducer),
        EffectsModule.forFeature([LoginEffects])
    ],
    exports: [],
    declarations: [LoginComponent],
    providers: []
})
export class LoginModule {}
