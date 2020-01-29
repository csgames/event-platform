import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Sponsors } from "src/app/api/models/sponsors";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Store, select } from "@ngrx/store";
import { State, getLoading, getSuccess } from "./store/update-sponsor-positionning.reducer";
import { Subscription } from "rxjs";
import { ResetState, UpdatePositionning } from "./store/update-sponsor-positionning.actions";
import { SponsorPositionningDto } from "../sponsor-positionning-form/dto/sponsor-positionning.dto";
import { SponsorPositionningFormComponent } from "../sponsor-positionning-form/sponsor-positionning-form.component";

export interface UpdateSponsorPositionningModal {
    sponsor: Sponsors;
    tier: string;
}

@Component({
    selector: "app-update-sponsor-positionning-modal",
    templateUrl: "update-sponsor-positionning.template.html"
})
export class UpdateSponsorPositionningComponent extends SimpleModalComponent<UpdateSponsorPositionningModal, void>
                                                implements OnInit, OnDestroy {
    @ViewChild(SponsorPositionningFormComponent, { static: true })
    public form: SponsorPositionningFormComponent;
    
    public dto: SponsorPositionningDto;
    public sponsor: Sponsors;
    public tier: string;

    loading$ = this.store$.pipe(select(getLoading));
    success$ = this.store$.pipe(select(getSuccess));
    
    private successSubscription$: Subscription;
    
    constructor(private store$: Store<State>) {
        super();
    }

    public ngOnInit() {
        this.dto = new SponsorPositionningDto();
        this.dto.mobileHeight = this.sponsor.mobile.heightFactor;
        this.dto.mobileWidth = this.sponsor.mobile.widthFactor;
        this.dto.mobileLeftPadding = this.sponsor.mobile.padding[0];
        this.dto.mobileTopPadding = this.sponsor.mobile.padding[1];
        this.dto.mobileRightPadding = this.sponsor.mobile.padding[2];
        this.dto.mobileBottomPadding = this.sponsor.mobile.padding[3];
        this.dto.webHeight = this.sponsor.web.heightFactor;
        this.dto.webWidth = this.sponsor.web.widthFactor;
        this.dto.webLeftPadding = this.sponsor.web.padding[0];
        this.dto.webTopPadding = this.sponsor.web.padding[1];
        this.dto.webRightPadding = this.sponsor.web.padding[2];
        this.dto.webBottomPadding = this.sponsor.web.padding[3];
        this.store$.dispatch(new ResetState());
        this.successSubscription$ = this.success$.subscribe((success) => {
            if (success) {
                this.close();
            }
        });
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.successSubscription$.unsubscribe();
    }

    public onClose() {
        this.close();
    }

    public onSave() {
        if (this.form.validate()) {
            this.store$.dispatch(new UpdatePositionning(this.dto, this.sponsor._id, this.tier));
        }
    }
}
