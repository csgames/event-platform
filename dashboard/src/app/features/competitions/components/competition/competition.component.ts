import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "app-competition",
  templateUrl: "./competition.template.html",
  styleUrls: ["./competition.style.scss"]
})
export class CompetitionComponent implements OnInit {
  public competitionId$: Observable<string>;
  
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.competitionId$ = this.activatedRoute.params.pipe(
      map(p => p["id"])
  );
  }

}
