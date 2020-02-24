import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as shape from "d3-shape";
import { PuzzleInfo, Track, Answers } from "../../../../api/models/puzzle-hero";
import { PuzzleHeroService } from "../../../../providers/puzzle-hero.service";
import { SimpleModalService } from "ngx-simple-modal";
import { TrackUtils } from "../../../../utils/track.utils";
import { AnswersComponent } from "../../admin/components/answers/answers.component";

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
    clickUpdateTrack = new EventEmitter<Track>();

    @Output()
    openChange = new EventEmitter();

    nodes: PuzzleInfo[] = [];
    links: { source: string, target: string }[] = [];

    curve = shape.curveBundle.beta(1);

    orientation = "LR";

    isOpen = false;

    get ready() {
        return this.nodes.length;
    }

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
        if (this.links.length === 0) {
            this.orientation = "TB";
        }
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
        return TrackUtils.getTrackTypeIconClass(this.track.type);
    }

    get isStarred(): boolean {
        return this.puzzleHeroService.isTrackStarred(this.track);
    }

    onClickPuzzle(puzzle: PuzzleInfo) {
        this.clickPuzzle.emit(puzzle);
    }

    onClickAccordionHeadingAddPuzzle(event: MouseEvent) {
        event.stopPropagation();
        this.onClickAddPuzzle(event);
    }

    onClickAddPuzzle(event: MouseEvent, parentPuzzle: PuzzleInfo = null) {
        this.clickAddPuzzle.emit(parentPuzzle);
    }

    onClickUpdateTrack(event: MouseEvent, track: Track) {
        event.stopImmediatePropagation();
        this.clickUpdateTrack.emit(track);
    }

    onClickStar(event: MouseEvent) {
        event.stopPropagation();
        this.clickStar.emit();
    }

    isReleased() {
        const now = new Date().toISOString();
        return now > this.track.releaseDate;
    }

    isEnded() {
        const now = new Date().toISOString();
        return now > this.track.endDate;
    }

    clickSeeAnswers(answers: Answers[]) {
        const sorted = answers.sort((a, b) => a.timestamp < b.timestamp ? -1 : 1);
        this.modalService.addModal(AnswersComponent, { answers: sorted });
    }
}
