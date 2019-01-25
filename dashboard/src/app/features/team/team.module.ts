import { NgModule } from "@angular/core";
import { TeamComponent } from "./team.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TeamRoutingModule } from "./team-routing.module";
import { AttendeeComponent } from "./attendee/attendee.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TeamRoutingModule
    ],
    exports: [],
    declarations: [TeamComponent, AttendeeComponent],
    providers: []
})
export class TeamModule {}
