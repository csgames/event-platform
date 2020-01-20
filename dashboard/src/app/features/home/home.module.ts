import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { TracksModule } from "../puzzle-hero/tracks/tracks.module";
import { ScheduleModule } from "../schedule/schedule.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PuzzleHeroModule } from "../puzzle-hero/puzzle-hero.module";
import { PuzzleComponentsModule } from "../puzzle-hero/components/puzzle-components.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { CompetitionsListModule } from "../competitions/list/competitions-list.module";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        TranslateModule,
        LoadingSpinnerModule,
        TracksModule,
        ScheduleModule,
        FlexLayoutModule,
        CompetitionsListModule,
        PuzzleHeroModule,
        PuzzleComponentsModule,
        DirectivesModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule {}
