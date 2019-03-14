import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { DirectivesModule } from "src/app/directives/directives.module";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { TabsModule } from "ngx-bootstrap";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PipeModule } from "src/app/pipe/pipe.module";
import { CompetitionCardComponent } from "./competition-card.component";
import { AttendeeViewModule } from "src/app/components/attendee-view/attendee-view.module";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoadingSpinnerModule,
        DirectivesModule,
        TabsModule.forRoot(),
        FlexLayoutModule,
        PipeModule,
        AttendeeViewModule
    ],
    declarations: [CompetitionCardComponent],    
    exports: [CompetitionCardComponent]
})
export class CompetitionAdminCardModule { }
