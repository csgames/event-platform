import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AddAttendeeFormDto } from "../../../team-view/components/add-attendee-form/dto/add-attendee-form.dto";
import { Subscription } from "rxjs";
import { Attendee } from "../../../../../api/models/attendee";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { ADD_TEAM_FORM_GENERATOR } from "../../team-edit.constants";
import { AddTeamFormDto } from "./dto/add-team-form.dto";
import { School } from "../../../../../api/models/school";

@Component({
    selector: "app-add-team-form",
    templateUrl: "add-team-form.template.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AddTeamFormComponent),
            multi: true
        }
    ]
})
export class AddTeamFormComponent implements OnInit, OnDestroy, ControlValueAccessor {

    @Input()
    schools: School[];

    public formGroup: FormGroup;

    private propagate: (obj: AddTeamFormDto) => void;
    private valueChangesSub$: Subscription;

    constructor(@Inject(ADD_TEAM_FORM_GENERATOR) private formGenerator: FormGenerator<AddTeamFormDto>) { }

    ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangesSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    public ngOnDestroy() {
        this.valueChangesSub$.unsubscribe();
    }

    public writeValue(obj: AddTeamFormDto): void {
        if (obj) {
            this.formGenerator.patchValues(obj);
        }
    }

    public registerOnChange(fn: (obj: AddTeamFormDto) => void) {
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
