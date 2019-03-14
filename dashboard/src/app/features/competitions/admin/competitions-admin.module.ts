import { NgModule } from "@angular/core";

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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        CompetitionFormModule,
        StoreModule.forFeature("competitionsAdmin", fromCompetitionAdmin.reducer),
        EffectsModule.forFeature([CompetitionAdminEffects]),

        CompetitionsAdminRoutingModule
    ],
    exports: [],
    declarations: [CompetitionsAdminComponent],
    providers: []
})
export class CompetitionsAdminModule {}
