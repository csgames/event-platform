import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { SectionFormDto } from "../features/guide/guide-edit/components/section-form/dto/section-form.dto";
import { EventGuide } from "../api/models/guide";

@Injectable()
export class GuideService {
    constructor(private apiService: ApiService) { }

    createSection(sectionFormDto: SectionFormDto) {
        return this.apiService.event.createSection(sectionFormDto);
    }

    updateSection(eventGuide: EventGuide) {
        return this.apiService.event.updateSection(eventGuide);
    }
}
