import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AttendeeViewModule } from "../../components/attendee-view/attendee-view.module";
import { LoadingSpinnerModule } from "../../components/loading-spinner/loading-spinner.module";
import { DirectivesModule } from "../../directives/directives.module";
import { DirectorsEffects } from "./store/directors.effects";
import * as fromDirectors from "./store/directors.reducer";
import { DirectorsRoutingModule } from "./directors-routing.module";
import { DirectorsComponent } from "./directors.component";
import { RegisterAttendeeFormModule } from "../../components/register-attendee-form/register-attendee-form.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        DirectorsRoutingModule,
        LoadingSpinnerModule,
        DirectivesModule,
        FlexLayoutModule,
        AttendeeViewModule,
        RegisterAttendeeFormModule,
        StoreModule.forFeature("directors", fromDirectors.reducer),
        EffectsModule.forFeature([DirectorsEffects]),
    ],
    declarations: [DirectorsComponent],
    entryComponents: [DirectorsComponent]
})
export class DirectorsModule { }
