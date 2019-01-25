import { Component, OnInit, Input } from "@angular/core";
import { AttendeeModelUI } from "./attendee.model";

@Component({
  selector: "app-attendee",
  templateUrl: "./attendee.template.html",
  styleUrls: ["./attendee.style.scss"]
})
export class AttendeeComponent implements OnInit {

  @Input() attendee: AttendeeModelUI;
  attendeeModel: AttendeeModelUI;
  constructor() { }

  ngOnInit() {
    this.attendeeModel = this.attendee;
  }

  isEmpty(link: string): boolean {
    return (link.length === 0);
  }

}
