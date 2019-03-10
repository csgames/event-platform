import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AttendeeViewModule } from "../../components/attendee-view/attendee-view.module";
import { LoadingSpinnerModule } from "../../components/loading-spinner/loading-spinner.module";
import { DirectivesModule } from "../../directives/directives.module";
import { FormGeneratorFactory } from "../../form-generator/factory";
import { AddAttendeeFormComponent } from "./components/add-attendee-form/add-attendee-form.component";
import { AddAttendeeFormDto } from "./components/add-attendee-form/dto/add-attendee-form.dto";
import { VolunteersEffects } from "./store/volunteers.effects";
import * as fromVolunteers from "./store/volunteers.reducer";
import { VolunteersRoutingModule } from "./volunteers-routing.module";
import { VolunteersComponent } from "./volunteers.component";
import { ADD_ATTENDEE_FORM_GENERATOR } from "./volunteers.constants";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        VolunteersRoutingModule,
        LoadingSpinnerModule,
        DirectivesModule,
        FlexLayoutModule,
        AttendeeViewModule,
        StoreModule.forFeature("volunteers", fromVolunteers.reducer),
        EffectsModule.forFeature([VolunteersEffects]),
    ],
    declarations: [VolunteersComponent, AddAttendeeFormComponent],
    entryComponents: [VolunteersComponent],
    providers: [
        { provide: ADD_ATTENDEE_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(AddAttendeeFormDto), deps: [FormBuilder] }
    ]
})
export class VolunteersModule { }
