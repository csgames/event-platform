import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { SectionFormDto } from "../section-form/dto/section-form.dto";
import { SectionFormComponent } from "../section-form/section-form.component";
import { Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { State, 
         getGuideCreateSectionLoading, 
         getGuideCreateSectionError, 
         getGuideCreateSectionSuccess 
} from "./store/create-section.reducer";
import { CreateSection, ResetState } from "./store/create-section.actions";

@Component({
    selector: "app-create-section",
    templateUrl: "create-section.template.html"
})
export class CreateSectionComponent extends SimpleModalComponent<void, void> implements OnInit, OnDestroy {
    @ViewChild(SectionFormComponent)
    public sectionForm: SectionFormComponent;

    public sectionFormDto: SectionFormDto = new SectionFormDto();

    private successSubscription$: Subscription;

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
