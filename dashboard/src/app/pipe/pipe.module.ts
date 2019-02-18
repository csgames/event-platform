import { NgModule } from "@angular/core";
import { TimeAgoPipe } from "./timeago.pipe";
import { HoursPipe } from "./hours.pipe";

@NgModule({
    declarations: [
        TimeAgoPipe,
        HoursPipe
    ],
    exports: [
        TimeAgoPipe,
        HoursPipe
    ]
})
export class PipeModule {}
