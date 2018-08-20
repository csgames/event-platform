import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { CreateSchoolDto } from "./schools.dto";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { Permissions } from "../../../decorators/permission.decorator";
import { ApiUseTags } from "@nestjs/swagger";

@ApiUseTags('School')
@Controller("school")
@UseGuards(PermissionsGuard)
export class SchoolsController {
    constructor(private readonly schoolService: SchoolsService) {
    }

    @Post()
    @Permissions('event_management:create:school')
    async create(@Body(new ValidationPipe()) school: CreateSchoolDto) {
        return {
            school: await this.schoolService.create(school)
        };
    }

    @Get()
    @Permissions('event_management:get-all:school')
    async getAll() {
        return {
            schools: await this.schoolService.findAll()
        };
    }

    @Get('query/:query')
    @Permissions('event_management:query:school')
    async query(@Param('query') query: string) {
        return {
            schools: await this.schoolService.query(query)
        };
    }
}
