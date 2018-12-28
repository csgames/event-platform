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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule,
        SimpleModalModule,
        BsDropdownModule,
        NotificationsListModalModule,
        GravatarModule.forRoot({ fallback: FALLBACK.mm })
    ],
    declarations: [
        DashboardComponent,
        EventsBarComponent,
        SideNavComponent,
        TopNavComponent
    ],
    entryComponents: [
        NotificationsListModalComponent
    ]
})
export class DashboardModule {}
