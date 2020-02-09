import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { EventService } from "../../../../../../providers/event.service";
import { GlobalError } from "../../../../../../store/app.actions";
import {
    EventEmailTemplateSettingsActionTypes, LoadTemplate, SaveTemplate, TemplateLoaded, TemplateSaved
} from "./email-templates.actions";

@Injectable()
export class EventEmailTemplateSettingsEffects {
    constructor(private actions$: Actions, private eventService: EventService, private toastrService: ToastrService,
                private translateService: TranslateService) {}

    @Effect()
    loadTemplate$ = this.actions$.pipe(
        ofType<LoadTemplate>(EventEmailTemplateSettingsActionTypes.LoadTemplate),
        switchMap((action: LoadTemplate) => this.eventService.getTemplate(action.payload)
            .pipe(
                map((template) => new TemplateLoaded(template)),
                catchError((err) => of(new GlobalError(err)))
            )
        )
    );

    @Effect()
    saveTemplate$ = this.actions$.pipe(
        ofType<SaveTemplate>(EventEmailTemplateSettingsActionTypes.SaveTemplate),
        switchMap((action: SaveTemplate) => this.eventService.updateTemplate(action.payload.type, action.payload.html)
            .pipe(
                map(() => new TemplateSaved()),
                catchError((err) => of(new GlobalError(err)))
            )
        )
    );

    @Effect({ dispatch: false })
    templateSaved$ = this.actions$.pipe(
        ofType<TemplateSaved>(EventEmailTemplateSettingsActionTypes.TemplateSaved),
        tap(() => this.toastrService.success("", this.translateService.instant("pages.event.settings.email_templates.template_saved")))
    );
}
