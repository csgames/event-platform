import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { Event } from "../../../../api/models/event";
import { EventFormDto } from "../../../../components/event-form/dto/event-form.dto";
import { EventUtils } from "../../../../utils/event.utils";
import { EventFormComponent } from "../../../../components/event-form/event-form.component";

@Component({
    selector: "app-general-settings",
    templateUrl: "general-settings.template.html"
})
export class GeneralSettingsComponent {
    @ViewChild(EventFormComponent, { static: true })
    form: EventFormComponent;

    @Input()
    set event(event: Event) {
        this.eventFormDto = EventUtils.eventToEventFormDto(event);
    }

    @Output()
    save = new EventEmitter<EventFormDto>();

    eventFormDto = new EventFormDto();

    clickSave() {
        if (this.form.validate()) {
            this.save.emit(this.eventFormDto);
        }
    }
}
