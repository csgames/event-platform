import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { EventGuide } from "src/app/api/models/guide";


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

    @Input()
    public hasEdit: boolean;

    @Input()
    public guide: EventGuide;

    @Output()
    clickUpdateGuide = new EventEmitter<EventGuide>();

    ngOnInit() { 
        this.isOpen = false;
    }

    clickAccordion() {
        this.isOpen = !this.isOpen;
    }

    public onClickUpdateGuide(event: MouseEvent, guide: EventGuide) {
        event.stopImmediatePropagation();
        this.clickUpdateGuide.emit(guide);
    }
}
