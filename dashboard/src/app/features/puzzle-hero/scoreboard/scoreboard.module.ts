import { NgModule } from "@angular/core";
import { ScoreboardComponent } from "./scoreboard.component";
import { CommonModule } from "@angular/common";
import { ScoreboardRoutingModule } from "./scoreboard-routing.module";
import { LineChartModule } from "@swimlane/ngx-charts";
import { ScoreGraphComponent } from "./components/score-graph/score-graph.component";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { ScoreTableComponent } from "./components/score-table/score-table.component";
import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import * as fromScoreboard from "./store/scoreboard.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ScoreboardEffects } from "./store/scoreboard.effects";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ScoreboardRoutingModule,
        TranslateModule,
        LineChartModule,
        LoadingSpinnerModule,
        StoreModule.forFeature("puzzleHeroScoreboard", fromScoreboard.reducer),
        EffectsModule.forFeature([ScoreboardEffects])
    ],
    exports: [],
    declarations: [ScoreboardComponent, ScoreGraphComponent, ScoreTableComponent],
    providers: []
})
export class ScoreboardModule {}
