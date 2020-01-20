import { FormBuilder } from "@angular/forms";
import { FormGeneratorScanner } from "./scanner";
import { FormGenerator } from "./form-generator";

export class FormGeneratorFactory {
    public static transform<T>(dto: any) {
        const scanner = new FormGeneratorScanner();
        return (formBuilder: FormBuilder) => {
            const generator = new FormGenerator<T>(formBuilder);
            generator.setControls(scanner.getControls(dto));
            return generator;
        };
    }
}
