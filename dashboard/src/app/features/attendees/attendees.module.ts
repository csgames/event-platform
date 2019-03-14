import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AttendeeViewModule } from "../../components/attendee-view/attendee-view.module";
import { LoadingSpinnerModule } from "../../components/loading-spinner/loading-spinner.module";
import { DirectivesModule } from "../../directives/directives.module";
import { AttendeesRoutingModule } from "./attendees-routing.module";
import { AttendeesComponent } from "./attendees.component";
import { AttendeesEffects } from "./store/attendees.effects";
import * as fromAttendees from "./store/attendees.reducer";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        AttendeesRoutingModule,
        LoadingSpinnerModule,
        DirectivesModule,
        FlexLayoutModule,
        AttendeeViewModule,
        StoreModule.forFeature("attendees", fromAttendees.reducer),
        EffectsModule.forFeature([AttendeesEffects]),
    ],
    declarations: [AttendeesComponent],
    entryComponents: [AttendeesComponent]
})
export class AttendeesModule { }
