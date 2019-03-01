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
import { EffectsModule } from "@ngrx/effects";
import { PuzzleAdminEffects } from "./store/puzzle-admin.effects";
import { PuzzleComponentsModule } from "../components/puzzle-components.module";
import { TrackFormComponent } from "./components/track-form/track-form.component";
import { FormGeneratorFactory } from "../../../form-generator/factory";
import { TRACK_FORM_GENERATOR } from "./components/track-form/track-form.constants";
import { TrackFormDto } from "./components/track-form/dto/track-form.dto";
import { NgSelectModule } from "@ng-select/ng-select";
import { CreateTrackComponent } from "./components/create-track/create-track.component";
import { PipesModule } from "../../../pipes/pipes.module";
import { DirectivesModule } from "../../../directives/directives.module";
import { CreateTrackEffects } from "./components/create-track/store/create-track.effects";
import { UpdateTrackComponent } from "./components/update-track/update-track.component";
import { UpdateTrackEffects } from "./components/update-track/store/update-track.effects";

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
        PipesModule,

        StoreModule.forFeature("puzzleHeroAdmin", fromPuzzleAdmin.reducer),
        StoreModule.forFeature("puzzleHeroCreateTrack", fromCreateTrack.reducer),
        StoreModule.forFeature("puzzleHeroUpdateTrack", fromUpdateTrack.reducer),
        EffectsModule.forFeature([PuzzleAdminEffects, CreateTrackEffects, UpdateTrackEffects])
    ],
    exports: [],
    entryComponents: [EditPuzzleHeroComponent, CreateTrackComponent, UpdateTrackComponent],
    declarations: [PuzzleAdminComponent, EditPuzzleHeroComponent, TrackFormComponent, CreateTrackComponent, UpdateTrackComponent],
    providers: [
        { provide: TRACK_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(TrackFormDto), deps: [FormBuilder] }
    ]
})
export class PuzzleAdminModule {}
