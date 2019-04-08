import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SponsorComponentModule } from "../components/sponsor.component.module";
import { SponsorEditComponent } from "./sponsor-edit.component";
import { DirectivesModule } from "src/app/directives/directives.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { CollapseModule } from "ngx-bootstrap";
import { SponsorEditRoutingModule } from "./sponsor-edit-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { StoreModule } from "@ngrx/store";
import * as fromSponsorEdit from "./store/sponsor-edit.reducer";
import { EffectsModule } from "@ngrx/effects";
import { SponsorEditEffects } from "./store/sponsor-edit.effects";

@NgModule({
    imports: [
        CommonModule,
        SponsorComponentModule,
        FormsModule,
        DirectivesModule,
        ReactiveFormsModule,
        TranslateModule,
        LoadingSpinnerModule,
        CollapseModule,
        NgSelectModule,
        SponsorEditRoutingModule,
        FlexLayoutModule,
        StoreModule.forFeature("sponsorEdit", fromSponsorEdit.reducer),
        EffectsModule.forFeature([SponsorEditEffects]),
        SponsorComponentModule
    ],
    declarations: [
        SponsorEditComponent
    ]
})
export class SponsorEditModule {}
