import { AbstractControl, ValidationErrors } from "@angular/forms";

export function matches(otherControlName: string) {
    return function(control: AbstractControl): ValidationErrors | null {
        if (!control.parent || !control.parent.controls[otherControlName]) {
            return null;
        }
        return control.parent.controls[otherControlName].value === control.value ? null : { passwords_mismatch: true };
    };
}
