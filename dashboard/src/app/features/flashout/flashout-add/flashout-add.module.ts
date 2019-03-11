import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { CollapseModule } from "ngx-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { DirectivesModule } from "src/app/directives/directives.module";
import { StoreModule } from "@ngrx/store";
import * as fromFlashoutAdd from "./store/flashout-add.reducer";
import { EffectsModule } from "@ngrx/effects";
import { FlashoutAddEffects } from "./store/flashout-add.effects";
import { FlashoutAddRoutingModule } from "./flashout-add-routing.module";
import { FlashoutAddComponent } from "./flashout-add.component";
import { ADD_FLASHOUT_FORM_GENERATOR } from "./flashout-add.constants";
import { FormGeneratorFactory } from "src/app/form-generator/factory";
import { AddFlashoutDto } from "./dto/add-flashout.dto";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        LoadingSpinnerModule,
        CollapseModule,
        NgSelectModule,
        DirectivesModule,
        StoreModule.forFeature("flashoutAdd", fromFlashoutAdd.reducer),
        EffectsModule.forFeature([FlashoutAddEffects]),
        FlashoutAddRoutingModule
    ],
    declarations: [FlashoutAddComponent],
    providers: [
        { provide: ADD_FLASHOUT_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(AddFlashoutDto), deps: [FormBuilder] }
    ]
})
export class FlashoutAddModule {}
