import { NgModule } from "@angular/core";
import { CreateEventModalComponent } from "./create-event-modal.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { PipeModule } from "../../pipe/pipe.module";
import { LoadingSpinnerModule } from "../../components/loading-spinner/loading-spinner.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromCreateEventModal from "./store/create-event-modal.reducer";
import { EventFormModule } from "../../components/event-form/event-form.module";
import { CreateEventModalEffects } from "./store/create-event-modal.effects";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule,
        TranslateModule,
        PipeModule,
        LoadingSpinnerModule,
        EventFormModule,

        StoreModule.forFeature("createEventModal", fromCreateEventModal.reducer),
        EffectsModule.forFeature([CreateEventModalEffects])
    ],
    exports: [],
    declarations: [CreateEventModalComponent],
    entryComponents: [CreateEventModalComponent],
    providers: []
})
export class CreateEventModalModule {}
