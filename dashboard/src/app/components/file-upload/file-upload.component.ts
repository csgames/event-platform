import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Uppy, UppyFile } from "@uppy/core";
import * as DragDrop from "@uppy/drag-drop";
import { FormControl, FormControlDirective } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
    selector: "app-file-upload",
    templateUrl: "./file-upload.template.html",
    styleUrls: ["./file-upload.style.scss"]
})
export class FileUploadComponent implements OnInit, OnDestroy, AfterViewInit {
    private _filename: string;

    @Input()
    public placeholder: string;

    @Output()
    public download = new EventEmitter();

    public set fileName(value: string | UppyFile) {
        if (!value) {
            this._filename = null;
            return;
        }

        if (typeof value === "string" ) {
            this._filename = value;
        } else {
            this._filename = value.name;
        }
    }

    public get fileName(): string | UppyFile {
        return this._filename;
    }

    private uppy: Uppy;
    private control: FormControl;
    private valueChange$: Subscription;

    constructor(private formControlDirective: FormControlDirective) {
    }

    public ngOnInit() {
        this.control = this.formControlDirective.control;
        this.fileName = this.control.value;
        this.valueChange$ = this.control.valueChanges.subscribe(value => {
            this.fileName = value;
        });
    }

    public ngOnDestroy() {
        this.valueChange$.unsubscribe();
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

    public removeFile() {
        this.control.setValue(null);
        this.control.markAsDirty();
    }

    private fileAdded(file: UppyFile) {
        this.fileName = file.name;
        this.control.setValue(file);
        this.control.markAsDirty();
    }
}
