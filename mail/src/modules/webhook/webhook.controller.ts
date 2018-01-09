import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { WebHookService } from "./webhook.service";
import { WebHookPipe } from "./webhook.pipe";
import { DeliveredWebHook, DroppedWebHook } from "./webhook.interface";
import { WebHookGuard } from "./webhook.guard";

@Controller("hook")
@UseGuards(WebHookGuard)
export class WebHookController {
    constructor(private readonly webHookService: WebHookService) {}

    @Post('delivered')
    @HttpCode(200)
    async onDelivered(@Body(new WebHookPipe()) deliveredWebHook: DeliveredWebHook) {
        return { success: await this.webHookService.updateStatus(deliveredWebHook)};
    }

    @Post('dropped')
    @HttpCode(200)
    async onDropped(@Body(new WebHookPipe()) droppedWebHook: DroppedWebHook) {
        return { success: await this.webHookService.updateStatus(droppedWebHook)};
    }
}
