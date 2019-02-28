import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PuzzleAdminRoutingModule } from "./puzzle-admin-routing.module";
import { RouterModule } from "@angular/router";
import { AccordionModule, PopoverModule } from "ngx-bootstrap";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { SimpleModalModule } from "ngx-simple-modal";
import { PuzzleAdminComponent } from "./puzzle-admin.component";
import { EditPuzzleHeroComponent } from "./components/edit-puzzle-hero/edit-puzzle-hero.component";
import { StoreModule } from "@ngrx/store";
import * as fromPuzzleAdmin from "./store/puzzle-admin.reducer";
import { EffectsModule } from "@ngrx/effects";
import { PuzzleAdminEffects } from "./store/puzzle-admin.effects";
import { PuzzleComponentsModule } from "../components/puzzle-components.module";

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
        LoadingSpinnerModule,
        PopoverModule,
        TranslateModule,
        SimpleModalModule,
        PuzzleComponentsModule,

        StoreModule.forFeature("puzzleHeroAdmin", fromPuzzleAdmin.reducer),
        EffectsModule.forFeature([PuzzleAdminEffects])
    ],
    exports: [],
    entryComponents: [EditPuzzleHeroComponent],
    declarations: [PuzzleAdminComponent, EditPuzzleHeroComponent],
    providers: []
})
export class PuzzleAdminModule {}
