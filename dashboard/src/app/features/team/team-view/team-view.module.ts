import { NgModule } from "@angular/core";
import { TeamViewComponent } from "./team-view.component";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { GravatarModule } from "ngx-gravatar";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { DirectivesModule } from "../../../directives/directives.module";
import { TooltipModule } from "ngx-bootstrap";
import * as fromTeam from "./store/team-view.reducer";
import { TeamViewEffects } from "./store/team-view.effects";
import { AddAttendeeFormComponent } from "./components/add-attendee-form/add-attendee-form.component";
import { ADD_ATTENDEE_FORM_GENERATOR } from "./team-view.constants";
import { FormGeneratorFactory } from "../../../form-generator/factory";
import { AddAttendeeFormDto } from "./components/add-attendee-form/dto/add-attendee-form.dto";
import { AttendeeViewModule } from "../../../components/attendee-view/attendee-view.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        FlexLayoutModule,
        StoreModule.forFeature("teamView", fromTeam.reducer),
        EffectsModule.forFeature([TeamViewEffects]),
        GravatarModule,
        LoadingSpinnerModule,
        AttendeeViewModule,
        DirectivesModule,
        TooltipModule
    ],
    exports: [TeamViewComponent],
    declarations: [TeamViewComponent, AddAttendeeFormComponent],
    providers: [
        { provide: ADD_ATTENDEE_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(AddAttendeeFormDto), deps: [FormBuilder] }
    ]
})
export class TeamViewModule {}
