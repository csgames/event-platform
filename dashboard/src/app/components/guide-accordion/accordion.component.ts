import { Component, OnInit, Input, ContentChild, TemplateRef, ViewChild, AfterViewInit } from "@angular/core";
import { AccordionPanelComponent } from "ngx-bootstrap";


@Component({
    selector: "app-accordion-component",
    templateUrl: "accordion.template.html",
    styleUrls: ["./accordion.style.scss"]
})

export class AccordionComponent implements OnInit {
    isOpen: boolean;

    @Input()
    iconClass: string;

    @Input()
    title: string;

    @Input()
    startsOpened: boolean = false;


    ngOnInit() { 
        this.isOpen = false;
    }

    clickAccordion() {
        this.isOpen = !this.isOpen;
    }
}
