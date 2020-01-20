import { Injectable } from "@angular/core";
import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PuzzleHero, PuzzleHeroInfo, Score, TeamSeries, Track, PuzzleInfo } from "./models/puzzle-hero";
import { CreateTrackDto, UpdateTrackDto, CreatePuzzleDto } from "./dto/puzzle-hero";
import { UpdateQuestionDto } from "./dto/question";

@Injectable()
export class PuzzleHeroApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("puzzle-hero");
    }

    public getInfo(): Observable<PuzzleHeroInfo> {
        return this.http.get<PuzzleHeroInfo>(this.url("info"), { withCredentials: true });
    }

    public updatePuzzleHero(puzzleHero: PuzzleHero): Observable<void> {
        return this.http.put<void>(this.url(), puzzleHero, { withCredentials: true });
    }

    public getPuzzleHero(): Observable<PuzzleHero> {
        return this.http.get<PuzzleHero>(this.url(), { withCredentials: true });
    }

    public getScoreboard(): Observable<Score[]> {
        return this.http.get<Score[]>(this.url("scoreboard"), { withCredentials: true });
    }

    public getTeamsSeries(teamsIds: string[]): Observable<TeamSeries[]> {
        return this.http.get<TeamSeries[]>(this.url(`team-series?teams-ids=${teamsIds.join(",")}`), { withCredentials: true });
    }

    public validatePuzzleHero(puzzleId: string, answer: string): Observable<void> {
        return this.http.post<void>(this.url(`puzzle/${puzzleId}/validate`), { answer }, { withCredentials: true });
    }

    public createTrack(createTrackDto: CreateTrackDto): Observable<Track> {
        return this.http.post<Track>(this.url("track"), createTrackDto, { withCredentials: true });
    }

    public updateTrack(id: string, updateTrackDto: UpdateTrackDto): Observable<void> {
        return this.http.put<void>(this.url(`track/${id}`), updateTrackDto, { withCredentials: true });
    }

    public createPuzzle(trackId: string, createPuzzleDto: CreatePuzzleDto): Observable<PuzzleInfo> {
        return this.http.post<PuzzleInfo>(this.url(`track/${trackId}/puzzle`), createPuzzleDto, { withCredentials: true });
    }

    public updatePuzzle(trackId: string, id: string, updateQuestionDto: UpdateQuestionDto): Observable<void> {
        return this.http.put<void>(this.url(`track/${trackId}/puzzle/${id}`), updateQuestionDto, { withCredentials: true });
    }
}
