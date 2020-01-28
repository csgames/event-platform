import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Permissions } from "../../../decorators/permission.decorator";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { CreateSchoolDto } from "./schools.dto";
import { Schools } from "./schools.model";
import { SchoolsService } from "./schools.service";

@ApiTags("School")
@Controller("school")
@UseGuards(PermissionsGuard)
export class SchoolsController {
    constructor(private readonly schoolService: SchoolsService) {
    }

    @Post()
    @Permissions("csgames-api:create:school")
    public async create(@Body(new ValidationPipe()) school: CreateSchoolDto): Promise<Schools> {
        return await this.schoolService.create(school);
    }

    @Get()
    @Permissions("csgames-api:get-all:school")
    public async getAll(): Promise<Schools[]> {
        return await this.schoolService.findAll();
    }

    @Get("query/:query")
    @Permissions("csgames-api:query:school")
    public async query(@Param("query") query: string): Promise<Schools[]> {
        return await this.schoolService.query(query);
    }
}
