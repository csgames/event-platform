import { NgModule } from "@angular/core";
import { TimeAgoPipe } from "./timeago.pipe";
import { HoursPipe } from "./hours.pipe";
import { SafePipe } from "./safe.pipe";
import { T18NPipe } from "./t18n.pipe";

@NgModule({
    declarations: [
        TimeAgoPipe,
        HoursPipe,
        T18NPipe,
        SafePipe
    ],
    exports: [
        TimeAgoPipe,
        HoursPipe,
        T18NPipe,
        SafePipe
    ]
})
export class PipeModule {}
