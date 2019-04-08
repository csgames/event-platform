import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { SectionFormDto } from "../features/guide/guide-edit/components/section-form/dto/section-form.dto";

@Injectable()
export class GuideService {
    constructor(private apiService: ApiService) { }

    createSection(sectionFormDto: SectionFormDto) {
        return this.apiService.event.createSection(sectionFormDto);
    }
}
