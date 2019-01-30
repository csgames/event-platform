import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";
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
import { DirectivesModule } from "src/app/directives/directives.module";
import { RESET_FORM_GENERATOR } from "./reset.constants";
import { FormGeneratorFactory } from "src/app/form-generator/factory";
import { ResetFormDto } from "./dto/reset-form-dto";

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
        EffectsModule.forFeature([ResetEffects]),
        DirectivesModule
    ],
    exports: [],
    declarations: [ResetComponent],
    providers: [
        { provide: RESET_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(ResetFormDto), deps: [FormBuilder] }
    ]
})
export class ResetModule {}