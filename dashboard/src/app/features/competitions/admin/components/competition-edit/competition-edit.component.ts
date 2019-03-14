import { Competition } from "src/app/api/models/competition";
import { SimpleModalComponent } from "ngx-simple-modal";
import { OnInit, OnDestroy, Component } from "@angular/core";

export interface CompetitionEditModal {
    competition: Competition;
}

@Component({
    selector: "app-competition-edit",
    templateUrl: "competition-edit.template.html",
    styleUrls: ["./competition-edit.style.scss"]
})

export class CompetitionEditComponent extends SimpleModalComponent<CompetitionEditModal, void> implements OnInit, OnDestroy {
    
    ngOnInit() {}

    ngOnDestroy() {}
}
