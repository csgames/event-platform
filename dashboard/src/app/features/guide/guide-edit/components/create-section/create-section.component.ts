import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { SectionFormDto } from "../section-form/dto/section-form.dto";
import { SectionFormComponent } from "../section-form/section-form.component";
import { Subscription } from "rxjs";

@Component({
    selector: "app-create-section",
    templateUrl: "create-section.template.html"
})
export class CreateSectionComponent extends SimpleModalComponent<void, void> implements OnInit, OnDestroy {
    @ViewChild(SectionFormComponent)
    public sectionForm: SectionFormComponent;

    public sectionFormDto: SectionFormDto = new SectionFormDto();

    private successSubscription$: Subscription;

    constructor() {
        super();
    }

    ngOnInit() {
        
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.successSubscription$.unsubscribe();
    }

    createTrack() {
        if (this.sectionForm.validate()) {
        }
    }
}
