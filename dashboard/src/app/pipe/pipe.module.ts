import { NgModule } from "@angular/core";
import { TimeAgoPipe } from "./timeago.pipe";
import { HoursPipe } from "./hours.pipe";
import { SafePipe } from "./safe.pipe";
import { T18NPipe } from "./t18n.pipe";
import { LocalizedDatePipe } from "./localized-date.pipe";

@NgModule({
    declarations: [
        TimeAgoPipe,
        HoursPipe,
        SafePipe,
        T18NPipe,
        LocalizedDatePipe
    ],
    exports: [
        TimeAgoPipe,
        HoursPipe,
        SafePipe,
        T18NPipe,
        LocalizedDatePipe
    ]
})
export class PipeModule {}
