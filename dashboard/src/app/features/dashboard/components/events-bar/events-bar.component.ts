import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Event } from "../../../../api/models/event";

@Component({
    selector: "app-events-bar",
    templateUrl: "events-bar.template.html",
    styleUrls: ["./events-bar.style.scss"]
})

export class EventsBarComponent implements OnInit {

    @Input()
    events: Event[] = [];

    @Input()
    currentEvent: Event;

    @Output()
    currentEventChange = new EventEmitter<Event>();

    constructor() { }

    ngOnInit() { }

    getEventYear(event: Event) {
        return new Date(event.beginDate).getUTCFullYear();
    }

    isActive(event: Event) {
        return this.currentEvent === event;
    }

    clickEvent(event: Event) {
        this.currentEventChange.emit(event);
    }
}
