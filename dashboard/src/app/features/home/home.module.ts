import { NgModule } from "@angular/core";

import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { TracksModule } from "../puzzle-hero/tracks/tracks.module";
import { ScheduleModule } from "../schedule/schedule.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CompetitionsModule } from "../competitions/competitions.module";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        TranslateModule,
        LoadingSpinnerModule,
        TracksModule,
        ScheduleModule,
        FlexLayoutModule,
        CompetitionsModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule {}
