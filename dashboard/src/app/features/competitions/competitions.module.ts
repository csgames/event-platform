import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { CompetitionsRoutingModule } from "./competitions-routing.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromCompetitions from "./store/competitions.reducer";
import * as fromInfoCompetition from "./components/info-competition/store/info-competition.reducer";
import { CompetitionsComponent } from "./competitions.component";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { TabsModule } from "ngx-bootstrap";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PipeModule } from "src/app/pipe/pipe.module";
import { SimpleModalModule } from "ngx-simple-modal";
import { CompetitionCardComponent } from "./components/competition-card/competition-card.component";
import { InfoCompetitionComponent } from "./components/info-competition/info-competition.component";
import { CompetitionsEffects } from "./store/competitions.effects";
import { InfoCompetitionEffects } from "./components/info-competition/store/info-competition.effects";
import { FormsModule } from "@angular/forms";
import { CompetitionModule } from "./components/competition/competition.module";
import { SubscriptionService } from "./components/competition-card/providers/subscription.service";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        CompetitionsRoutingModule,
        LoadingSpinnerModule,
        DirectivesModule,
        StoreModule.forFeature("competitions", fromCompetitions.reducer),
        StoreModule.forFeature("infoCompetition", fromInfoCompetition.reducer),
        EffectsModule.forFeature([CompetitionsEffects, InfoCompetitionEffects]),
        TabsModule.forRoot(),
        FlexLayoutModule,
        PipeModule,
        SimpleModalModule,
        FormsModule,
        CompetitionModule
    ],
    declarations: [CompetitionsComponent, InfoCompetitionComponent, CompetitionCardComponent],
    entryComponents: [CompetitionsComponent, InfoCompetitionComponent],
    exports: [CompetitionsComponent, InfoCompetitionComponent, CompetitionCardComponent],
    providers: [SubscriptionService]
})
export class CompetitionsModule { }
