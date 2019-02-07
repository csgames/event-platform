import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { SponsorsRoutingModule } from "./sponsors-routing.module";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { SponsorsComponent } from "./sponsors.component";
import { StoreModule } from "@ngrx/store";
import * as fromSponsors from "./store/sponsors.reducer";
import { EffectsModule } from "@ngrx/effects";
import { SponsorsEffects } from "./store/sponsors.effects";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        SponsorsRoutingModule,
        LoadingSpinnerModule,
        DirectivesModule,
        StoreModule.forFeature("sponsors", fromSponsors.reducer),
        EffectsModule.forFeature([SponsorsEffects])
    ],
    declarations: [SponsorsComponent],
    entryComponents: [SponsorsComponent]
})
export class SponsorsModule { }