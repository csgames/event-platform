import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { DirectivesModule } from "src/app/directives/directives.module";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { TabsModule } from "ngx-bootstrap/tabs";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PipeModule } from "src/app/pipe/pipe.module";
import { CompetitionCardComponent } from "./competition-card.component";

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
    declarations: [CompetitionCardComponent],    
    exports: [CompetitionCardComponent]
})
export class CompetitionAdminCardModule { }
