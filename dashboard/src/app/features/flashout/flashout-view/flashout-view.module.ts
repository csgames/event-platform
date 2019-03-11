import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FlashoutRoutingModule } from "../flashout-routing.module";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { FlashoutViewComponent } from "./flashout-view.component";
import { StoreModule } from "@ngrx/store";
import * as fromFlashout from "./store/flashout.reducer";
import { EffectsModule } from "@ngrx/effects";
import { FlashoutEffects } from "./store/flashout.effects";
import { PipeModule } from "src/app/pipe/pipe.module";
import { FormsModule } from "@angular/forms";
import { RatingModule } from "ngx-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FlashoutRoutingModule,
        LoadingSpinnerModule,
        DirectivesModule,
        StoreModule.forFeature("flashout", fromFlashout.reducer),
        EffectsModule.forFeature([FlashoutEffects]),
        PipeModule,
        FormsModule,
        RatingModule.forRoot(),
        PipeModule,
        ToastrModule,
        FlexLayoutModule
    ],
    declarations: [FlashoutViewComponent]
})
export class FlashoutViewModule { }
