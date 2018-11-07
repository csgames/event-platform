import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { Permissions } from '../../../decorators/permission.decorator';
import { SponsorsService } from './sponsors.service';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreateSponsorDto, UpdateSponsorDto } from './sponsors.dto';

@ApiUseTags('Sponsor')
@Controller("sponsor")
@UseGuards(PermissionsGuard)
export class SponsorsController {
    constructor(private sponsorService: SponsorsService) {
    }

    @Post()
    @Permissions('event_management:create:sponsor')
    async create(@Body(new ValidationPipe()) dto: CreateSponsorDto) {
        return await this.sponsorService.create(dto);
    }

    @Put(':id')
    @Permissions('event_management:create:sponsor')
    async update(@Param('id') id: string, @Body(new ValidationPipe()) dto: UpdateSponsorDto) {
        return await this.sponsorService.update({
            _id: id
        }, dto);
    }

    @Get()
    @Permissions('event_management:get-all:sponsor')
    async getAll() {
        return await this.sponsorService.findAll();
    }
}
