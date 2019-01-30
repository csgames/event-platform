import { Directive, DoCheck, ElementRef, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { NgControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { createError } from "@angular/core/src/render3/instructions";

@Directive({ selector: "[controlStatus]" })
export class ControlStatusDirective implements OnInit, OnDestroy, DoCheck {
    private valueSubscription: Subscription;
    private parent: HTMLElement;
    private inputGroup: HTMLElement;
    private errorGroup: HTMLElement;
    private isGroup = false;
    private error: HTMLElement;
    private errorPrefix;

    private lastErrorKey = null;

    constructor(
        private el: ElementRef<HTMLElement>,
        private control: NgControl,
        private renderer: Renderer2,
        private translateService: TranslateService
    ) {}

    public ngOnInit() {
        this.inputGroup = this.getInputGroup();
        this.errorGroup = this.getErrorGroup();
        this.parent = this.getParent();
        this.isGroup = !!this.errorGroup;
        this.errorGroup = this.errorGroup ? this.errorGroup : this.parent;
        this.valueSubscription = this.control.statusChanges.subscribe(() => {
            this.checkForError();
        });

        if (this.parent !== this.errorGroup) {
            this.errorPrefix = "errors.group";
        } else {
            this.errorPrefix = "errors";
        }
    }

    public ngOnDestroy() {
        this.valueSubscription.unsubscribe();
        if (this.errorGroup.lastChild === this.error) {
            this.errorGroup.removeChild(this.error);
        }
    }

    public ngDoCheck() {
        this.checkForError();
    }

    private getInputGroup(): HTMLElement {
        let parent: HTMLElement = this.el.nativeElement.parentElement;
        while (parent) {
            if (parent.classList.contains("input-group")) {
                return parent;
            }

            parent = parent.parentElement;
        }

        return null;
    }

    private getParent(): HTMLElement {
        return this.getInputGroup().parentElement;
    }

    private getErrorGroup(): HTMLElement {

        let group: HTMLElement = this.el.nativeElement.parentElement;
        while (group) {
            if (group.classList.contains("error-group")) {
                return group;
            }

            group = group.parentElement;
        }

        return null;
    }

    private getControlError(validationError: string, param?: Object): HTMLElement {
        const children = this.errorGroup.children;
        for (let i = 0; i < children.length; i++) {
            if (children.item(i).classList.contains("control-error")) {
                this.error = children.item(i) as HTMLElement;
                return this.error;
            }
        }
        const error = this.renderer.createElement("span") as HTMLSpanElement;
        error.classList.add("control-error");
        error.innerText = this.translateService.instant(`${this.errorPrefix}.${validationError}`, param);
        if (this.isGroup) {
            const col = this.renderer.createElement("div") as HTMLDivElement;
            col.classList.add("col-sm-12");
            col.classList.add("control-error");
            col.appendChild(error);
            return col;
        }
        return error;
    }

    private checkForError() {
        if (this.control.invalid && this.control.dirty && this.parent) {
            if (!this.inputGroup.classList.contains("has-error")) {
                this.inputGroup.classList.add("has-error");
                this.createError();
            } else if (!Object.keys(this.control.errors).includes(this.lastErrorKey)) {
                this.removeError();
                this.createError();
            }
        } else if (this.parent && this.inputGroup.classList.contains("has-error")) {
            this.inputGroup.classList.remove("has-error");
            this.removeError();
        }
    }

    private createError() {
        for (const error in this.control.errors) {
            if (this.control.errors.hasOwnProperty(error)) {
                if (this.control.errors[error]) {
                    this.lastErrorKey = error;
                    const param: Object = {};
                    if (error === "pattern") {
                        this.lastErrorKey = this.control.errors[error].requiredPattern;
                    }
                    if (error === "minlength" || error === "maxlength") {
                        param["value"] = this.control.errors[error].requiredLength;
                    }
                    this.error = this.getControlError(this.lastErrorKey, param);
                    if (this.error.dataset.errors === "0" || !this.error.dataset.errors) {
                        this.errorGroup.appendChild(this.error);
                        this.error.dataset.errors = "1";
                    } else {
                        this.error.dataset.errors = (Number(this.error.dataset.errors) + 1).toFixed();
                    }
                    break;
                }
            }
        }
    }

    private removeError() {
        this.error.dataset.errors = (Number(this.error.dataset.errors) - 1).toFixed();
        if (this.error.dataset.errors === "0") {
            this.errorGroup.removeChild(this.error);
        }
    }
}
