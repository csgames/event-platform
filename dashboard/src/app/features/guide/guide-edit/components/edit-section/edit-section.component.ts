import { Component, OnInit } from "@angular/core";
import { EventGuide, EventGuideTypes } from "../../../../../api/models/guide";
import { SimpleModalComponent } from "ngx-simple-modal";

export interface EditSectionModal {
    type: EventGuideTypes;
    guide: EventGuide;
}

@Component({
    selector: "edit-section",
    templateUrl: "edit-section.template.html"
})
export class EditSectionComponent extends SimpleModalComponent<EditSectionModal, void> implements OnInit, EditSectionModal {
    public guide: EventGuide;
    public type: EventGuideTypes;

    constructor() {
        super();
    }

    public ngOnInit() {
    }
}
