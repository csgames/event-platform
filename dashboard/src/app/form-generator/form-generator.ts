import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { isNullOrUndefined } from "util";
import { ControlModel } from "./models/control.model";
import { DateUtils } from "../utils/date.utils";

@Injectable()
export class FormGenerator<T> {
    private _group: FormGroup;
    private controls: ControlModel[];

    constructor(private formBuilder: FormBuilder) {
    }

    public setControls(controls: ControlModel[]) {
        this.controls = controls;
    }

    public generateGroup(controls?: ControlModel[], group?: FormGroup): FormGroup {
        if (!controls) {
            controls = this.controls;
        }
        if (!group) {
            group = this._group = this.formBuilder.group({});
        }

        for (const control of controls) {
            let formControl: AbstractControl;
            if (control.type === "Array") {
                formControl = this.formBuilder.array([]);
            } else if (control.children) {
                formControl = this.generateGroup(control.children, this.formBuilder.group({}));
            } else {
                formControl = this.formBuilder.control(control.defaultValue, control.validators);
            }
            group.addControl(control.name, formControl);
        }

        return group;
    }

    public createGroup(): FormGroup {
        return this.generateGroup(this.controls, this.formBuilder.group({}));
    }

    public markAsDirty(group?: FormGroup): void {
        if (!group) {
            group = this._group;
        }

        for (const control in group.controls) {
            if (group.controls.hasOwnProperty(control)) {
                if ((group.controls[control] as FormArray).length) {
                    for (const c of (group.controls[control] as FormArray).controls) {
                        if ((c as FormGroup).controls) {
                            this.markAsDirty(c as FormGroup);
                        } else {
                            c.markAsDirty({ onlySelf: true });
                        }
                    }
                } else if ((group.controls[control] as FormGroup).controls) {
                    return this.markAsDirty(group.controls[control] as FormGroup);
                } else {
                    group.controls[control].markAsDirty({ onlySelf: true });
                }
            }
        }
    }

    public patchValues(value: T, controls?: ControlModel[], group?: FormGroup): void {
        if (!controls) {
            controls = this.controls;
        }
        if (!group) {
            group = this._group;
        }

        for (const control of controls) {
            if (control.type === "Array") {
                if (!value[control.key]) {
                    continue;
                }

                const hasChildren = !isNullOrUndefined(control.children);
                const array = group.controls[control.key] as FormArray;
                array.controls.splice(0, array.controls.length);
                for (let i = 0; i < value[control.key].length; i++) {
                    if (i >= array.length) {
                        if (hasChildren) {
                            array.push(this.generateGroup(control.children, this.formBuilder.group({})));
                        } else {
                            array.push(this.formBuilder.control(value[control.key][i], Validators.required));
                        }
                    }
                    if (hasChildren) {
                        this.patchFormGroup(value[control.key][i], array.at(i) as FormGroup);
                    } else {
                        array.at(i).patchValue(value[control.key][i]);
                    }
                }
            } else if (control.children) {
                if (value[control.key]) {
                    this.patchValues(value[control.key], control.children, group.controls[control.name] as FormGroup);
                }
            } else {
                this.formatPatchValue(control, group.controls[control.name], value[control.key]);
            }
        }
    }

    public getValues(controls?: ControlModel[], group?: FormGroup): T {
        if (!controls) {
            controls = this.controls;
        }
        if (!group) {
            group = this._group;
        }
        const data: T = Object.assign({});

        for (const control of controls) {
            if (control.type === "Array" && control.children) {
                const array = group.controls[control.name] as FormArray;
                data[control.key] = [];
                for (const child of array.controls) {
                    data[control.key].push(this.getFormGroupValue(control.children, child as FormGroup));
                }
            } else if (control.children) {
                data[control.key] = this.getValues(control.children, group.controls[control.name] as FormGroup);
            } else {
                data[control.key] = this.formatValue(control, group.controls[control.name]);
            }
        }

        return data;
    }

    private patchFormGroup(value: T, group: FormGroup) {
        for (const control in group.controls) {
            if (group.controls.hasOwnProperty(control)) {
                group.controls[control].patchValue(value[control]);
            }
        }
    }

    private formatValue(model: ControlModel, control: AbstractControl, value?: any): any {
        value = value ? value : control.value;
        switch (model.type) {
            case "Number":
                return +value;
            case "Array":
                return (control as FormArray).controls.map(c => c.value);
            default:
                return value;
        }
    }

    private formatPatchValue(model: ControlModel, control: AbstractControl, value: any) {
        let data;
        switch (model.type) {
            case "Date":
                if (typeof value === "string") {
                    data = DateUtils.fromString(value);
                } else {
                    data = value;
                }
                break;
            default:
                data = value;
        }

        control.patchValue(data);
    }

    private getFormGroupValue(controls: ControlModel[], formGroup: FormGroup) {
        const data = Object.assign({});
        for (const control of controls) {
            data[control.key] = this.formatValue(
                control,
                formGroup.controls[control.name],
                formGroup.controls[control.name].value
            );
        }
        return data;
    }
}
