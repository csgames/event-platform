import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TemplatesService } from "./templates.service";
import { CreateTemplateDto, UpdateTemplateDto } from "./templates.dto";
import { Template } from "./templates.model";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { Permissions } from "../../../decorators/permission.decorator";

@Controller("template")
@UseGuards(PermissionsGuard)
export class TemplatesController {
    constructor(private readonly templatesService: TemplatesService) {
    }

    @Post()
    @Permissions("mail-api:create:template")
    public async create(@Body(new ValidationPipe()) createTemplateDto: CreateTemplateDto): Promise<Template> {
        return await this.templatesService.create(createTemplateDto);
    }

    @Get()
    @Permissions("mail-api:get-all:template")
    public async getAll(): Promise<Template[]> {
        return this.templatesService.findAll();
    }

    @Get(":id")
    @Permissions("mail-api:get:template")
    public async getById(@Param("id") id: string): Promise<Template> {
        return this.templatesService.findById(id);
    }

    @Put(":nameOrId")
    @Permissions("mail-api:update:template")
    public async update(
        @Param("nameOrId") nameOrId: string,
        @Body(new ValidationPipe()) updateTemplateDto: UpdateTemplateDto
    ) {
        return this.templatesService.update(nameOrId, updateTemplateDto);
    }

    @Delete(":name")
    @Permissions("mail-api:delete:template")
    public async remove(@Param("name") name: string) {
        return this.templatesService.remove(name);
    }
}
