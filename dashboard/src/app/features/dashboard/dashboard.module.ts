import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EventsBarComponent } from "./components/events-bar/events-bar.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { TopNavComponent } from "./components/top-nav/top-nav.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FALLBACK, GravatarModule } from "ngx-gravatar";
import { BsDropdownModule } from "ngx-bootstrap";
import { SimpleModalModule } from "ngx-simple-modal";
import { NotificationsListModalModule } from "../../modals/notifications-list-modal/notifications-list-modal.module";
import { NotificationsListModalComponent } from "../../modals/notifications-list-modal/notifications-list-modal.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatSidenavModule, MatToolbarModule } from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "../../components/loading-spinner/loading-spinner.module";
import { ProfileSettingModule } from "./modals/profile-setting/profile-setting.module";
import { TicketModule } from "./modals/ticket/ticket.module";
import { RegisteredGuard } from "./utils/registered.guard";
import { NotRegisteredGuard } from "./utils/not-registered.guard";
import { DirectivesModule } from "../../directives/directives.module";
import { ChangePasswordModule } from "./modals/change-password/change-password.module";
import { PipeModule } from "src/app/pipe/pipe.module";
import { FlashoutGuard } from "../flashout/guards/flashout.guard";
import { CreateEventModalModule } from "../../modals/create-event-modal/create-event-modal.module";
import { EditEventModalModule } from "../../modals/edit-event-modal/edit-event-modal.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule,
        DirectivesModule,
        SimpleModalModule,
        BsDropdownModule,
        NotificationsListModalModule,
        CreateEventModalModule,
        EditEventModalModule,
        GravatarModule.forRoot({ fallback: FALLBACK.mm }),
        LoadingSpinnerModule,
        LayoutModule,
        MatToolbarModule,
        TranslateModule,
        MatSidenavModule,
        ProfileSettingModule,
        ChangePasswordModule,
        TicketModule,
        PipeModule
    ],
    declarations: [
        DashboardComponent,
        EventsBarComponent,
        SideNavComponent,
        TopNavComponent
    ],
    entryComponents: [
        NotificationsListModalComponent
    ],
    providers: [
        RegisteredGuard,
        NotRegisteredGuard,
        FlashoutGuard
    ]
})
export class DashboardModule {}
