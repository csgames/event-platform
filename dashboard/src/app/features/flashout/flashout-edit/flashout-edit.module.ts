import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { CollapseModule } from "ngx-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { DirectivesModule } from "src/app/directives/directives.module";
import { StoreModule } from "@ngrx/store";
import * as fromFlashoutEdit from "./store/flashout-edit.reducer";
import { EffectsModule } from "@ngrx/effects";
import { FlashoutEditEffects } from "./store/flashout-edit.effects";
import { FlashoutEditRoutingModule } from "./flashout-edit-routing.module";
import { FlashoutEditComponent } from "./flashout-edit.component";
import { ADD_FLASHOUT_FORM_GENERATOR } from "./flashout-edit.constants";
import { FlashoutEditDto } from "./components/flashout-form/dto/flashout-edit.dto";
import { FormGeneratorFactory } from "../../../form-generator/factory";
import { FlashoutComponentModule } from "../components/flashout.component.module";
import { FlashoutFormComponent } from "./components/flashout-form/flashout-form.component";

@NgModule({
    imports: [
        CommonModule,
        FlashoutComponentModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        LoadingSpinnerModule,
        CollapseModule,
        NgSelectModule,
        DirectivesModule,
        StoreModule.forFeature("flashoutEdit", fromFlashoutEdit.reducer),
        EffectsModule.forFeature([FlashoutEditEffects]),
        FlashoutEditRoutingModule
    ],
    declarations: [FlashoutEditComponent, FlashoutFormComponent],
    providers: [
        { provide: ADD_FLASHOUT_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(FlashoutEditDto), deps: [FormBuilder] }
    ]
})
export class FlashoutEditModule {}
