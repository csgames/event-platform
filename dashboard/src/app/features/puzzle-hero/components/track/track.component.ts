import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as shape from "d3-shape";
import { PuzzleInfo, PuzzleTypes } from "../../models/puzzle";
import { Track } from "../../models/track";
import { PuzzleHeroService } from "../../../../providers/puzzle-hero.service";

@Component({
    selector: "app-track",
    templateUrl: "track.template.html",
    styleUrls: ["./track.style.scss"]
})
export class TrackComponent implements OnInit {
    @Input()
    track: Track;

    @Output()
    clickStar = new EventEmitter();

    nodes: PuzzleInfo[] = [];
    links: { source: string, target: string }[] = [];

    curve = shape.curveBundle.beta(1);

    isOpen = false;

    constructor(private puzzleHeroService: PuzzleHeroService) {}

    public ngOnInit() {}

    onOpen() {
        this.isOpen = !this.isOpen;
        this.showGraph();
    }

    showGraph() {
        this.nodes = this.track.puzzles;
        this.links = this.getLinks(this.track.puzzles);
    }

    getLinks(puzzles: PuzzleInfo[]): { source: string, target: string }[] {
        return puzzles
            .filter((p) => p.dependsOn)
            .map((p) => {
                return {
                    source: p.dependsOn,
                    target: p.id
                };
            });
    }

    get icon(): string {
        switch (this.track.type) {
            case PuzzleTypes.Crypto:
                return "fa-key";
            case PuzzleTypes.Gaming:
                return "fa-gamepad";
        }
        return "";
    }

    get isStarred(): boolean {
        return this.puzzleHeroService.isTrackStarred(this.track);
    }

    clickPuzzle(puzzle: PuzzleInfo) {
        console.log(puzzle);
    }

    onClickStar(event: MouseEvent) {
        event.stopPropagation();
        this.clickStar.emit();
    }
}
