import { Component, OnDestroy, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { PuzzleInfo, PuzzleTypes, Track } from "src/app/api/models/puzzle-hero";
import { TranslateService } from "@ngx-translate/core";

export interface InfoPuzzleHeroModal {
    puzzle: PuzzleInfo;
    track: Track;
}

@Component({
    selector: "app-info-puzzle-hero-modal",
    templateUrl: "info-puzzle-hero.template.html",
    styleUrls: ["info-puzzle-hero.style.scss"]
})
export class InfoPuzzleHeroComponent extends SimpleModalComponent<InfoPuzzleHeroModal, void> implements OnInit, OnDestroy {
    
    public puzzle: PuzzleInfo;
    public track: Track;

    constructor(private translateService: TranslateService) {
        super();
    }

    public ngOnInit() {

    }

    public onClose() {
        this.close();
    }

    public get lang(): string {
        return this.translateService.getDefaultLang();
    }

    get icon(): string {
        switch (this.puzzle.type) {
            case PuzzleTypes.Crypto:
                return "fa-key";
            case PuzzleTypes.Gaming:
                return "fa-gamepad";
            case PuzzleTypes.Scavenger:
                return "fa-camera-alt";
        }
        return "";
    }

}
