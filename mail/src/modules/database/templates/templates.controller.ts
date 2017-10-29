import * as express from "express";
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { TemplatesService } from "./templates.service";
import { CreateTemplateDto, UpdateTemplateDto } from "./templates.dto";
import { Template } from "./templates.model";
import { ValidationPipe } from "../../../pipes/validation.pipe";

@Controller("template")
export class TemplatesController {
    constructor(private readonly templatesService: TemplatesService) {
    }

    @Post()
    async create(@Req() req: express.Request, @Body(new ValidationPipe()) createTemplateDto: CreateTemplateDto) {
        // Convert buffer to string
        if (Buffer.isBuffer(createTemplateDto)) {
            createTemplateDto.template = createTemplateDto.toString("utf-8");
        }
        await this.templatesService.create(createTemplateDto);
    }

    @Get()
    async getAll(): Promise<Template[]> {
        return this.templatesService.findAll();
    }

    @Put(":name")
    async update(@Param("name") name: string, @Body(new ValidationPipe()) updateTemplateDto: UpdateTemplateDto) {
        return this.templatesService.update(name, updateTemplateDto);
    }

    @Delete(":name")
    async remove(@Param("name") name: string) {
        return this.templatesService.remove(name);
    }
}
