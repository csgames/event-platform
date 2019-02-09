import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Registration } from "./models/registration";
import { Injectable } from "@angular/core";
import { CreateInvitationDto, RegisterAttendeeDto } from "./dto/registration";

@Injectable()
export class RegistrationApi extends CSGamesApi {

    constructor(private http: HttpClient) {
        super("registration");
    }

    public createRegistration(dto: CreateInvitationDto): Observable<Registration> {
        return this.http.post<Registration>(this.url(), dto, { withCredentials: true });
    }

    public getRegistration(uuid: string): Observable<Registration> {
        return this.http.get<Registration>(this.url(uuid), {
            withCredentials: true,
            headers: {
                "With-Event": "false"
            }
        });
    }

    public inviteAttendee(dto: CreateInvitationDto): Observable<Registration> {
        return this.http.post<Registration>(this.url(), dto, { withCredentials: true });
    }

    public registerAttendee(dto: RegisterAttendeeDto): Observable<void> {
        return this.http.post<void>(this.url("attendee"), dto, { withCredentials: true });
    }
}
