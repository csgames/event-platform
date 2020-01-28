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
    @Permissions("mail_service:create:template")
    public async create(@Body(new ValidationPipe()) createTemplateDto: CreateTemplateDto) {
        await this.templatesService.create(createTemplateDto);
    }

    @Get()
    @Permissions("mail_service:get-all:template")
    public async getAll(): Promise<Template[]> {
        return this.templatesService.findAll();
    }

    @Put(":name")
    @Permissions("mail_service:update:template")
    public async update(@Param("name") name: string, @Body(new ValidationPipe()) updateTemplateDto: UpdateTemplateDto) {
        return this.templatesService.update(name, updateTemplateDto);
    }

    @Delete(":name")
    @Permissions("mail_service:delete:template")
    public async remove(@Param("name") name: string) {
        return this.templatesService.remove(name);
    }
}
