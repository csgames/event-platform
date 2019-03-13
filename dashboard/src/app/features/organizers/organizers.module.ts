import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AttendeeViewModule } from "../../components/attendee-view/attendee-view.module";
import { LoadingSpinnerModule } from "../../components/loading-spinner/loading-spinner.module";
import { DirectivesModule } from "../../directives/directives.module";
import { OrganizersEffects } from "./store/organizers.effects";
import * as fromOrganizers from "./store/organizers.reducer";
import { OrganizersRoutingModule } from "./organizers-routing.module";
import { OrganizersComponent } from "./organizers.component";
import { RegisterAttendeeFormModule } from "../../components/register-attendee-form/register-attendee-form.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        OrganizersRoutingModule,
        LoadingSpinnerModule,
        DirectivesModule,
        FlexLayoutModule,
        AttendeeViewModule,
        RegisterAttendeeFormModule,
        StoreModule.forFeature("organizers", fromOrganizers.reducer),
        EffectsModule.forFeature([OrganizersEffects]),
    ],
    declarations: [OrganizersComponent],
    entryComponents: [OrganizersComponent]
})
export class OrganizersModule { }
