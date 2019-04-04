import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { CompetitionsService } from "../../../../../providers/competitions.service";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "question-download",
    templateUrl: "question-download.template.html"
})
export class QuestionDownloadComponent implements OnInit, OnDestroy {
    @Output()
    public downloadUrl = new EventEmitter<string>();

    public percent = 0;
    public text = "";

    private downloadStartSub$: Subscription;
    private downloadEndSub$: Subscription;
    private downloadUpdateSub$: Subscription;
    private downloadTeamSub$: Subscription;
    private downloadSavingSub$: Subscription;

    constructor(private competitionService: CompetitionsService, private translateService: TranslateService) {
    }

    public ngOnInit() {
        this.downloadStartSub$ = this.competitionService.downloadStart$.subscribe(() => {
            this.percent = 0;
        });
        this.downloadEndSub$ = this.competitionService.downloadEnd$.subscribe((data: any) => {
            if (data.url) {
                this.downloadUrl.emit(data.url);
            }

            this.percent = 0;
        });
        this.downloadTeamSub$ = this.competitionService.downloadTeam$.subscribe((data: any) => {
            this.text = this.translateService.instant("components.download_question.download_team", {
                teamName: data.team
            });
        });
        this.downloadUpdateSub$ = this.competitionService.downloadUpdate$.subscribe((data: any) => {
            this.percent = data.percent;
        });
        this.downloadSavingSub$ = this.competitionService.downloadSaving$.subscribe(() => {
            this.text = this.translateService.instant("components.download_question.download_saving");
        });
    }

    public ngOnDestroy() {
        this.downloadStartSub$.unsubscribe();
        this.downloadEndSub$.unsubscribe();
        this.downloadUpdateSub$.unsubscribe();
        this.downloadTeamSub$.unsubscribe();
        this.downloadSavingSub$.unsubscribe();
    }
}
