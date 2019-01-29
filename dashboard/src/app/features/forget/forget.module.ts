import { NgModule } from "@angular/core";
import { ForgetComponent } from "./forget.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoadingSpinnerModule } from "../../components/loading-spinner/loading-spinner.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromForget from "./store/forget.reducer";
import { TranslateModule } from "@ngx-translate/core";
import { ForgetEffects } from "./store/forget.effects";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule,
        LoadingSpinnerModule,
        TranslateModule,
        StoreModule.forFeature("forget", fromForget.reducer),
        EffectsModule.forFeature([ForgetEffects]),
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    exports: [],
    declarations: [ForgetComponent],
    providers: []
})
export class ForgetModule {}
