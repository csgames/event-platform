import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { PuzzleInfo, PuzzleTypes } from "../../../../api/models/puzzle-hero";
import { PopoverDirective } from "ngx-bootstrap";

@Component({
    selector: "[puzzle-tile]",
    templateUrl: "puzzle-tile.template.html",
    styleUrls: ["./puzzle-tile.style.scss"]
})
export class PuzzleTileComponent {
    @ViewChild("pop")
    popover: PopoverDirective;

    @Input()
    puzzle: PuzzleInfo;

    @Input()
    adminMode = false;

    @Output()
    clickPuzzle = new EventEmitter<void>();

    @Output()
    clickAddPuzzle = new EventEmitter<void>();

    get icon(): string {
        switch (this.puzzle.type) {
            case PuzzleTypes.Crypto:
                return "&#xf084;";
            case PuzzleTypes.Gaming:
                return "&#xf11b;";
            case PuzzleTypes.Scavenger:
                return "&#xf332;";
            case PuzzleTypes.Sponsor:
                return "&#xf3a5;";
        }
        return "";
    }

    onClickPuzzle() {
        if (this.popover) {
            this.popover.hide();
        }
        this.clickPuzzle.emit();
    }

    onClickAddLink() {
        this.popover.hide();
        this.clickAddPuzzle.emit();
    }
}
