import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { TranslateModule } from "@ngx-translate/core";
import { FileUploadModule } from "../file-upload/file-upload.module";
import { CustomTextBoxComponent } from "./custom-text-box.component";
import { PopoverModule, DatepickerModule, BsDatepickerModule, TimepickerModule } from "ngx-bootstrap";
import { SimpleModalModule } from "ngx-simple-modal";
import { PuzzleComponentsModule } from "src/app/features/puzzle-hero/components/puzzle-components.module";
import { QuillModule } from "ngx-quill";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgxMaskModule.forChild(),
        TranslateModule,
        FileUploadModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PopoverModule,
        TranslateModule,
        SimpleModalModule,
        PuzzleComponentsModule,
        NgSelectModule,
        DatepickerModule,
        BsDatepickerModule,
        TimepickerModule,
        QuillModule
    ],
    declarations: [CustomTextBoxComponent],
    providers: [],
    exports: [CustomTextBoxComponent],
})
export class CustomTextBoxModule {
}
