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
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { AttendeeViewModule } from "../../../components/attendee-view/attendee-view.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { DirectivesModule } from "../../../directives/directives.module";
import { EditTeamInfoModule } from "./modal/edit-team-info/edit-team-info.module";
import { AddTeamFormModule } from "./components/add-team-form/add-team-form.module";
import { SimpleModalModule } from "ngx-simple-modal";

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
        SimpleModalModule,
        AddTeamFormModule,
        EditTeamInfoModule,
        StoreModule.forFeature("teamEdit", fromTeamEdit.reducer),
        EffectsModule.forFeature([TeamEditEffects]),
        TeamEditRoutingModule
    ],
    exports: [],
    declarations: [TeamEditComponent]
})
export class TeamEditModule {}
