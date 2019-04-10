import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { DirectivesModule } from "src/app/directives/directives.module";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { TabsModule } from "ngx-bootstrap";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PipeModule } from "src/app/pipe/pipe.module";
import { ActivityCardComponent } from "./activity-card.component";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoadingSpinnerModule,
        DirectivesModule,
        TabsModule.forRoot(),
        FlexLayoutModule,
        PipeModule,
        RouterModule
    ],
    declarations: [ActivityCardComponent],    
    exports: [ActivityCardComponent]
})
export class ActivityCardModule { }
