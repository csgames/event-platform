import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { AccordionComponent } from "./accordion.component";
import { AccordionModule } from "ngx-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        AccordionModule.forRoot(),
        FlexLayoutModule
    ],
    declarations: [AccordionComponent],
    providers: [
        
    ],
    exports: [AccordionComponent],
})
export class GuideAccordionModule {}
