import { Component, OnInit, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { State } from "../../../store/app.reducers";
import { getGuide, getGuideLoading } from "./store/guide-edit.reducer";
import { Subscription } from "rxjs";
import { EventGuide } from "src/app/api/models/guide";
import { LoadGuideEdit } from "./store/guide-edit.actions";
import { filter } from "rxjs/operators";
import { SimpleModalService } from "ngx-simple-modal";
import { CreateSectionComponent } from "./components/create-section/create-section.component";
import { EditSectionComponent, EditSectionModal } from "./components/edit-section/edit-section.component";

@Component({
    selector: "app-guide-edit",
    templateUrl: "guide-edit.template.html",
    styleUrls: ["guide-edit.style.scss"]
})

export class GuideEditComponent implements OnInit, OnDestroy {
    private currentGuide$ = this.store$.pipe(select(getGuide));
    public loading$ = this.store$.pipe(select(getGuideLoading));
    public currentEvent$ = this.store$.pipe(select(fromApp.getCurrentEvent));

    private currentGuideSub$: Subscription;
    private currentEventSub$: Subscription;
    public guide: EventGuide;

    constructor(private store$: Store<State>,
                private translateService: TranslateService,
                private modalService: SimpleModalService) { }

    public ngOnInit() {
        this.currentEventSub$ = this.currentEvent$.pipe(filter((e) => !!e)).subscribe(() => {
            this.store$.dispatch(new LoadGuideEdit());
        });

        this.currentGuideSub$ = this.currentGuide$.subscribe((guide: EventGuide) => {
            this.guide = guide;
        });
    }

    public ngOnDestroy(): void {
        this.currentEventSub$.unsubscribe();
        this.currentGuideSub$.unsubscribe();
    }

    public lang() {
        return this.translateService.defaultLang;
    }

    clickAddSection() {
        this.modalService.addModal(CreateSectionComponent, {guide: this.guide});
    }

    public update(type: string) {
        this.modalService.addModal(EditSectionComponent, {
            type,
            guide: this.guide
        });
    }
}
