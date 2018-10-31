import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EventsBarComponent } from "./components/events-bar/events-bar.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { TopNavComponent } from "./components/top-nav/top-nav.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        DashboardComponent,
        EventsBarComponent,
        SideNavComponent,
        TopNavComponent
    ]
})
export class DashboardModule {}
