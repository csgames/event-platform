import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { EventId } from "../../../decorators/event-id.decorator";
import { Permissions } from "../../../decorators/permission.decorator";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { CreateFlashOutDto } from "./flash-out.dto";
import { FlashOut } from "./flash-out.model";
import { FlashOutsService } from "./flash-out.service";

@ApiUseTags("FlashOut")
@Controller("flash-out")
@UseGuards(PermissionsGuard)
export class FlashOutController {
    constructor(private readonly flashOutsService: FlashOutsService) {
    }

    @Post()
    @Permissions("csgames-api:create:flash-out")
    public async create(@Body(new ValidationPipe()) flashOut: CreateFlashOutDto,
                        @EventId() eventId: string): Promise<FlashOut> {
        return await this.flashOutsService.create({
            event: eventId,
            school: flashOut.school,
            videoId: flashOut.videoId
        });
    }
}
