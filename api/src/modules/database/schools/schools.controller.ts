import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { CreateSchoolDto } from "./schools.dto";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { Permissions } from "../../../decorators/permission.decorator";

@Controller("school")
@UseGuards(PermissionsGuard)
export class SchoolsController {
    constructor(private readonly schoolService: SchoolsService) { }

    @Post()
    @Permissions('event_management:create:school')
    async create(@Body(new ValidationPipe()) school: CreateSchoolDto) {
        return { school: await this.schoolService.create(school) };
    }

    @Get()
    @Permissions('event_management:get-all:school')
    async getAll() {
        return { schools: await this.schoolService.findAll() };
    }
}
