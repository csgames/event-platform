import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { School } from "../api/models/school";

@Injectable()
export class SchoolService {
    constructor(private apiService: ApiService) {}

    public getAllSchools(): Observable<School[]> {
        return this.apiService.school.getAll();
    }
}
