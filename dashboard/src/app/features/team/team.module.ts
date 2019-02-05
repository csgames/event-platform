import { NgModule } from "@angular/core";
import { TeamComponent } from "./team.component";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TeamRoutingModule } from "./team-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { AttendeeComponent } from "./attendee/attendee.component";
import { StoreModule } from "@ngrx/store";
import * as fromTeam from "./store/team.reducer";
import { EffectsModule } from "@ngrx/effects";
import { TeamEffects } from "./store/team.effects";
import { GravatarModule } from "ngx-gravatar";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { TooltipModule } from "ngx-bootstrap";
import { AddAttendeeFormComponent } from "./add-attendee-form/add-attendee-form.component";
import { FormGeneratorFactory } from "../../form-generator/factory";
import { ADD_ATTENDEE_FORM_GENERATOR } from "./team.constants";
import { AddAttendeeFormDto } from "./add-attendee-form/dto/add-attendee-form.dto";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
        TeamRoutingModule,
        StoreModule.forFeature("team", fromTeam.reducer),
        EffectsModule.forFeature([TeamEffects]),
        GravatarModule,
        LoadingSpinnerModule,
        DirectivesModule,
        TooltipModule
    ],
    exports: [],
    declarations: [TeamComponent, AttendeeComponent, AddAttendeeFormComponent],
    providers: [
        { provide: ADD_ATTENDEE_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(AddAttendeeFormDto), deps: [FormBuilder] }
    ]
})
export class TeamModule {}
