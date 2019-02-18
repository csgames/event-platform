import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PuzzleInfo, PuzzleTypes } from "../../../../api/models/puzzle-hero";

@Component({
    selector: "[puzzle-tile]",
    templateUrl: "puzzle-tile.template.html",
    styleUrls: ["./puzzle-tile.style.scss"]
})
export class PuzzleTileComponent {
    @Input()
    puzzle: PuzzleInfo;

    @Output()
    clickPuzzle = new EventEmitter<PuzzleInfo>();

    get icon(): string {
        switch (this.puzzle.type) {
            case PuzzleTypes.Crypto:
                return "&#xf084;";
            case PuzzleTypes.Gaming:
                return "&#xf11b;";
        }
    }

    onClickPuzzle() {
        this.clickPuzzle.emit(this.puzzle);
    }
}
