import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./store/info-activity.reducer";
import { EffectsModule } from "@ngrx/effects";
import { InfoActivityEffects } from "./store/info-activity.effects";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { InfoActivityComponent } from "./info-activity.component";
import { SubscriptionService } from "./providers/subscription.service";
import { PipeModule } from "src/app/pipe/pipe.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature("infoActivity", reducer),
        EffectsModule.forFeature([InfoActivityEffects]),
        LoadingSpinnerModule,
        PipeModule,
        TranslateModule
    ],
    declarations: [InfoActivityComponent],
    entryComponents: [InfoActivityComponent],
    providers: [SubscriptionService]
})
export class InfoActivityModule { }