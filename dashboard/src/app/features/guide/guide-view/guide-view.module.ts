import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { GuideViewComponent } from "./guide-view.component";
import { StoreModule } from "@ngrx/store";
import * as fromGuide from "./store/guide.reducer";
import { EffectsModule } from "@ngrx/effects";
import { GuideEffects } from "./store/guide.effects";
import { PipeModule } from "src/app/pipe/pipe.module";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { FlexLayoutModule } from "@angular/flex-layout";
import { GuideViewRoutingModule } from "./guide-view-routing.module";
import { GuideAccordionModule } from "src/app/components/guide-accordion/accordion.module";
import { AgmCoreModule } from "@agm/core";
import { environment } from "src/environments/environment";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoadingSpinnerModule,
        StoreModule.forFeature("guide", fromGuide.reducer),
        EffectsModule.forFeature([GuideEffects]),
        PipeModule,
        FormsModule,
        PipeModule,
        ToastrModule,
        FlexLayoutModule,
        GuideViewRoutingModule,
        GuideAccordionModule,
        AgmCoreModule.forRoot({
            apiKey: environment.GOOGLE_MAPS_API_KEY
        })
    ],
    declarations: [GuideViewComponent]
})
export class GuideViewModule { }
