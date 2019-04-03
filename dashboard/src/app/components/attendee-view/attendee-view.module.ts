import { NgModule } from "@angular/core";
import { DirectivesModule } from "../../directives/directives.module";
import { AttendeeViewComponent } from "./attendee-view.component";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { GravatarModule } from "ngx-gravatar";
import { TooltipModule } from "ngx-bootstrap";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        GravatarModule,
        FlexLayoutModule,
        TooltipModule,
        DirectivesModule
    ],
    exports: [AttendeeViewComponent],
    declarations: [AttendeeViewComponent],
    providers: []
})
export class AttendeeViewModule {}
