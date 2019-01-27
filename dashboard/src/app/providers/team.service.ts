import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable, of, throwError } from "rxjs";
import { Team } from "../api/models/team";
import { Attendee } from "../api/models/attendee";
import { delay, tap } from "rxjs/operators";

@Injectable()
export class TeamService {

    private team: Team = {
        name: "Poly-Cônes",
        attendees: [
            { 
                "github": "github", 
                "linkedIn": "linkedin", 
                "cv": null, 
                "website": "http://google.ca", 
                "phoneNumber": null, 
                "acceptSMSNotifications": null, 
                "hasDietaryRestrictions": null, 
                "dietaryRestrictions": null, 
                "email": "brandon@rober.ge", 
                "firstName": "Brandon", 
                "lastName": "Roberge",
                "gender": "male",
                "tshirt": "S" 
            }
        ],
        maxMembersNumber: 10
    };

    constructor(private apiService: ApiService) {
    }

    getTeam(): Observable<Team> {
        // return this.apiService.attendee.getTeam();
        return of(this.team);
        // return throwError("Erreur team");

    }

    updateTeamName(newName: string): Observable<any> {
        // this.team.name = newName;
        return of(1).pipe(tap(() => this.team.name = newName));
    }

    addTeamMember(newAttendee: Attendee): void {
        this.team.attendees.push(newAttendee);
    }
}
