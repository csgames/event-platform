import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { getCurrentEvent, State } from "../../store/app.reducers";
import { select, Store } from "@ngrx/store";
import { mergeMap } from "rxjs/operators";
import { Event } from "../models/event";

@Injectable()
export class EventInterceptor implements HttpInterceptor {

    private currentEvent$ = this.store$.pipe(select(getCurrentEvent));

    constructor(private store$: Store<State>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get("With-Event") === "false") {
            return next.handle(req.clone({
                headers: req.headers.delete("With-Event")
            }));
        }
        return this.currentEvent$.pipe(
            mergeMap((event: Event) => {
                if (!event || !event._id) {
                    return next.handle(req);
                }

                const eventReq = req.clone({
                    headers: req.headers.set("Event-Id", event._id)
                });
                console.log(eventReq);
                return next.handle(eventReq);
            })
        );
    }

}
