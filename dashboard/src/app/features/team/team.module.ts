import { NgModule } from "@angular/core";
import { TeamComponent } from "./team.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TeamRoutingModule } from "./team-routing.module";
import { AttendeeComponent } from "./attendee/attendee.component";
import { StoreModule } from "@ngrx/store";
import * as fromTeam from "./store/team.reducer";
import { EffectsModule } from "@ngrx/effects";
import { TeamEffects } from "./store/team.effects";
import { GravatarModule } from "ngx-gravatar";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { DirectivesModule } from "src/app/directives/directives.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TeamRoutingModule,
        StoreModule.forFeature("team", fromTeam.reducer),
        EffectsModule.forFeature([TeamEffects]),
        GravatarModule,
        LoadingSpinnerModule,
        DirectivesModule
    ],
    exports: [],
    declarations: [TeamComponent, AttendeeComponent],
    providers: []
})
export class TeamModule {}
