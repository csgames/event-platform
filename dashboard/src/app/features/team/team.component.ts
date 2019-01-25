import { Component, OnInit } from "@angular/core";
import { TeamModeleUI } from "./team.model";
import { AttendeeModelUI } from "./attendee/attendee.model";
import { AttendeeComponent } from "./attendee/attendee.component";

@Component({
    selector: "app-team",
    templateUrl: "team.template.html"
})
export class TeamComponent implements OnInit {
    
    Team: TeamModeleUI;
    isEditing: boolean;

    constructor() { }
    
    ngOnInit() { 
        this.Team = new TeamModeleUI();
        this.Team.Name = "Poly-Cônes";
        this.Team.Captain = "Stéphanie Leclerc";
        this.Team.Members = new Array<AttendeeModelUI>();
        this.Team.Members = this.getattendees();
        this.isEditing = false;
        

    }

    getattendees(): Array<AttendeeModelUI> {
        const teamMembers = new Array<AttendeeModelUI>();
        
        const attendee1 = new AttendeeModelUI("Team member #1", "member1@polymtl.ca", true, "",
        "linkedin/lea", "github.com/lea-elhage");
        teamMembers.push(attendee1);

        const attendee2 = new AttendeeModelUI("Team member #2", "member2@polymtl.ca", false,
        "google.ca", "linkedin/vero", "github.com/vedem1192");
        teamMembers.push(attendee2);
        return teamMembers;

    }

    public onEdit(): void {
        this.isEditing = true;
        console.log("en edition" + this.isEditing);
    }

    public onSave(): void {
        this.isEditing = false;
        // document.getElementById("myText").value = "Johnny Bravo";
    }
}
