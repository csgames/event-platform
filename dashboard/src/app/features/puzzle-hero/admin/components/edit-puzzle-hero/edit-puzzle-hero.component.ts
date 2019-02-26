import { Component, OnDestroy, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { TranslateService } from "@ngx-translate/core";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";

// export interface EditPuzzleHeroModal {
//     puzzle: PuzzleInfo;
//     track: Track;
// }

@Component({
    selector: "app-edit-puzzle-hero-modal",
    templateUrl: "edit-puzzle-hero.template.html",
    styleUrls: ["edit-puzzle-hero.style.scss"]
})
export class EditPuzzleHeroComponent extends SimpleModalComponent<void, void> implements OnInit, OnDestroy {


    constructor(private translateService: TranslateService) {
        super();
    }

    ngOnInit() {
        // this.puzzleHeroSuccessSub$ = this.success$.subscribe((success) => {
        //     if (success) {
        //         this.onClose();
        //     }
        // });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        // this.puzzleHeroSuccessSub$.unsubscribe();
    }

    public onClose() {
        this.close();
        // this.store$.dispatch(new ResetState());
    }

    public get lang(): string {
        return this.translateService.getDefaultLang();
    }

    get icon(): string {
        return "";
    }
}
