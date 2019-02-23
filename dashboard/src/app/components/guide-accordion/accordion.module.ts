import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { AccordionComponent } from "./accordion.component";
import { AccordionModule } from "ngx-bootstrap";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        AccordionModule,
        FlexLayoutModule
    ],
    declarations: [AccordionComponent],
    providers: [
        
    ],
    exports: [AccordionComponent],
})
export class GuideAccordionModule {}
