import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { SponsorViewRoutingModule } from "./sponsor-view-routing.module";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { SponsorViewComponent } from "./sponsor-view.component";
import { StoreModule } from "@ngrx/store";
import * as fromSponsors from "./store/sponsors-view.reducer";
import { EffectsModule } from "@ngrx/effects";
import { SponsorsViewEffects } from "./store/sponsors-view.effects";
import { SimpleModalModule } from "ngx-simple-modal";
import { SponsorComponentModule } from "../components/sponsor.component.module";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        SponsorViewRoutingModule,
        LoadingSpinnerModule,
        DirectivesModule,
        FlexLayoutModule,
        StoreModule.forFeature("sponsors", fromSponsors.reducer),
        EffectsModule.forFeature([SponsorsViewEffects]),
        SimpleModalModule,
        SponsorComponentModule
    ],
    declarations: [SponsorViewComponent]
})
export class SponsorViewModule { }
