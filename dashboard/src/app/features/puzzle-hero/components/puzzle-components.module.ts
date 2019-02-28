import { NgModule } from "@angular/core";
import { PuzzleTileComponent } from "./puzzle-tile/puzzle-tile.component";
import { TrackComponent } from "./track/track.component";
import { TrackDirective } from "./track/track.directive";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { TranslateModule } from "@ngx-translate/core";
import { AccordionModule, PopoverModule } from "ngx-bootstrap";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        NgxGraphModule,
        TranslateModule,
        AccordionModule,
        FlexLayoutModule,
        LoadingSpinnerModule,
        PopoverModule,
        TranslateModule,
    ],
    exports: [PuzzleTileComponent, TrackComponent, TrackDirective],
    declarations: [PuzzleTileComponent, TrackComponent, TrackDirective],
    providers: []
})
export class PuzzleComponentsModule {}
