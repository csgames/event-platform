import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PuzzleAdminRoutingModule } from "./puzzle-admin-routing.module";
import { RouterModule } from "@angular/router";
import { AccordionModule, DatepickerModule, AlertModule, BsDatepickerModule, PopoverModule, TimepickerModule } from "ngx-bootstrap";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { SimpleModalModule } from "ngx-simple-modal";
import { PuzzleAdminComponent } from "./puzzle-admin.component";
import { UpdatePuzzleHeroComponent } from "./components/update-puzzle-hero/update-puzzle-hero.component";
import { CreatePuzzleHeroComponent } from "./components/create-puzzle-hero/create-puzzle-hero.component";
import { StoreModule } from "@ngrx/store";
import * as fromPuzzleAdmin from "./store/puzzle-admin.reducer";
import * as fromCreateTrack from "./components/create-track/store/create-track.reducer";
import * as fromUpdateTrack from "./components/update-track/store/update-track.reducer";
import * as fromUpdatePuzzle from "./components/update-puzzle-hero/store/update-puzzle-hero.reducer";
import * as fromCreatePuzzle from "./components/create-puzzle-hero/store/create-puzzle-hero.reducer";
import * as fromPuzzleHeroSettings from "./components/puzzle-hero-settings/store/puzzle-hero-settings.reducer";
import { EffectsModule } from "@ngrx/effects";
import { PuzzleAdminEffects } from "./store/puzzle-admin.effects";
import { PuzzleComponentsModule } from "../components/puzzle-components.module";
import { TrackFormComponent } from "./components/track-form/track-form.component";
import { FormGeneratorFactory } from "../../../form-generator/factory";
import { TRACK_FORM_GENERATOR } from "./components/track-form/track-form.constants";
import { TrackFormDto } from "./components/track-form/dto/track-form.dto";
import { NgSelectModule } from "@ng-select/ng-select";
import { CreateTrackComponent } from "./components/create-track/create-track.component";
import { CustomTextBoxModule } from "src/app/components/custom-text-box/custom-text-box.module";
import { CreateTrackEffects } from "./components/create-track/store/create-track.effects";
import { CreatePuzzleEffects } from "./components/create-puzzle-hero/store/create-puzzle-hero.effects";
import { UpdateTrackComponent } from "./components/update-track/update-track.component";
import { UpdateTrackEffects } from "./components/update-track/store/update-track.effects";
import { UpdatePuzzleEffects } from "./components/update-puzzle-hero/store/update-puzzle-hero.effects";
import { PuzzleHeroSettingsComponent } from "./components/puzzle-hero-settings/puzzle-hero-settings.component";
import { PUZZLE_HERO_SETTINGS_FORM_GENERATOR } from "./components/puzzle-hero-settings/puzzle-hero-settings.constants";
import { PuzzleHeroSettingsDto } from "./components/puzzle-hero-settings/dto/puzzle-hero-settings.dto";
import { PuzzleHeroSettingsEffects } from "./components/puzzle-hero-settings/store/puzzle-hero-settings.effects";
import { DirectivesModule } from "../../../directives/directives.module";
import { QuestionFormModule } from "../../../components/question-form/question-form.module";
import { AnswersComponent } from "./components/answers/answers.component";
import { PipeModule } from "src/app/pipe/pipe.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        PuzzleAdminRoutingModule,
        NgxGraphModule,
        AccordionModule,
        FlexLayoutModule,
        AlertModule,
        LoadingSpinnerModule,
        PopoverModule,
        TranslateModule,
        SimpleModalModule,
        PuzzleComponentsModule,
        NgSelectModule,
        DatepickerModule,
        BsDatepickerModule,
        TimepickerModule,
        CustomTextBoxModule,
        PipeModule,
        DirectivesModule,
        QuestionFormModule,
        StoreModule.forFeature("puzzleHeroAdmin", fromPuzzleAdmin.reducer),
        StoreModule.forFeature("puzzleHeroCreateTrack", fromCreateTrack.reducer),
        StoreModule.forFeature("puzzleHeroUpdateTrack", fromUpdateTrack.reducer),
        StoreModule.forFeature("puzzleHeroCreatePuzzle", fromCreatePuzzle.reducer),
        StoreModule.forFeature("puzzleHeroUpdatePuzzle", fromUpdatePuzzle.reducer),
        StoreModule.forFeature("puzzleHeroSettings", fromPuzzleHeroSettings.reducer),
        EffectsModule.forFeature([
            PuzzleAdminEffects,
            CreateTrackEffects,
            UpdateTrackEffects,
            CreatePuzzleEffects,
            UpdatePuzzleEffects,
            PuzzleHeroSettingsEffects
        ])
    ],
    exports: [],
    entryComponents: [
        UpdatePuzzleHeroComponent,
        CreatePuzzleHeroComponent,
        CreateTrackComponent,
        UpdateTrackComponent,
        PuzzleHeroSettingsComponent,
        AnswersComponent
    ],
    declarations: [
        PuzzleAdminComponent,
        UpdatePuzzleHeroComponent,
        CreatePuzzleHeroComponent,
        TrackFormComponent,
        CreateTrackComponent,
        UpdateTrackComponent,
        PuzzleHeroSettingsComponent,
        AnswersComponent
    ],
    providers: [
        { provide: TRACK_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(TrackFormDto), deps: [FormBuilder] },
        {
            provide: PUZZLE_HERO_SETTINGS_FORM_GENERATOR,
            useFactory: FormGeneratorFactory.transform(PuzzleHeroSettingsDto),
            deps: [FormBuilder]
        }
    ]
})
export class PuzzleAdminModule {}
