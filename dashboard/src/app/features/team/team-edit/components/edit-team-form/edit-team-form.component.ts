import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subscription } from "rxjs";
import { Sponsors } from "../../../../../api/models/sponsors";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { EDIT_TEAM_FORM_GENERATOR } from "../../team-edit.constants";
import { EditTeamFormDto } from "./dto/edit-team-form.dto";
import { School } from "../../../../../api/models/school";

@Component({
    selector: "app-edit-team-form",
    templateUrl: "edit-team-form.template.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EditTeamFormComponent),
            multi: true
        }
    ]
})
export class EditTeamFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input()
    schools: School[];

    @Input()
    sponsors: Sponsors[];

    public formGroup: FormGroup;


    private propagate: (obj: EditTeamFormDto) => void;
    private valueChangesSub$: Subscription;

    constructor(@Inject(EDIT_TEAM_FORM_GENERATOR) private formGenerator: FormGenerator<EditTeamFormDto>) { }

    ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangesSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    public ngOnDestroy() {
        this.valueChangesSub$.unsubscribe();
    }

    public writeValue(obj: EditTeamFormDto): void {
        if (obj) {
            this.formGenerator.patchValues(obj);
        }
    }

    public registerOnChange(fn: (obj: EditTeamFormDto) => void) {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any) {
    }

    public validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }

        this.formGenerator.markAsDirty();
        return false;
    }
}
