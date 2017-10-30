import { Component, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { Template } from "./templates.model";
import { CreateTemplateDto, UpdateTemplateDto } from "./templates.dto";

@Component()
export class TemplatesService {
    constructor(@Inject("TemplatesModelToken") private readonly templatesModel: Model<Template>) {
    }

    async create(createTemplateDto: CreateTemplateDto) {
        const template = new this.templatesModel(createTemplateDto);
        return template.save();
    }

    async findAll(): Promise<Template[]> {
        return await this.templatesModel.find().exec();
    }

    async update(name: string, updateTemplateDto: UpdateTemplateDto) {
        return await this.templatesModel.update({ name: name }, updateTemplateDto).exec();
    }

    async remove(name: string) {
        return await this.templatesModel.remove({ name: name }).exec();
    }
}
