import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as shape from "d3-shape";
import { PuzzleInfo, PuzzleTypes, Track } from "../../../../../api/models/puzzle-hero";
import { PuzzleHeroService } from "../../../../../providers/puzzle-hero.service";
import { SimpleModalService } from "ngx-simple-modal";
import { InfoPuzzleHeroComponent } from "../info-puzzle-hero/info-puzzle-hero.component";

export interface InfoPuzzleHeroModal {
    puzzle: PuzzleInfo;
    track: Track;
}

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

    constructor(private puzzleHeroService: PuzzleHeroService, private modalService: SimpleModalService) {}

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
            case PuzzleTypes.Scavenger:
                return "fa-camera-alt";
        }
        return "";
    }

    get isStarred(): boolean {
        return this.puzzleHeroService.isTrackStarred(this.track);
    }

    clickPuzzle(puzzle: PuzzleInfo) {
        if (!puzzle.locked) {
            this.modalService.addModal(InfoPuzzleHeroComponent, {puzzle, track: this.track});
        }
    }

    onClickStar(event: MouseEvent) {
        event.stopPropagation();
        this.clickStar.emit();
    }
}
