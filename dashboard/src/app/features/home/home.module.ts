import { NgModule } from "@angular/core";

import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { StoreModule } from "@ngrx/store";
import * as fromTracks from "../puzzle-hero/tracks/store/tracks.reducer";
import * as fromSchedule from "../schedule/store/schedule.reducer";
import { EffectsModule } from "@ngrx/effects";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { TracksModule } from "../puzzle-hero/tracks/tracks.module";
import { ScheduleModule } from "../schedule/schedule.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        TranslateModule,
        LoadingSpinnerModule,
        TracksModule,
        ScheduleModule,
        FlexLayoutModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule {}
