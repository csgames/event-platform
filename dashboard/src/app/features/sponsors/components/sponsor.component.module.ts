import { NgModule } from "@angular/core";
import { SponsorTierComponent } from "./sponsor-tier/sponsor-tier.component";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { FormsModule, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { InfoSponsorComponent } from "./info-sponsor/info-sponsor.component";
import { SimpleModalModule } from "ngx-simple-modal";
import { ADD_SPONSOR_FORM_GENERATOR } from "../sponsor-edit/sponsor-edit.constants";
import { FormGeneratorFactory } from "src/app/form-generator/factory";
import { SponsorFormComponent } from "./sponsor-form/sponsor-form.component";
import { CustomTextBoxModule } from "src/app/components/custom-text-box/custom-text-box.module";
import { SponsorInfoDto } from "./sponsor-form/dto/sponsor-info.dto";
import { UpdateSponsorInfoComponent } from "./update-sponsor-info/update-sponsor-info.component";
import { UpdateSponsorInfoEffects } from "./update-sponsor-info/store/update-sponsor-info.effects";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromUpdateSponsorInfo from "./update-sponsor-info/store/update-sponsor-info.reducer";
import { SponsorPositionningDto } from "./sponsor-positionning-form/dto/sponsor-positionning.dto";
import { UPDATE_SPONSOR_POSITIONNING_FORM_GENERATOR } from "./sponsor-positionning-form/sponsor-positionning-form.constants";
import { SponsorPositionningFormComponent } from "./sponsor-positionning-form/sponsor-positionning-form.component";
import { UpdateSponsorPositionningComponent } from "./update-sponsor-positionning/update-sponsor-positionning.component";
import { UpdateSponsorPositionningEffects } from "./update-sponsor-positionning/store/update-sponsor-positionning.effects";
import * as fromUpdateSponsorPositionning from "./update-sponsor-positionning/store/update-sponsor-positionning.reducer";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FlexLayoutModule,
        LoadingSpinnerModule,
        DirectivesModule,
        FormsModule,
        SimpleModalModule,
        ReactiveFormsModule,
        CustomTextBoxModule,
        StoreModule.forFeature("updateSponsorInfo", fromUpdateSponsorInfo.reducer),
        EffectsModule.forFeature([UpdateSponsorInfoEffects]),
        StoreModule.forFeature("updateSponsorPositionning", fromUpdateSponsorPositionning.reducer),
        EffectsModule.forFeature([UpdateSponsorPositionningEffects])
    ],
    declarations: [
        SponsorTierComponent,
        InfoSponsorComponent,
        SponsorFormComponent,
        UpdateSponsorInfoComponent,
        SponsorPositionningFormComponent,
        UpdateSponsorPositionningComponent
    ],
    exports: [
        SponsorTierComponent,
        SponsorFormComponent
    ],
    entryComponents: [
        InfoSponsorComponent,
        UpdateSponsorInfoComponent,
        UpdateSponsorPositionningComponent        
    ],
    providers: [
        {
            provide: ADD_SPONSOR_FORM_GENERATOR,
            useFactory: FormGeneratorFactory.transform(SponsorInfoDto),
            deps: [FormBuilder]
        },
        {
            provide: UPDATE_SPONSOR_POSITIONNING_FORM_GENERATOR,
            useFactory: FormGeneratorFactory.transform(SponsorPositionningDto),
            deps: [FormBuilder]
        }
    ]
})
export class SponsorComponentModule {}
