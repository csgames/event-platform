import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { TranslateModule } from "@ngx-translate/core";
import { FileUploadModule } from "../file-upload/file-upload.module";
import { DirectivesModule } from "../../directives/directives.module";
import { CustomTextBoxComponent } from "./custom-text-box.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgxMaskModule.forChild(),
        TranslateModule,
        FileUploadModule,
        DirectivesModule
    ],
    declarations: [CustomTextBoxComponent],
    providers: [ ],
    exports: [CustomTextBoxComponent],
})
export class CustomTextBoxFormModule {
}
