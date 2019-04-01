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
import { VolunteersEffects } from "./store/volunteers.effects";
import * as fromVolunteers from "./store/volunteers.reducer";
import { VolunteersRoutingModule } from "./volunteers-routing.module";
import { VolunteersComponent } from "./volunteers.component";
import { RegisterAttendeeFormModule } from "../../components/register-attendee-form/register-attendee-form.module";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        VolunteersRoutingModule,
        LoadingSpinnerModule,
        DirectivesModule,
        FlexLayoutModule,
        AttendeeViewModule,
        RegisterAttendeeFormModule,
        StoreModule.forFeature("volunteers", fromVolunteers.reducer),
        EffectsModule.forFeature([VolunteersEffects]),
    ],
    declarations: [VolunteersComponent],
    entryComponents: [VolunteersComponent]
})
export class VolunteersModule { }
