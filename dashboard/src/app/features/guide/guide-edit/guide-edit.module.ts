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
import * as fromEditSection from "../guide-edit/components/edit-section/store/edit-section.reducer";
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
import { HotelFormComponent } from "./components/hotel-form/hotel-form.component";
import { HOTEL_FORM_GENERATOR } from "./components/hotel-form/hotel-form.constants";
import { HotelFormDto } from "./components/hotel-form/dto/hotel-form.dto";
import { SchoolFormComponent } from "./components/school-form/school-form.component";
import { SCHOOL_FORM_GENERATOR } from "./components/school-form/school-form.constants";
import { SchoolFormDto } from "./components/school-form/dto/school-form.dto";
import { PARKING_FORM_GENERATOR } from "./components/parking-form/parking-form.constants";
import { ParkingFormDto } from "./components/parking-form/dto/parking-form.dto";
import { ParkingFormComponent } from "./components/parking-form/parking-form.component";
import { EditSectionEffects } from "./components/edit-section/store/edit-section.effects";
import { MAP_FORM_GENERATOR } from "./components/map-form/map-form.constants";
import { MapFormComponent } from "./components/map-form/map-form.component";
import { RESTAURANT_FORM_GENERATOR } from "./components/restaurant-form/restaurant-form.constants";
import { RestaurantFormDto } from "./components/restaurant-form/dto/restaurant-form.dto";
import { RestaurantFormComponent } from "./components/restaurant-form/restaurant-form.component";

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
        EffectsModule.forFeature([GuideEditEffects, CreateSectionEffects, EditSectionEffects]),
        StoreModule.forFeature("guideCreateSection", fromSection.reducer),
        StoreModule.forFeature("guideEditSection", fromEditSection.reducer),
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
        BringFormComponent,
        HotelFormComponent,
        SchoolFormComponent,
        ParkingFormComponent,
        MapFormComponent,
        RestaurantFormComponent
    ],
    entryComponents: [
        CreateSectionComponent,
        EditSectionComponent,
        SectionFormComponent
    ],
    providers: [
        { 
            provide: SECTION_FORM_GENERATOR, 
            useFactory: FormGeneratorFactory.transform(SectionFormDto), 
            deps: [FormBuilder] 
        },
        {
            provide: HOTEL_FORM_GENERATOR,
            useFactory: FormGeneratorFactory.transform(HotelFormDto),
            deps: [FormBuilder]
        },
        {
            provide: SCHOOL_FORM_GENERATOR,
            useFactory: FormGeneratorFactory.transform(SchoolFormDto),
            deps: [FormBuilder]
        },
        {
            provide: PARKING_FORM_GENERATOR,
            useFactory: FormGeneratorFactory.transform(ParkingFormDto),
            deps: [FormBuilder]
        },
        {
            provide: MAP_FORM_GENERATOR,
            useFactory: FormGeneratorFactory.transform(SchoolFormDto),
            deps: [FormBuilder]
        },
        {
            provide: RESTAURANT_FORM_GENERATOR,
            useFactory: FormGeneratorFactory.transform(RestaurantFormDto),
            deps: [FormBuilder]
        }
    ]
})
export class GuideEditModule {}
