import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, UploadedFile, UseFilters, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Permissions } from '../../../decorators/permission.decorator';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { EventsService } from '../events/events.service';
import { EventId } from '../../../decorators/event-id.decorator';
import { QuestionsService } from '../questions/questions.service';

@ApiUseTags('Puzzle')
@Controller('puzzle')
@UseGuards(PermissionsGuard)
export class PuzzleController {
    constructor(private eventsService: EventsService, questionService: QuestionsService) {
    }

    @Post("validate")
    @Permissions('csgames-api:get:event')
    public async validateAnswer(@EventId() id: string): Promise<null> {
        console.log("VALIDATE IS CALLED");
        return null;
    }
}
