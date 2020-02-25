import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { Template } from "./templates.model";
import { CreateTemplateDto, UpdateTemplateDto } from "./templates.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class TemplatesService {
    constructor(@InjectModel("Template") private readonly templatesModel: Model<Template>) {
    }

    public async create(createTemplateDto: CreateTemplateDto) {
        const template = new this.templatesModel(createTemplateDto);
        return template.save();
    }

    public async findAll(): Promise<Template[]> {
        return this.templatesModel.find().exec();
    }

    public async findById(id: string): Promise<Template> {
        return this.templatesModel.findOne({ _id: id }).exec();
    }

    public async findOne(nameOrId: string): Promise<Template> {
        const condition = Types.ObjectId.isValid(nameOrId) ? { _id: nameOrId } : { name: nameOrId };
        return this.templatesModel.findOne(condition).exec();
    }

    public async update(nameOrId: string, updateTemplateDto: UpdateTemplateDto) {
        const condition = Types.ObjectId.isValid(nameOrId) ? { _id: nameOrId } : { name: nameOrId };
        return this.templatesModel.updateOne(condition, updateTemplateDto).exec();
    }

    public async remove(name: string) {
        return this.templatesModel.remove({ name: name }).exec();
    }
}
