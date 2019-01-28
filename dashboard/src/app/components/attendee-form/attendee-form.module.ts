import { NgModule } from "@angular/core";

import { AttendeeFormComponent } from "./attendee-form.component";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
    imports: [
        CommonModule,
        NgSelectModule
    ],
    declarations: [AttendeeFormComponent],
    exports: [AttendeeFormComponent],
    providers: []
})
export class AttendeeFormModule {
}
