import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { WebHookService } from "./webhook.service";
import { WebHookPipe } from "./webhook.pipe";
import { DeliveredWebHook, DroppedWebHook } from "./webhook.interface";
import { WebHookGuard } from "./webhook.guard";

@Controller("hook")
@UseGuards(WebHookGuard)
export class WebHookController {
    constructor(private readonly webHookService: WebHookService) {}

    @Post("delivered")
    @HttpCode(HttpStatus.OK)
    public async onDelivered(@Body(new WebHookPipe()) deliveredWebHook: DeliveredWebHook) {
        return { success: await this.webHookService.updateStatus(deliveredWebHook)};
    }

    @Post("dropped")
    @HttpCode(HttpStatus.OK)
    public async onDropped(@Body(new WebHookPipe()) droppedWebHook: DroppedWebHook) {
        return { success: await this.webHookService.updateStatus(droppedWebHook)};
    }
}
