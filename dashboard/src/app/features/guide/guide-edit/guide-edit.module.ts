import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { CollapseModule } from "ngx-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { DirectivesModule } from "src/app/directives/directives.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { GuideEditRoutingModule } from "./guide-edit-routing.module";
import { GuideEditComponent } from "./guide-edit.component";
import * as fromGuide from "./store/guide-edit.reducer";
import * as fromSection from "../guide-edit/components/create-section/store/create-section.reducer";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { GuideEditEffects } from "./store/guide-edit.effects";
import { GuideAccordionModule } from "src/app/components/guide-accordion/accordion.module";
import { AgmCoreModule } from "@agm/core";
import { environment } from "src/environments/environment";
import { CreateSectionComponent } from "./components/create-section/create-section.component";
import { SectionFormComponent } from "./components/section-form/section-form.component";
import { SimpleModalModule } from "ngx-simple-modal";
import { SECTION_FORM_GENERATOR } from "./components/section-form/section-form.constants";
import { FormGeneratorFactory } from "src/app/form-generator/factory";
import { SectionFormDto } from "./components/section-form/dto/section-form.dto";
import { CreateSectionEffects } from "./components/create-section/store/create-section.effets";
import { BringFormComponent } from "./components/bring-form/bring-form.component";
import { PipeModule } from "../../../pipe/pipe.module";
import { EditSectionComponent } from "./components/edit-section/edit-section.component";
import { CustomTextBoxModule } from "../../../components/custom-text-box/custom-text-box.module";

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
        GuideEditRoutingModule,
        FlexLayoutModule,
        StoreModule.forFeature("guideEdit", fromGuide.reducer),
        EffectsModule.forFeature([GuideEditEffects, CreateSectionEffects]),
        StoreModule.forFeature("guideCreateSection", fromSection.reducer),
        GuideAccordionModule,
        AgmCoreModule.forRoot({
            apiKey: environment.GOOGLE_MAPS_API_KEY
        }),
        SimpleModalModule,
        PipeModule,
        CustomTextBoxModule
    ],
    declarations: [
        GuideEditComponent,
        CreateSectionComponent,
        EditSectionComponent,
        SectionFormComponent,
        BringFormComponent
    ],
    entryComponents: [
        CreateSectionComponent,
        EditSectionComponent,
        SectionFormComponent
    ],
    providers: [
        { provide: SECTION_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(SectionFormDto), deps: [FormBuilder] }
    ]
})
export class GuideEditModule {}
