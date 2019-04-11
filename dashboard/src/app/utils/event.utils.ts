import { Event } from "../api/models/event";
import { EventFormDto } from "../components/event-form/dto/event-form.dto";

export namespace EventUtils {
    export function eventToEventFormDto(event: Event): EventFormDto {
        return {
            ...event,
            beginDate: new Date(event.beginDate),
            endDate: new Date(event.endDate),
            teamEditLockDate: new Date(event.teamEditLockDate)
        };
    }
}
