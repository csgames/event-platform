import { Component, OnInit, Input } from "@angular/core";
import { Attendee } from "src/app/api/models/attendee";

@Component({
  selector: "app-attendee",
  templateUrl: "./attendee.template.html",
  styleUrls: ["./attendee.style.scss"]
})
export class AttendeeComponent implements OnInit {

  @Input() attendee: Attendee;
  constructor() { }

  ngOnInit() {
  }

}
