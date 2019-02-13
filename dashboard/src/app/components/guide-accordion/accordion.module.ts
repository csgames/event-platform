import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { AccordionComponent } from "./accordion.component";
import { AccordionModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        AccordionModule.forRoot()
    ],
    declarations: [AccordionComponent],
    providers: [
        
    ],
    exports: [AccordionComponent],
})
export class GuideAccordionModule {}
