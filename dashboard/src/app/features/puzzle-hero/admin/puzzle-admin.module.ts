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
import { EditPuzzleHeroComponent } from "./components/edit-puzzle-hero/edit-puzzle-hero.component";
import { StoreModule } from "@ngrx/store";
import * as fromPuzzleAdmin from "./store/puzzle-admin.reducer";
import * as fromCreateTrack from "./components/create-track/store/create-track.reducer";
import * as fromUpdateTrack from "./components/update-track/store/update-track.reducer";
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
import { PipesModule } from "../../../pipes/pipes.module";
import { DirectivesModule } from "../../../directives/directives.module";
import { CreateTrackEffects } from "./components/create-track/store/create-track.effects";
import { UpdateTrackComponent } from "./components/update-track/update-track.component";
import { UpdateTrackEffects } from "./components/update-track/store/update-track.effects";
import { PuzzleHeroSettingsComponent } from "./components/puzzle-hero-settings/puzzle-hero-settings.component";
import { PUZZLE_HERO_SETTINGS_FORM_GENERATOR } from "./components/puzzle-hero-settings/puzzle-hero-settings.constants";
import { PuzzleHeroSettingsDto } from "./components/puzzle-hero-settings/dto/puzzle-hero-settings.dto";
import { PuzzleHeroSettingsEffects } from "./components/puzzle-hero-settings/store/puzzle-hero-settings.effects";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        DirectivesModule,
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
        PipesModule,

        StoreModule.forFeature("puzzleHeroAdmin", fromPuzzleAdmin.reducer),
        StoreModule.forFeature("puzzleHeroCreateTrack", fromCreateTrack.reducer),
        StoreModule.forFeature("puzzleHeroUpdateTrack", fromUpdateTrack.reducer),
        StoreModule.forFeature("puzzleHeroSettings", fromPuzzleHeroSettings.reducer),
        EffectsModule.forFeature([PuzzleAdminEffects, CreateTrackEffects, UpdateTrackEffects, PuzzleHeroSettingsEffects])
    ],
    exports: [],
    entryComponents: [EditPuzzleHeroComponent, CreateTrackComponent, UpdateTrackComponent, PuzzleHeroSettingsComponent],
    declarations: [
        PuzzleAdminComponent,
        EditPuzzleHeroComponent,
        TrackFormComponent,
        CreateTrackComponent,
        UpdateTrackComponent,
        PuzzleHeroSettingsComponent
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
