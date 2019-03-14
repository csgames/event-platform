import { NgModule } from "@angular/core";

import { CompetitionsAdminComponent } from "./competitions-admin.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CompetitionsAdminRoutingModule } from "./competitions-admin-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,

        CompetitionsAdminRoutingModule
    ],
    exports: [],
    declarations: [CompetitionsAdminComponent],
    providers: []
})
export class CompetitionsAdminModule {}
