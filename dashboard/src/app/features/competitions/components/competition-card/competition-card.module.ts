import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./store/competition-card.reducer";
import { EffectsModule } from "@ngrx/effects";
import { CompetitionCardEffects } from "./store/competition-card.effects";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { CompetitionCardComponent } from "./competition-card.component";
import { SubscriptionService } from "./providers/subscription.service";
import { PipeModule } from "src/app/pipe/pipe.module";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature("competitionCard", reducer),
        EffectsModule.forFeature([CompetitionCardEffects]),
        LoadingSpinnerModule,
        FlexLayoutModule,
        PipeModule,
        TranslateModule
    ],
    declarations: [],
    entryComponents: [CompetitionCardComponent],
    providers: [SubscriptionService]
})
export class CompetitionCardModule {}
