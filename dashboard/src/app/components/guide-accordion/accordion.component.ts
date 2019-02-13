import { Component, OnInit, Input } from "@angular/core";


@Component({
    selector: "app-accordion-component",
    templateUrl: "accordion.template.html",
    styleUrls: ["./accordion.style.scss"]
})

export class AccordionComponent implements OnInit {
    public isOpen: boolean;

    @Input()
    public iconClass: string;

    @Input()
    public title: string;

    @Input()
    public startsOpened = false;


    ngOnInit() { 
        this.isOpen = false;
    }

    clickAccordion() {
        this.isOpen = !this.isOpen;
    }
}
