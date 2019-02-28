import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as shape from "d3-shape";
import { PuzzleInfo, PuzzleTypes, Track } from "../../../../api/models/puzzle-hero";
import { PuzzleHeroService } from "../../../../providers/puzzle-hero.service";
import { SimpleModalService } from "ngx-simple-modal";
import { InfoPuzzleHeroComponent } from "../../tracks/components/info-puzzle-hero/info-puzzle-hero.component";

@Component({
    selector: "app-track",
    templateUrl: "track.template.html",
    styleUrls: ["./track.style.scss"]
})
export class TrackComponent implements OnInit {
    @Input()
    track: Track;

    @Input()
    startsOpen = false;

    @Input()
    showStar = true;

    @Input()
    adminMode = false;

    @Output()
    clickStar = new EventEmitter();

    @Output()
    clickPuzzle = new EventEmitter<PuzzleInfo>();

    @Output()
    clickAddPuzzle = new EventEmitter<PuzzleInfo>();

    @Output()
    openChange = new EventEmitter();

    nodes: PuzzleInfo[] = [];
    links: { source: string, target: string }[] = [];

    curve = shape.curveBundle.beta(1);

    isOpen = false;

    constructor(private puzzleHeroService: PuzzleHeroService, private modalService: SimpleModalService) {}

    public ngOnInit() {}

    onOpen() {
        this.isOpen = !this.isOpen;
        this.openChange.emit(this.isOpen);
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

    onClickPuzzle(puzzle: PuzzleInfo) {
        this.clickPuzzle.emit(puzzle);
    }

    onClickAddPuzzle(puzzle: PuzzleInfo) {
        this.clickAddPuzzle.emit(puzzle);
    }

    onClickStar(event: MouseEvent) {
        event.stopPropagation();
        this.clickStar.emit();
    }
}
