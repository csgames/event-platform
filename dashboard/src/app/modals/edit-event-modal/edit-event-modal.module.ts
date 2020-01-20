import { NgModule } from "@angular/core";
import { EditEventModalComponent } from "./edit-event-modal.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { PipeModule } from "../../pipe/pipe.module";
import { LoadingSpinnerModule } from "../../components/loading-spinner/loading-spinner.module";
import { EventFormModule } from "../../components/event-form/event-form.module";
import { StoreModule } from "@ngrx/store";
import * as fromEditEventModal from "./store/edit-event-modal.reducer";
import { EffectsModule } from "@ngrx/effects";
import { EditEventModalEffects } from "./store/edit-event-modal.effects";

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

        StoreModule.forFeature("editEventModal", fromEditEventModal.reducer),
        EffectsModule.forFeature([EditEventModalEffects])
    ],
    exports: [],
    declarations: [EditEventModalComponent],
    entryComponents: [EditEventModalComponent],
    providers: []
})
export class EditEventModalModule {}
