import { NgModule } from "@angular/core";
import { AdminTeamViewComponent } from "./admin-team-view.component";
import { CommonModule } from "@angular/common";
import { TeamViewModule } from "../team-view/team-view.module";
import { AdminTeamViewRoutingModule } from "./admin-team-view-routing.module";

@NgModule({
    imports: [
        CommonModule,
        TeamViewModule,

        AdminTeamViewRoutingModule
    ],
    exports: [],
    declarations: [AdminTeamViewComponent],
    providers: []
})
export class AdminTeamViewModule {}
