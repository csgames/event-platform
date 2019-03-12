import { ApiUseTags } from "@nestjs/swagger";
import { Controller, UseGuards, Post, Body, Get } from "@nestjs/common";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { FlashOutsService } from "./flash-out.service";
import { Permissions } from "../../../decorators/permission.decorator";
import { FlashOut } from "./flash-out.model";
import { CreateFlashOutDto } from "./flash-out.dto";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { EventId } from "../../../decorators/event-id.decorator";

@ApiUseTags("FlashOut")
@Controller("flash-out")
@UseGuards(PermissionsGuard)
export class FlashOutController {
    constructor(private readonly flashOutsService: FlashOutsService) { }

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

    @Get()
    @Permissions("csgames-api:get-all:flash-out")
    public async getAll(): Promise<FlashOut[]> {
        return await this.flashOutsService.findAll();
    }
}
