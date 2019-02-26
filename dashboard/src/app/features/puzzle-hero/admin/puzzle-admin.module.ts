import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PuzzleAdminRoutingModule } from "./puzzle-admin-routing.module";
import { RouterModule } from "@angular/router";
import { AccordionModule } from "ngx-bootstrap";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { SimpleModalModule } from "ngx-simple-modal";
import { PuzzleAdminComponent } from "./puzzle-admin.component";

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
        SimpleModalModule
    ],
    exports: [],
    // entryComponents: [PuzzleAdminComponent],
    declarations: [PuzzleAdminComponent],
    providers: []
})
export class PuzzleAdminModule {}
