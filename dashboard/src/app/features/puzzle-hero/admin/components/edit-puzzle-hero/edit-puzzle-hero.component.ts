import { Component, OnDestroy, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { TranslateService } from "@ngx-translate/core";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AdminPuzzleInfo, Track, ValidationTypes, PuzzleTypes } from "src/app/api/models/puzzle-hero";
import { NgSelectModule } from "@ng-select/ng-select";

export interface EditPuzzleHeroModal {
    puzzle: AdminPuzzleInfo;
    track: Track;
}

@Component({
    selector: "app-edit-puzzle-hero-modal",
    templateUrl: "edit-puzzle-hero.template.html",
    styleUrls: ["edit-puzzle-hero.style.scss"]
})
export class EditPuzzleHeroComponent extends SimpleModalComponent<void, void> implements OnInit, OnDestroy {
    public pInfo: AdminPuzzleInfo;
    public model: any;
    public myDateValue: Date;
    public myTime: Date;
    public validationTypes: string[];
    public puzzleTypes: string[];


    constructor(private translateService: TranslateService) {
        super();
    }

    ngOnInit() {
        this.pInfo = {
            id:"", 
            label:"hellocoucou", 
            type: PuzzleTypes.Crypto, 
            description:{"fr":"oktamer", "en":"mbasseng"},
            answer: "123456Ab",
            validationType: ValidationTypes.String,
            startDate: Date.now(),
            endDate: Date.now(),
            puzzleValue: 100
        };
        this.myDateValue = new Date();
        this.myTime = new Date();
        // this.puzzleHeroSuccessSub$ = this.success$.subscribe((success) => {
        //     if (success) {
        //         this.onClose();
        //     }
        // });
        this.validationTypes = [];
        for(let i in ValidationTypes) {
            this.validationTypes.push(ValidationTypes[i]);
        }
        
        this.puzzleTypes = [];
        for(let i in PuzzleTypes) {
            this.puzzleTypes.push(PuzzleTypes[i]);
        }
         
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        // this.puzzleHeroSuccessSub$.unsubscribe();
    }

    public onClose() {
        this.close();
        // this.store$.dispatch(new ResetState());
    }

    public onEditPuzzleName() {
        console.log("onEditPuzzleName()");
        return;
    }

    public get lang(): string {
        return this.translateService.getDefaultLang();
    }

    get icon(): string {
        return "";
    }
}
