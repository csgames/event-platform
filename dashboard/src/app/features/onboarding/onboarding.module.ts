import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import * as fromOnboarding from "./store/onboarding.reducer"
import { EffectsModule } from "@ngrx/effects";
import { OnboardingEffects } from "./store/onboarding.effects";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { OnboardingComponent } from "./onboarding.component";
import { StoreModule } from "@ngrx/store";
import { OnboardingRoutingModule } from "./onboarding-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
        OnboardingRoutingModule,
        StoreModule.forFeature("onboarding", fromOnboarding.reducer),
        EffectsModule.forFeature([OnboardingEffects]),
        LoadingSpinnerModule,
        DirectivesModule
    ],
    exports: [],
    declarations: [OnboardingComponent],
    providers: [OnboardingComponent]
})
export class OnboardingModule {}