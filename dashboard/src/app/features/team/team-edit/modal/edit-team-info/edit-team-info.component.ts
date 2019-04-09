import { Component, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Team } from "../../../../../api/models/team";
import { select, Store } from "@ngrx/store";
import { getEditTeamInfoLoading, getSchools, getSponsors, State } from "./store/edit-team-info.reducer";
import { EditTeamFormDto } from "../../components/edit-team-form/dto/edit-team-form.dto";
import { UpdateTeam } from "./store/edit-team-info.actions";

export interface EditTeamInfoModal {
    team: Team;
}

@Component({
    selector: "edit-team-info",
    templateUrl: "edit-team-info.template.html"
})
export class EditTeamInfoComponent extends SimpleModalComponent<EditTeamInfoModal, boolean> implements OnInit, EditTeamInfoModal {
    public team: Team;
    public teamDto: EditTeamFormDto;

    public loading$ = this.store$.pipe(select(getEditTeamInfoLoading));
    public schools$ = this.store$.pipe(select(getSchools));
    public sponsors$ = this.store$.pipe(select(getSponsors));

    constructor(private store$: Store<State>) {
        super();
    }

    public ngOnInit() {
        this.result = false;
        this.teamDto = {
            ...this.team,
            school: this.team.school ? (this.team.school as any)._id : null,
            sponsor: this.team.sponsor ? (this.team.sponsor as any)._id : null
        };
    }

    public save() {
        this.store$.dispatch(new UpdateTeam({ id: this.team._id, team: this.teamDto }));
        this.result = true;
    }
}
