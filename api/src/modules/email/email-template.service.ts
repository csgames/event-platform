import { Injectable } from "@nestjs/common";
import { EmailBaseService } from "./email-base.service";

export interface Template {
    id?: string;
    name: string;
    html: string;
}

@Injectable()
export class EmailTemplateService extends EmailBaseService {
    constructor() {
        super("template");
    }

    public async createTemplate(template: Template): Promise<Template> {
        return this.post<Template>("", template);
    }

    public async getTemplate(id: string): Promise<Template> {
        return this.get<Template>(id);
    }

    public async updateTemplate(id: string, template: Partial<Template>): Promise<Template> {
        return this.put<Template>(id, template as Template);
    }
}
