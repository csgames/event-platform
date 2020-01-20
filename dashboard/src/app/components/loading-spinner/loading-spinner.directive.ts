import { Directive, TemplateRef } from "@angular/core";

@Directive({ selector: "[ng-loading-body]" })
export class NgLoadingBodyDirective {
    constructor(public template: TemplateRef<any>) { }
}
