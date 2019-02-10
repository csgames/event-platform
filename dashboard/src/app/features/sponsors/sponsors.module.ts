import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { SponsorsRoutingModule } from "./sponsors-routing.module";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { SponsorsComponent } from "./sponsors.component";
import { StoreModule } from "@ngrx/store";
import * as fromSponsors from "./store/sponsors.reducer";
import { EffectsModule } from "@ngrx/effects";
import { SponsorsEffects } from "./store/sponsors.effects";
import { InfoSponsorComponent } from "./info-sponsor/info-sponsor.component";
import { SimpleModalModule } from "ngx-simple-modal";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        SponsorsRoutingModule,
        LoadingSpinnerModule,
        DirectivesModule,
        FlexLayoutModule,
        StoreModule.forFeature("sponsors", fromSponsors.reducer),
        EffectsModule.forFeature([SponsorsEffects]),
        SimpleModalModule
    ],
    declarations: [SponsorsComponent, InfoSponsorComponent],
    entryComponents: [SponsorsComponent, InfoSponsorComponent]
})
export class SponsorsModule { }
