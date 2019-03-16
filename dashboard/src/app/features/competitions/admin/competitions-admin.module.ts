import { NgModule } from "@angular/core";
import { SimpleModalModule } from "ngx-simple-modal";
import { CompetitionsAdminComponent } from "./competitions-admin.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CompetitionsAdminRoutingModule } from "./competitions-admin-routing.module";
import { CompetitionFormModule } from "./components/competition-form/competition-form.module";
import { StoreModule } from "@ngrx/store";
import * as fromCompetitionAdmin from "./store/competition-admin.reducer";
import { CompetitionAdminEffects } from "./store/competition-admin.effects";
import { EffectsModule } from "@ngrx/effects";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { CompetitionAdminCardModule } from "./components/competition-card/competition-card.module";
import { DirectivesModule } from "../../../directives/directives.module";
import { EditCompetitionModule } from "./components/edit-competition/edit-competition.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        CompetitionFormModule,
        EditCompetitionModule,
        SimpleModalModule,
        StoreModule.forFeature("competitionsAdmin", fromCompetitionAdmin.reducer),
        EffectsModule.forFeature([CompetitionAdminEffects]),
        LoadingSpinnerModule,
        DirectivesModule,
        CompetitionsAdminRoutingModule,
        CompetitionAdminCardModule
    ],
    exports: [],
    declarations: [CompetitionsAdminComponent],
    providers: []
})
export class CompetitionsAdminModule {}
