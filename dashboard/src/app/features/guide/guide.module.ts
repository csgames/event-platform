import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { GuideRoutingModule } from "./guide-routing.module";
import { GuideComponent } from "./guide.component";
import { RouterModule } from "@angular/router";
import { GuideAccordionModule } from "../../components/guide-accordion/accordion.module";
import { AgmCoreModule } from "@agm/core";
import { StoreModule } from "@ngrx/store";
import { GuideEffects } from "./store/guide.effects";
import * as fromGuide from "./store/guide.reducer";
import { EffectsModule } from "@ngrx/effects";
import { environment } from "src/environments/environment";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        GuideRoutingModule,
        ReactiveFormsModule,
        TranslateModule,
        LoadingSpinnerModule,
        GuideAccordionModule,
        StoreModule.forFeature("guide", fromGuide.reducer),
        EffectsModule.forFeature([GuideEffects]),
        AgmCoreModule.forRoot({
            apiKey: environment.GOOGLE_MAPS_API_KEY
        })
    ],
    exports: [],
    declarations: [GuideComponent],
    providers: [],
    entryComponents: [GuideComponent]
})

export class GuideModule {}
