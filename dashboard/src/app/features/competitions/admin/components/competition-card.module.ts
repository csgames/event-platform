import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { CompetitionsAdminRoutingModule } from "../competitions-admin-routing.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromCompetitionsAdmin from "../store/competition-admin.reducer";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { TabsModule } from "ngx-bootstrap";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PipeModule } from "src/app/pipe/pipe.module";
import { CompetitionCardComponent } from "../components/competition-card.component";
import { CompetitionAdminEffects } from "../store/competition-admin.effects";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoadingSpinnerModule,
        DirectivesModule,
        TabsModule.forRoot(),
        FlexLayoutModule,
        PipeModule
    ],
    declarations: [CompetitionCardComponent],    
    exports: [CompetitionCardComponent]
})
export class CompetitionAdminCardModule { }
