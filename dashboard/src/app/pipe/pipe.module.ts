import { NgModule } from "@angular/core";
import { TimeAgoPipe } from "./timeago.pipe";
import { HoursPipe } from "./hours.pipe";
import { SafePipe } from "./safe.pipe";

@NgModule({
    declarations: [
        TimeAgoPipe,
        HoursPipe,
        SafePipe
    ],
    exports: [
        TimeAgoPipe,
        HoursPipe,
        SafePipe
    ]
})
export class PipeModule {}
