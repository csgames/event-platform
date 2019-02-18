import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";

import { UpdateComponent } from "./update.component";

@NgModule({
    imports: [CommonModule, FlexLayoutModule, TranslateModule],
    exports: [UpdateComponent],
    declarations: [UpdateComponent],
    providers: []
})
export class UpdateModule {
}
