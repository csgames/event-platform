import { Component, OnDestroy, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { TranslateService } from "@ngx-translate/core";
import { Competition } from "src/app/api/models/competition";
import { Store, select } from "@ngrx/store";
import { Subscription } from "rxjs";
import { State, 
        getInfoCompetitionError, 
        getInfoCompetitionLoading, 
        getInfoCompetitionSuccess 
} from "./store/info-competition.reducer";
import { ValidatePassword } from "./store/info-competition.actions";

export interface InfoCompetitionModal {
    competition: Competition;
}

@Component({
    selector: "app-info-competition-modal",
    templateUrl: "info-competition.template.html",
    styleUrls: ["info-competition.style.scss"]
})
export class InfoCompetitionComponent extends SimpleModalComponent<InfoCompetitionModal, boolean>
        implements InfoCompetitionModal, OnInit, OnDestroy {

    error$ = this.store$.pipe(select(getInfoCompetitionError));
    loading$ = this.store$.pipe(select(getInfoCompetitionLoading));
    success$ = this.store$.pipe(select(getInfoCompetitionSuccess));
    
    public competition: Competition;
    public password: string;

    competitionSuccessSub$: Subscription;

    constructor(private translateService: TranslateService, private store$: Store<State>) {
        super();
    }

    public ngOnInit() {
        this.competitionSuccessSub$ = this.success$.subscribe((success) => {
            if (success) {
                this.onClose();
            }
        });

    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.competitionSuccessSub$.unsubscribe();
    }

    public onClose() {
        this.close();
    }

    public get lang(): string {
        return this.translateService.getDefaultLang();
    }

    validate() {
        this.store$.dispatch(new ValidatePassword(this.competition.id, this.password));
    }

}
