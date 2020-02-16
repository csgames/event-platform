import { NgModule } from "@angular/core";
import { SimpleModalModule } from "ngx-simple-modal";
import { CompetitionsAdminComponent } from "./competitions-admin.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";
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
import { TabsModule } from "ngx-bootstrap/tabs";
import { EventResultsComponent } from "./components/event-results/event-results.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PipeModule } from "../../../pipe/pipe.module";
import { NgSelectModule } from "@ng-select/ng-select";
import * as fromCompetitionSettings from "./components/competition-settings/store/competition-settings.reducer";
import { CompetitionSettingsEffects } from "./components/competition-settings/store/competition-settings.effects";
import { CompetitionSettingsComponent } from "./components/competition-settings/competition-settings.components";
import { COMPETITIONS_SETTINGS_FORM_GENERATOR } from "./components/competition-settings/competition-settings.constants";
import { FormGeneratorFactory } from "src/app/form-generator/factory";
import { CompetitionSettingsDto } from "./components/competition-settings/dto/competition-settings.dto";

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
        StoreModule.forFeature("competitionSettings", fromCompetitionSettings.reducer),
        EffectsModule.forFeature([CompetitionAdminEffects]),
        EffectsModule.forFeature([CompetitionSettingsEffects]),
        LoadingSpinnerModule,
        DirectivesModule,
        CompetitionsAdminRoutingModule,
        CompetitionAdminCardModule,
        NgSelectModule,
        TabsModule,
        PipeModule,
        FlexLayoutModule
    ],
    exports: [],
    declarations: [CompetitionsAdminComponent, EventResultsComponent, CompetitionSettingsComponent],
    entryComponents: [CompetitionSettingsComponent],
    providers: [
        {
            provide: COMPETITIONS_SETTINGS_FORM_GENERATOR,
            useFactory: FormGeneratorFactory.transform(CompetitionSettingsDto),
            deps: [FormBuilder]
        }
    ]
})
export class CompetitionsAdminModule {}
