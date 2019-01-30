import { NgModule } from "@angular/core";
import { ForgetComponent } from "./forget.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoadingSpinnerModule } from "../../components/loading-spinner/loading-spinner.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromForget from "./store/forget.reducer";
import { TranslateModule } from "@ngx-translate/core";
import { ForgetEffects } from "./store/forget.effects";
import { ForgetFormComponent } from "./components/form/forget-form.component";
import { FORGET_FORM_GENERATOR } from "./forget.constants";
import { FormGeneratorFactory } from "src/app/form-generator/factory";
import { ForgetFormDto } from "./components/dto/forget-form-dto";
import { DirectivesModule } from "src/app/directives/directives.module";

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
        DirectivesModule
    ],
    exports: [],
    declarations: [ForgetComponent, ForgetFormComponent],
    providers: [
        { provide: FORGET_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(ForgetFormDto), deps: [FormBuilder] }
    ]
})
export class ForgetModule {}
