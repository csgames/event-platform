import { Component, OnInit } from "@angular/core";
import { EventGuide, EventGuideTypes } from "../../../../../api/models/guide";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Store, select } from "@ngrx/store";
import { State, getGuideEditSectionLoading, getGuideEditSectionError, getGuideEditSectionSuccess } from "./store/edit-section.reducer";
import { EditSection } from "./store/edit-section.actions";

export interface EditSectionModal {
    type: EventGuideTypes;
    guide: EventGuide;
}

@Component({
    selector: "edit-section",
    templateUrl: "edit-section.template.html"
})
export class EditSectionComponent extends SimpleModalComponent<EditSectionModal, void> implements EditSectionModal {
    public guide: EventGuide;
    public type: EventGuideTypes;

    loading$ = this.store$.pipe(select(getGuideEditSectionLoading));
    error$ = this.store$.pipe(select(getGuideEditSectionError));
    success$ = this.store$.pipe(select(getGuideEditSectionSuccess));

    constructor(private store$: Store<State>) {
        super();
    }

    public clickSave() {
        this.store$.dispatch(new EditSection(this.guide));
        this.close();
    }
}
