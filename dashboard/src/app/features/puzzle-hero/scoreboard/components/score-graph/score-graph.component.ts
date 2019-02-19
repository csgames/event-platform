import { Component, Input, OnInit } from "@angular/core";
import { TeamSeries } from "../../../../../api/models/puzzle-hero";

@Component({
    selector: "app-score-graph",
    templateUrl: "score-graph.template.html",
    styleUrls: ["./score-graph.style.scss"]
})
export class ScoreGraphComponent implements OnInit {

    colorScheme = {
        name: "csgames",
        selectable: true,
        group: "Ordinal",
        domain: [
            "#00579C",
            "#FE4A49",
            "#2AB7CA",
            "#F15E58",
            "#FED766",
            "#647c8a",
            "#3f51b5",
            "#2196f3",
            "#00b862",
            "#afdf0a",
            "#a7b61a",
            "#f3e562",
            "#ff9800",
            "#ff5722",
            "#ff4514"
        ]
    };

    @Input()
    teamsSeries: TeamSeries[] = [];

    @Input()
    loading = false;

    constructor() { }

    ngOnInit() { }
}
