import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { TranslateModule } from "@ngx-translate/core";
import { FileUploadModule } from "../file-upload/file-upload.module";
import { CustomTextBoxComponent } from "./custom-text-box.component";
import { DatepickerModule, BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PopoverModule } from "ngx-bootstrap/popover";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { SimpleModalModule } from "ngx-simple-modal";
import { PuzzleComponentsModule } from "src/app/features/puzzle-hero/components/puzzle-components.module";
import { QuillModule } from "ngx-quill";
import { LMarkdownEditorModule } from "ngx-markdown-editor";
import { FlexLayoutModule } from "@angular/flex-layout";

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
        QuillModule,
        FlexLayoutModule,
        LMarkdownEditorModule
    ],
    declarations: [CustomTextBoxComponent],
    providers: [],
    exports: [CustomTextBoxComponent]
})
export class CustomTextBoxModule {
}
