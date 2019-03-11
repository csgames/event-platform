import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { Flashout, AttendeeVote } from "../api/models/flashout";
import { FlashoutEditDto } from "../features/flashout/flashout-edit/components/flashout-form/dto/flashout-edit.dto";

@Injectable()
export class FlashoutService {
    constructor(private apiService: ApiService) { }

    public getAllFlashouts(): Observable<Flashout[]> {
        return this.apiService.event.getAllFlashouts();
    }

    public voteFlashouts(votes: { votes: AttendeeVote[] }): Observable<void> {
        return this.apiService.event.voteFlashouts(votes);
    }

    public addFlashout(dto: FlashoutEditDto): Observable<Flashout> {
        return this.apiService.flashout.create(dto as Flashout);
    }
}
