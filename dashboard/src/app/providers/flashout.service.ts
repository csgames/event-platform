import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { Flashout, AttendeeVote } from "../api/models/flashout";
import { AddFlashoutDto } from "../features/flashout/flashout-add/dto/add-flashout.dto";

@Injectable()
export class FlashoutService {
    constructor(private apiService: ApiService) { }

    public getAllFlashouts(): Observable<Flashout[]> {
        return this.apiService.event.getAllFlashouts();
    }

    public voteFlashouts(votes: { votes: AttendeeVote[] }): Observable<void> {
        return this.apiService.event.voteFlashouts(votes);
    }

    public addFlashout(dto: AddFlashoutDto): Observable<void> {
        return undefined;
    }
}
