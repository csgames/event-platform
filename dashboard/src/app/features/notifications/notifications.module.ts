import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastrModule } from "ngx-toastr";
import { NotificationsRoutingModule } from "./notifications-routing.module";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { StoreModule } from "@ngrx/store";
import * as fromNotifications from "./store/notifications.reducer";
import { TranslateModule } from "@ngx-translate/core";
import { EffectsModule } from "@ngrx/effects";
import { AdminNotificationsEffects } from "./store/notifications.effects";
import { NotificationsComponent } from "./notifications.component";
import { DirectivesModule } from "src/app/directives/directives.module";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        ToastrModule,
        NotificationsRoutingModule,
        LoadingSpinnerModule,
        StoreModule.forFeature("adminNotifications", fromNotifications.reducer),
        EffectsModule.forFeature([AdminNotificationsEffects]),
        DirectivesModule,
        FormsModule,
        NgSelectModule
    ],
    declarations: [NotificationsComponent],
    entryComponents: [NotificationsComponent]
})
export class NotificationsModule { }