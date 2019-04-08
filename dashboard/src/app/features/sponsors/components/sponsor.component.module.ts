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
import { AddSponsorFormDto } from "./sponsor-form/dto/add-sponsor.dto";
import { SponsorFormComponent } from "./sponsor-form/sponsor-form.component";
import { CustomTextBoxModule } from "src/app/components/custom-text-box/custom-text-box.module";

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
        CustomTextBoxModule
    ],
    declarations: [SponsorTierComponent, InfoSponsorComponent, SponsorFormComponent],
    exports: [SponsorTierComponent],
    entryComponents: [InfoSponsorComponent],
    providers: [
        { provide: ADD_SPONSOR_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(AddSponsorFormDto), deps: [FormBuilder] }
    ]
})
export class SponsorComponentModule {}
