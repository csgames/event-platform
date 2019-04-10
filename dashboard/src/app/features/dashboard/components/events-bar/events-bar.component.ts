import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Event } from "../../../../api/models/event";
import { SimpleModalService } from "ngx-simple-modal";
import { CreateEventModalComponent } from "../../../../modals/create-event-modal/create-event-modal.component";

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

    constructor(private modalService: SimpleModalService) { }

    ngOnInit() { }

    get sortedEvents() {
        return this.events.sort((a, b) => {
            return this.getEventYear(b) - this.getEventYear(a);
        });
    }

    getEventYear(event: Event) {
        return new Date(event.beginDate).getUTCFullYear();
    }

    isActive(event: Event) {
        return this.currentEvent === event;
    }

    clickEvent(event: Event) {
        this.currentEventChange.emit(event);
    }

    clickCreate() {
        this.modalService.addModal(CreateEventModalComponent);
    }

    onClickEditEvent(event: Event) {

    }
}
