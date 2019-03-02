import { NgModule } from "@angular/core";
import { TimeAgoPipe } from "./timeago.pipe";
import { HoursPipe } from "./hours.pipe";
import { T18NPipe } from "./t18n.pipe";

@NgModule({
    declarations: [
        TimeAgoPipe,
        HoursPipe,
        T18NPipe
    ],
    exports: [
        TimeAgoPipe,
        HoursPipe,
        T18NPipe
    ]
})
export class PipeModule {}
