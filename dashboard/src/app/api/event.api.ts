import { Injectable } from "@angular/core";
import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event, EventScore } from "./models/event";
import { map } from "rxjs/operators";
import { AttendeeModel } from "./models/attendee";
import { EventGuide } from "./models/guide";
import { Sponsors } from "./models/sponsors";
import { Activity, CreateActivity } from "./models/activity";
import { Team } from "./models/team";
import { AttendeeNotification } from "./models/notification";
import { AttendeeVote, Flashout } from "./models/flashout";
import { Competition } from "./models/competition";
import { CreateEventDto, UpdateEventDto } from "./dto/event";
import { SponsorInfoDto } from "../features/sponsors/components/sponsor-form/dto/sponsor-info.dto";
import { SponsorPositionningDto } from "../features/sponsors/components/sponsor-positionning-form/dto/sponsor-positionning.dto";

@Injectable()
export class EventApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("event");
    }

    public getEventList(): Observable<Event[]> {
        return this.http.get<Event[]>(this.url(), {
            withCredentials: true,
            headers: {
                "With-Event": "false"
            }
        }).pipe(
            map(events => {
                return events.map(e => {
                    e.beginDate = new Date(e.beginDate);
                    e.endDate = new Date(e.endDate);
                    return e;
                });
            })
        );
    }

    public getEvent(id: string): Observable<Event> {
        return this.http.get<Event>(this.url(id), {
            withCredentials: true
        });
    }

    public getGuide(): Observable<EventGuide> {
        return this.http.get<EventGuide>(this.url("guide"), {
            withCredentials: true
        });
    }

    public onboardAttendee(attendee: AttendeeModel, file: File) {
        const form = new FormData();
        for (const key in attendee) {
            if (key in attendee) {
                form.append(key, attendee[key]);
            }
        }
        if (file) {
            form.append("file", file);
        }

        return this.http.put<void>(this.url("registration"), form, {
            withCredentials: true
        });
    }

    public getSponsorsList(): Observable<{ [id: string]: Sponsors[] }> {
        return this.http.get<{ [id: string]: Sponsors[] }>(this.url("sponsor"), { withCredentials: true });
    }

    public getActivitiesForEvent(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.url("activity"), { withCredentials: true });
    }

    public getTeams(): Observable<Team[]> {
        return this.http.get<Team[]>(this.url("team"), { withCredentials: true });
    }

    public checkUnseenNotifications(): Observable<AttendeeNotification[]> {
        return this.http.get<AttendeeNotification[]>(this.url("notification?seen=false"), { withCredentials: true });
    }

    public getNotifications(): Observable<AttendeeNotification[]> {
        return this.http.get<AttendeeNotification[]>(this.url("notification"), { withCredentials: true });
    }

    public getCompetitions(): Observable<Competition[]> {
        return this.http.get<Competition[]>(this.url("competition"), { withCredentials: true });
    }

    public getRegisteredCompetitions(): Observable<Competition[]> {
        return this.http.get<Competition[]>(this.url("competition/member"), { withCredentials: true });
    }

    public sendSms(text: string) {
        return this.http.post<void>(this.url("sms"), {
            text
        }, {
            withCredentials: true
        });
    }

    public voteFlashouts(votes: { votes: AttendeeVote[] }): Observable<void> {
        return this.http.put<void>(this.url("flash-out/rating"), votes, {
            withCredentials: true
        });
    }

    public sendPush(title: string, body: string) {
        return this.http.post<void>(this.url("notification"), {
            title,
            body
        }, {
            withCredentials: true
        });
    }

    public getAllFlashouts(): Observable<Flashout[]> {
        return this.http.get<Flashout[]>(this.url("flash-out"), { withCredentials: true });
    }

    public getAttendees(query: { type?: string; roles?: string[]; } = {}): Observable<any> {
        let queryParam = "?";
        if (query.type) {
            queryParam += `type=${query.type}&`;
        }
        if (query.roles) {
            queryParam += `roles=${query.roles.join(",")}`;
        }

        if (query.type && query.type !== "json") {
            return this.http.get(this.url(`attendee/${queryParam}`), { responseType: "blob", withCredentials: true });
        } else {
            return this.http.get(this.url(`attendee/${queryParam}`), { responseType: "json", withCredentials: true });
        }
    }

    public updateFlashout(event: { flashoutBeginDate: Date, flashoutEndDate: Date }): Observable<void> {
        return this.http.put<void>(this.url(), event, { withCredentials: true });
    }

    public getEventScore(): Observable<EventScore> {
        return this.http.get<EventScore>(this.url("score/filter"), {
            withCredentials: true
        });
    }

    public createEvent(createEventDto: CreateEventDto): Observable<Event> {
        return this.http.post<Event>(this.url(), createEventDto, { withCredentials: true });
    }

    public updateEvent(updateEventDto: UpdateEventDto): Observable<Event> {
        return this.http.put<Event>(this.url(), updateEventDto, { withCredentials: true });
    }

    public getAttendeesCv(): Observable<Blob> {
        return this.http.get(this.url("attendee/cv"), { responseType: "blob", withCredentials: true });
    }

    public updateCompetitionResults(competitionResults: { competitionResultsLocked: boolean }): Observable<void> {
        return this.http.put<void>(this.url(), competitionResults, { withCredentials: true });
    }

    public addSponsorToEvent(id: string, tier: string): Observable<void> {
        const body = {
            tier,
            sponsor: id,
            web: {
                padding: [0, 0, 0, 0],
                widthFactor: 1,
                heightFactor: 1
            },
            mobile: {
                padding: [0, 0, 0, 0],
                widthFactor: 1,
                heightFactor: 1
            }
        };

        return this.http.put<void>(this.url("sponsor"), body, { withCredentials: true });
    }

    public updateSponsor(id: string, tier: string, sponsor: SponsorPositionningDto): Observable<void> {
        const body = {
            tier,
            sponsor: id,
            web: {
                padding: [
                    sponsor.webLeftPadding,
                    sponsor.webTopPadding,
                    sponsor.webRightPadding,
                    sponsor.webBottomPadding
                ],
                widthFactor: sponsor.webWidth,
                heightFactor: sponsor.webHeight
            },
            mobile: {
                padding: [
                    sponsor.mobileLeftPadding,
                    sponsor.mobileTopPadding,
                    sponsor.mobileRightPadding,
                    sponsor.mobileBottomPadding
                ],
                widthFactor: sponsor.mobileWidth,
                heightFactor: sponsor.mobileHeight
            }
        };

        return this.http.put<void>(this.url(`sponsor/${id}`), body, { withCredentials: true });
    }
    
    public createActivity(activity: CreateActivity) {
        return this.http.put<void>(this.url("activity"), activity, { withCredentials: true });
    }

}
