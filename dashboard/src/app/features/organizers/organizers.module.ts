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
import { ADD_ATTENDEE_FORM_GENERATOR } from "./organizers.constants";
import { OrganizersEffects } from "./store/organizers.effects";
import * as fromOrganizers from "./store/organizers.reducer";
import { OrganizersRoutingModule } from "./organizers-routing.module";
import { OrganizersComponent } from "./organizers.component";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        OrganizersRoutingModule,
        LoadingSpinnerModule,
        DirectivesModule,
        FlexLayoutModule,
        AttendeeViewModule,
        StoreModule.forFeature("organizers", fromOrganizers.reducer),
        EffectsModule.forFeature([OrganizersEffects]),
    ],
    declarations: [OrganizersComponent, AddAttendeeFormComponent],
    entryComponents: [OrganizersComponent],
    providers: [
        { provide: ADD_ATTENDEE_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(AddAttendeeFormDto), deps: [FormBuilder] }
    ]
})
export class OrganizersModule { }
