import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Permissions } from '../../../decorators/permission.decorator';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreateSchoolDto } from './schools.dto';
import { Schools } from './schools.model';
import { SchoolsService } from './schools.service';

@ApiUseTags('School')
@Controller("school")
@UseGuards(PermissionsGuard)
export class SchoolsController {
    constructor(private readonly schoolService: SchoolsService) {
    }

    @Post()
    @Permissions('event_management:create:school')
    public async create(@Body(new ValidationPipe()) school: CreateSchoolDto): Promise<{ school: Schools }> {
        return {
            school: await this.schoolService.create(school)
        };
    }

    @Get()
    @Permissions('event_management:get-all:school')
    public async getAll(): Promise<{ schools: Schools[] }> {
        return {
            schools: await this.schoolService.findAll()
        };
    }

    @Get('query/:query')
    @Permissions('event_management:query:school')
    public async query(@Param('query') query: string): Promise<{ schools: Schools[] }> {
        return {
            schools: await this.schoolService.query(query)
        };
    }
}
