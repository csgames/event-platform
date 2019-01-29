import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { TranslateModule } from "@ngx-translate/core";
import { StoreModule } from "@ngrx/store";
import * as fromReset from "./store/reset.reducer";
import { ResetEffects } from "./store/reset.effects";
import { ResetComponent } from "./reset.component";
import { EffectsModule } from "@ngrx/effects";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule,
        LoadingSpinnerModule,
        TranslateModule,
        StoreModule.forFeature('reset', fromReset.reducer),
        EffectsModule.forFeature([ResetEffects])
    ],
    exports: [],
    declarations: [ResetComponent],
    providers: []
})
export class ResetModule {}