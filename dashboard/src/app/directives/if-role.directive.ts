// import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
// import * as fromApp from "../store/app.reducers";
// import { select, Store } from "@ngrx/store";
// import { Subscription } from "rxjs";
// import { filter, tap } from "rxjs/operators";
//
// @Directive({ selector: "[ifRole]" })
// export class IfRoleDirective implements OnInit, OnDestroy {
//     private currentUser$: Subscription;
//
//     @Input("ifRole")
//     roles: string[];
//
//     constructor(private templateRef: TemplateRef<any>,
//                 private viewContainer: ViewContainerRef,
//                 private store: Store<fromApp.State>) {
//     }
//
//     ngOnInit() {
//         this.currentUser$ = this.store.pipe(
//             select(fromApp.getCurrentAttendee),
//             tap(() => this.viewContainer.clear()),
//             filter(u => u && this.roles.includes(u.))
//         ).subscribe(() => {
//             this.viewContainer.createEmbeddedView(this.templateRef);
//         });
//     }
//
//     ngOnDestroy() {
//         this.currentUser$.unsubscribe();
//     }
// }
