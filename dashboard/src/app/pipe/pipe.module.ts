import { NgModule } from "@angular/core";
import { TimeAgoPipe } from "./timeago.pipe";

@NgModule({
    declarations: [TimeAgoPipe],
    exports: [TimeAgoPipe]
})
export class PipeModule {}