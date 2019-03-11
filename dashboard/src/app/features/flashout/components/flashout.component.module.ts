import { NgModule } from "@angular/core";

import { FlashoutCardComponent } from "./flashout-card/flashout-card.component";
import { CommonModule } from "@angular/common";
import { YoutubePlayerModule } from "ngx-youtube-player";
import { RatingModule } from "ngx-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        YoutubePlayerModule,
        RatingModule.forRoot(),
        FlexLayoutModule,
        LoadingSpinnerModule
    ],
    declarations: [FlashoutCardComponent],
    exports: [FlashoutCardComponent]
})
export class FlashoutComponentModule {
}
