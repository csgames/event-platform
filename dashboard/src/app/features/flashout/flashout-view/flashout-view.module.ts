import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { FlashoutViewComponent } from "./flashout-view.component";
import { StoreModule } from "@ngrx/store";
import * as fromFlashout from "./store/flashout.reducer";
import { EffectsModule } from "@ngrx/effects";
import { FlashoutEffects } from "./store/flashout.effects";
import { PipeModule } from "src/app/pipe/pipe.module";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FlashoutViewRoutingModule } from "./flashout-view-routing.module";
import { FlashoutComponentModule } from "../components/flashout.component.module";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoadingSpinnerModule,
        FlashoutComponentModule,
        StoreModule.forFeature("flashout", fromFlashout.reducer),
        EffectsModule.forFeature([FlashoutEffects]),
        PipeModule,
        FormsModule,
        PipeModule,
        ToastrModule,
        FlexLayoutModule,
        FlashoutViewRoutingModule
    ],
    declarations: [FlashoutViewComponent]
})
export class FlashoutViewModule { }
