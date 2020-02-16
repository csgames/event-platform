import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { CompetitionsListRoutingModule } from "./competitions-list-routing.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromCompetitions from "./store/competitions-list.reducer";
import * as fromInfoCompetition from "./components/info-competition/store/info-competition.reducer";
import { CompetitionsListComponent } from "./competitions-list.component";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { TabsModule } from "ngx-bootstrap/tabs";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PipeModule } from "src/app/pipe/pipe.module";
import { SimpleModalModule } from "ngx-simple-modal";
import { CompetitionCardComponent } from "./components/competition-card/competition-card.component";
import { InfoCompetitionComponent } from "./components/info-competition/info-competition.component";
import { CompetitionsListEffects } from "./store/competitions-list.effects";
import { InfoCompetitionEffects } from "./components/info-competition/store/info-competition.effects";
import { FormsModule } from "@angular/forms";
import { CompetitionModule } from "./components/competition/competition.module";
import { SubscriptionService } from "./components/competition-card/providers/subscription.service";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        CompetitionsListRoutingModule,
        LoadingSpinnerModule,
        DirectivesModule,
        StoreModule.forFeature("competitionsList", fromCompetitions.reducer),
        StoreModule.forFeature("infoCompetition", fromInfoCompetition.reducer),
        EffectsModule.forFeature([CompetitionsListEffects, InfoCompetitionEffects]),
        TabsModule.forRoot(),
        FlexLayoutModule,
        PipeModule,
        SimpleModalModule,
        FormsModule,
        CompetitionModule
    ],
    declarations: [CompetitionsListComponent, InfoCompetitionComponent, CompetitionCardComponent],
    entryComponents: [CompetitionsListComponent, InfoCompetitionComponent],
    providers: [SubscriptionService],
    exports: [CompetitionCardComponent]
})
export class CompetitionsListModule {}
