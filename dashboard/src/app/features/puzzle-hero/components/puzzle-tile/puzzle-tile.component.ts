import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { PuzzleInfo } from "../../../../api/models/puzzle-hero";
import { PopoverDirective } from "ngx-bootstrap";
import { QuestionTypes } from "../../../../api/models/question";

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
            case QuestionTypes.Crypto:
                return "&#xf084;";
            case QuestionTypes.Gaming:
                return "&#xf11b;";
            case QuestionTypes.Scavenger:
                return "&#xf332;";
            case QuestionTypes.Sponsor:
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
