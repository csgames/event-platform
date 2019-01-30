import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileUploadComponent } from "./file-upload.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    declarations: [FileUploadComponent],
    exports: [FileUploadComponent]
})
export class FileUploadModule {
}
