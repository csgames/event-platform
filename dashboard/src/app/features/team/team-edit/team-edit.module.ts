import { NgModule } from "@angular/core";
import { TeamEditComponent } from "./team-edit.component";
import { TeamEditRoutingModule } from "./team-edit-routing.module";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { TeamEditEffects } from "./store/team-edit.effects";
import * as fromTeamEdit from "./store/team-edit.reducer";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { TeamViewModule } from "../team-view/team-view.module";
import { CollapseModule, TooltipModule } from "ngx-bootstrap";
import { AttendeeViewModule } from "../../../components/attendee-view/attendee-view.module";
import { AddTeamFormComponent } from "./components/add-team-form/add-team-form.component";
import { FormGeneratorFactory } from "../../../form-generator/factory";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ADD_TEAM_FORM_GENERATOR } from "./team-edit.constants";
import { AddTeamFormDto } from "./components/add-team-form/dto/add-team-form.dto";
import { NgSelectModule } from "@ng-select/ng-select";
import { DirectivesModule } from "../../../directives/directives.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        LoadingSpinnerModule,
        TeamViewModule,
        CollapseModule,
        AttendeeViewModule,
        TooltipModule,
        NgSelectModule,
        DirectivesModule,
        StoreModule.forFeature("teamEdit", fromTeamEdit.reducer),
        EffectsModule.forFeature([TeamEditEffects]),

        TeamEditRoutingModule
    ],
    exports: [],
    declarations: [TeamEditComponent, AddTeamFormComponent],
    providers: [
        { provide: ADD_TEAM_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(AddTeamFormDto), deps: [FormBuilder] }
    ]
})
export class TeamEditModule {}
