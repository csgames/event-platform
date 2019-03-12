import { NgModule } from "@angular/core";
import { LocalizedDatePipe } from "./localized-date/localized-date.pipe";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [LocalizedDatePipe],
    declarations: [LocalizedDatePipe],
    providers: []
})
export class PipesModule {}
