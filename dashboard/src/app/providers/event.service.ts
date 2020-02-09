import { Injectable } from "@angular/core";
import { Event, EventScore } from "../api/models/event";
import { Observable } from "rxjs";
import { Attendee } from "../api/models/attendee";
import { ApiService } from "../api/api.service";
import { UppyFile } from "@uppy/core";
import { EventGuide } from "../api/models/guide";
import { Team } from "../api/models/team";
import { Competition } from "../api/models/competition";
import { Template } from "../api/models/template";
import { EventFormDto } from "../components/event-form/dto/event-form.dto";


const CURRENT_EVENT = "CURRENT_EVENT";

@Injectable()
export class EventService {
    constructor(private apiService: ApiService) {}

    public getEventList(): Observable<Event[]> {
        return this.apiService.event.getEventList();
    }

    public getTeams(): Observable<Team[]> {
        return this.apiService.event.getTeams();
    }

    public saveCurrentEvent(eventId: string) {
        localStorage.setItem(CURRENT_EVENT, eventId);
    }

    public getCurrentEvent(): string {
        return localStorage.getItem(CURRENT_EVENT);
    }

    public getGuideEvent(): Observable<EventGuide> {
        return this.apiService.event.getGuide();
    }

    public onboardAttendee(attendee: Attendee): Observable<void> {
        let file: File = null;
        if (attendee.cv && typeof attendee.cv !== "string") {
            file = (attendee.cv as UppyFile).data as File;
            delete attendee.cv;
        }

        return this.apiService.event.onboardAttendee(attendee, file);
    }

    public getRegisteredCompetitions(): Observable<Competition[]> {
        return this.apiService.event.getRegisteredCompetitions();
    }

    public getAdmins(): Observable<Attendee[]> {
        return this.apiService.event.getAttendees({ roles: ["admin"] });
    }

    public getVolunteers(): Observable<Attendee[]> {
        return this.apiService.event.getAttendees({ roles: ["volunteer"] });
    }

    public getDirectors(): Observable<Attendee[]> {
        return this.apiService.event.getAttendees({ roles: ["director"] });
    }

    public getAttendees(): Observable<Attendee[]> {
        return this.apiService.event.getAttendees({ roles: ["captain", "attendee", "godparent"] });
    }

    public getAttendeesData(type: string): Observable<Blob> {
        return this.apiService.event.getAttendees({ roles: ["captain", "attendee", "godparent"], type });
    }

    public getEventScore(): Observable<EventScore> {
        return this.apiService.event.getEventScore();
    }

    public getAttendeesCv(): Observable<Blob> {
        return this.apiService.event.getAttendeesCv();
    }

    public createEvent(eventFormDto: EventFormDto): Observable<Event> {
        return this.apiService.event.createEvent({
            ...eventFormDto,
            flashoutBeginDate: eventFormDto.beginDate,
            flashoutEndDate: eventFormDto.endDate
        });
    }

    public editEvent(eventFormDto: EventFormDto): Observable<Event> {
        return this.apiService.event.updateEvent(eventFormDto);
    }

    public getTemplate(type: string): Observable<Template> {
        return this.apiService.event.getTemplate(type);
    }

    public updateTemplate(type: string, html: string): Observable<void> {
        return this.apiService.event.updateTemplate(type, {
            html
        });
    }
}
