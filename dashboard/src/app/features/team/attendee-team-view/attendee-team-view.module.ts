import { NgModule } from "@angular/core";

import { AttendeeTeamViewComponent } from "./attendee-team-view.component";
import { CommonModule } from "@angular/common";
import { AttendeeTeamViewRoutingModule } from "./attendee-team-view-routing.module";
import { TeamViewModule } from "../team-view/team-view.module";

@NgModule({
    imports: [
        CommonModule,
        TeamViewModule,

        AttendeeTeamViewRoutingModule
    ],
    exports: [],
    declarations: [AttendeeTeamViewComponent],
    providers: []
})
export class AttendeeTeamViewModule {}
