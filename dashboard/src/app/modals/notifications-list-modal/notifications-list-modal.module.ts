import { NgModule } from "@angular/core";
import { NotificationsListModalComponent } from "./notifications-list-modal.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { StoreModule } from "@ngrx/store";
import * as fromNotification from "./store/notifications.reducer";
import { EffectsModule } from "@ngrx/effects";
import { NotificationsEffects } from "./store/notifications.effects";
import { TranslateModule } from "@ngx-translate/core";
import { PipeModule } from "src/app/pipe/pipe.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule,
        StoreModule.forFeature("notifications", fromNotification.reducer),
        EffectsModule.forFeature([NotificationsEffects]),
        TranslateModule,
        PipeModule
    ],
    exports: [],
    declarations: [NotificationsListModalComponent],
    providers: [],
    entryComponents: [NotificationsListModalComponent]
})
export class NotificationsListModalModule {}
