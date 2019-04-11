import { NgModule } from "@angular/core";
import { EventFormComponent } from "./event-form.component";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { FormGeneratorFactory } from "../../form-generator/factory";
import { EVENT_FORM_GENERATOR } from "./event-form.constants";
import { EventFormDto } from "./dto/event-form.dto";
import { DirectivesModule } from "../../directives/directives.module";
import { CustomTextBoxModule } from "../custom-text-box/custom-text-box.module";
import { BsDatepickerModule, DatepickerModule, TimepickerModule } from "ngx-bootstrap";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ColorPickerModule } from "ngx-color-picker";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        DirectivesModule,
        CustomTextBoxModule,
        BsDatepickerModule,
        DatepickerModule,
        TimepickerModule,
        FlexLayoutModule,
        ColorPickerModule
    ],
    exports: [EventFormComponent],
    declarations: [EventFormComponent],
    providers: [
        { provide: EVENT_FORM_GENERATOR, useFactory: FormGeneratorFactory.transform(EventFormDto), deps: [FormBuilder] }
    ]
})
export class EventFormModule {}
