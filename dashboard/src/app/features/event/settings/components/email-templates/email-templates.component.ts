import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Template } from "../../../../../api/models/template";
import { selectEmailTemplatesSettings, State } from "../../store/event-settings.reducer";
import { LoadTemplate, SaveTemplate } from "./store/email-templates.actions";

@Component({
    selector: "app-email-templates",
    templateUrl: "email-templates.template.html"
})
export class EmailTemplatesComponent implements OnInit {
    currentType: string;
    preview = false;
    html = "";

    loading$ = this.store$.pipe(selectEmailTemplatesSettings(x => x.loading));
    template$ = this.store$.pipe(selectEmailTemplatesSettings(x => x.template));

    constructor(private store$: Store<State>, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            if (params["type"] && params["type"] !== this.currentType) {
                this.currentType = params["type"];
                this.store$.dispatch(new LoadTemplate(this.currentType));
                this.preview = false;
                this.html = "";
            } else if (this.currentType) {
                this.router.navigate([], {
                    queryParams: {
                        type: this.currentType
                    }
                });
            }
        });

        this.template$.subscribe((template: Template) => {
            if (!template) {
                this.html = "";
            } else {
                this.html = template.html;
            }
        });
    }

    togglePreview() {
        this.preview = !this.preview;
    }

    clickSave() {
        this.store$.dispatch(new SaveTemplate({
            type: this.currentType,
            html: this.html
        }));
    }
}
