import { AfterViewInit, Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { Uppy, UppyFile } from "@uppy/core";
import * as DragDrop from "@uppy/drag-drop";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "app-file-upload",
    templateUrl: "./file-upload.template.html",
    styleUrls: ["./file-upload.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploadComponent),
            multi: true
        }
    ]
})
export class FileUploadComponent implements AfterViewInit, ControlValueAccessor {
    @Input()
    public placeholder: string;

    @Output()
    public download = new EventEmitter();

    public fileName: string;

    private uppy: Uppy;
    private propagate: (obj: UppyFile) => void;

    constructor() {
    }

    public ngAfterViewInit() {
        this.uppy = new Uppy({
            autoProceed: true,
            onBeforeFileAdded: this.fileAdded.bind(this),
            restrictions: {
                maxFileSize: 1000000,
                maxNumberOfFiles: 1,
                minNumberOfFiles: 0,
                allowedFileTypes: null
            }
        });
        this.uppy.use(DragDrop, {
            target: ".drag-n-drop"
        });
    }

    public writeValue(obj: string | UppyFile): void {
        if (obj) {
            if (typeof obj === "string") {
                this.fileName = obj.split("/").pop();
            } else {
                this.fileName = obj.name;
            }
        }
    }

    public registerOnChange(fn: (obj: UppyFile) => void) {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any) {
    }

    public removeFile() {
        this.fileName = null;
        this.propagate(null);
    }

    private fileAdded(file: UppyFile) {
        this.fileName = file.name;
        this.propagate(file);
    }
}
