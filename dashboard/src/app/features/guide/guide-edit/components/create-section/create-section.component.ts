import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { SectionFormDto } from "../section-form/dto/section-form.dto";
import { SectionFormComponent } from "../section-form/section-form.component";
import { Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import {
    getGuideCreateSectionError,
    getGuideCreateSectionLoading,
    getGuideCreateSectionSuccess,
    State
} from "./store/create-section.reducer";
import { CreateSection, ResetState } from "./store/create-section.actions";
import { EventGuide, EventGuideTypes } from "src/app/api/models/guide";
import { ForgetFormComponent } from "../../../../forget/components/form/forget-form.component";

export interface CreateSectionModal {
    guide: EventGuide;
}

@Component({
    selector: "app-create-section",
    templateUrl: "create-section.template.html"
})
export class CreateSectionComponent extends SimpleModalComponent<CreateSectionModal, void> implements OnInit, OnDestroy {
    @ViewChild(SectionFormComponent, { static: true })
    public sectionForm: SectionFormComponent;
    public types: string[];
    public sectionFormDto: SectionFormDto = new SectionFormDto();

    private successSubscription$: Subscription;
    private guide: EventGuide;

    loading$ = this.store$.pipe(select(getGuideCreateSectionLoading));
    error$ = this.store$.pipe(select(getGuideCreateSectionError));
    success$ = this.store$.pipe(select(getGuideCreateSectionSuccess));

    constructor(private store$: Store<State>) {
        super();
    }

    ngOnInit() {
        this.store$.dispatch(new ResetState());
        this.successSubscription$ = this.success$.subscribe((success) => {
            if (success) {
                this.close();
            }
        });
        const guideSection = Object.keys(this.guide || {});
        this.types = Object.values(EventGuideTypes).filter((type: string) => !guideSection.some((x) => x === type));
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.successSubscription$.unsubscribe();
    }

    createSection() {
        if (this.sectionForm.validate()) {
            this.store$.dispatch(new CreateSection(this.sectionFormDto));
        }
    }
}
