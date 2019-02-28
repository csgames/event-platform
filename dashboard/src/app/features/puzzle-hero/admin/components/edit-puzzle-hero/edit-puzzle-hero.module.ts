import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AccordionModule, DatepickerModule, BsDatepickerModule, TimepickerModule } from "ngx-bootstrap";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { SimpleModalModule } from "ngx-simple-modal";
import { EditPuzzleHeroComponent } from "./edit-puzzle-hero.component";
import { NgSelectModule } from "@ng-select/ng-select";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxGraphModule,
        AccordionModule,
        NgSelectModule,
        FlexLayoutModule,
        TranslateModule,
        SimpleModalModule,
        DatepickerModule,
        BsDatepickerModule,
        TimepickerModule 
    ],
    exports: [EditPuzzleHeroComponent],
    entryComponents: [],
    declarations: [EditPuzzleHeroComponent],
    providers: []
})
export class EditPuzzleHeroModule {}
