import { Sponsors } from "src/app/api/models/sponsors";
import { SimpleModalComponent } from "ngx-simple-modal";
import { OnInit, OnDestroy, Component, ViewChild } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State, getLoading, getSuccess } from "./store/update-sponsor-info.reducer";
import { Subscription } from "rxjs";
import { ResetState, UpdateSponsorInfo } from "./store/update-sponsor-info.actions";
import { SponsorFormComponent } from "../sponsor-form/sponsor-form.component";
import { SponsorInfoDto } from "../sponsor-form/dto/sponsor-info.dto";

export interface UpdateSponsorInfoModal {
    sponsor: Sponsors;
}

@Component({
    selector: "app-update-sponsor-info-modal",
    templateUrl: "update-sponsor-info.template.html"
})
export class UpdateSponsorInfoComponent extends SimpleModalComponent<UpdateSponsorInfoModal, void> implements OnInit, OnDestroy {
    @ViewChild(SponsorFormComponent)
    public form: SponsorFormComponent;

    public dto: SponsorInfoDto;
    public sponsor: Sponsors;

    loading$ = this.store$.pipe(select(getLoading));
    success$ = this.store$.pipe(select(getSuccess));
    
    private successSubscription$: Subscription;

    constructor(private store$: Store<State>) {
        super();
    }

    public ngOnInit() {
        this.dto = new SponsorInfoDto();
        this.dto.name = this.sponsor.name;
        this.dto.description = this.sponsor.description;
        this.dto.imageUrl = this.sponsor.imageUrl;
        this.dto.website = this.sponsor.website;
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
            this.store$.dispatch(new UpdateSponsorInfo(this.dto, this.sponsor._id));
        }
    }
}
