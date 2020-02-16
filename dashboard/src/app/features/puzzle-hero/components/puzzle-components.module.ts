import { NgModule } from "@angular/core";
import { PuzzleTileComponent } from "./puzzle-tile/puzzle-tile.component";
import { TrackComponent } from "./track/track.component";
import { TrackDirective } from "./track/track.directive";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { TranslateModule } from "@ngx-translate/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { PopoverModule } from "ngx-bootstrap/popover";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "../../../directives/directives.module";
import { PipeModule } from "src/app/pipe/pipe.module";

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
        PipeModule,
        DirectivesModule
    ],
    exports: [PuzzleTileComponent, TrackComponent, TrackDirective],
    declarations: [PuzzleTileComponent, TrackComponent, TrackDirective],
    providers: []
})
export class PuzzleComponentsModule {}
