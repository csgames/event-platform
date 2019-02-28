import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PuzzleAdminRoutingModule } from "./puzzle-admin-routing.module";
import { RouterModule } from "@angular/router";
import { AccordionModule, DatepickerModule, BsDatepickerModule } from "ngx-bootstrap";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { SimpleModalModule } from "ngx-simple-modal";
import { PuzzleAdminComponent } from "./puzzle-admin.component";
import { EditPuzzleHeroComponent } from "./components/edit-puzzle-hero/edit-puzzle-hero.component";
import { EditPuzzleHeroModule } from "./components/edit-puzzle-hero/edit-puzzle-hero.module";

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
        TranslateModule,
        SimpleModalModule,
        EditPuzzleHeroModule       
    ],
    exports: [],
    entryComponents: [EditPuzzleHeroComponent],
    declarations: [PuzzleAdminComponent],
    providers: []
})
export class PuzzleAdminModule {}
