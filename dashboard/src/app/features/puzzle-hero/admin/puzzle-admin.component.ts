import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { SimpleModalService } from "ngx-simple-modal";
import { EditPuzzleHeroComponent } from "./components/edit-puzzle-hero/edit-puzzle-hero.component";


@Component({
    selector: "app-puzzle-hero-admin",
    templateUrl: "./puzzle-admin.template.html",
    styleUrls: ["./puzzle-admin.style.scss"]
})
export class PuzzleAdminComponent implements OnInit {
    constructor(private modalService: SimpleModalService) { }

    ngOnInit() { }

    editPuzzle() {
        this.modalService.addModal(EditPuzzleHeroComponent);
    }
}
