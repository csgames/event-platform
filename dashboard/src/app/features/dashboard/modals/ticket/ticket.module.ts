import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "../../../../components/loading-spinner/loading-spinner.module";
import { TicketComponent } from "./ticket.component";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoadingSpinnerModule
    ],
    declarations: [TicketComponent],
    entryComponents: [TicketComponent]
})
export class TicketModule {
}
