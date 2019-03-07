import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiService } from "../api/api.service";
import { PuzzleHero, PuzzleHeroInfo, Score, TeamSeries, Track, PuzzleInfo } from "../api/models/puzzle-hero";
import * as io from "socket.io-client";
import { environment } from "../../environments/environment";
import { PuzzleHeroUtils } from "../features/puzzle-hero/utils/puzzle-hero.utils";
import { TrackFormDto } from "../features/puzzle-hero/admin/components/track-form/dto/track-form.dto";
import { CreateTrackDto, UpdateTrackDto, CreatePuzzleDto } from "../api/dto/puzzle-hero";
import { PuzzleAdminUtils } from "../features/puzzle-hero/admin/puzzle-admin.utils";
import { PuzzleHeroSettingsDto } from "../features/puzzle-hero/admin/components/puzzle-hero-settings/dto/puzzle-hero-settings.dto";
import { PuzzleFormDto } from "../features/puzzle-hero/admin/components/puzzle-form/dto/puzzle-form.dto";

const STARRED_TRACKS = "STARRED_TRACKS";

@Injectable()
export class PuzzleHeroService {
    private socket = io.connect(environment.GATEWAY_URL, {
        path: environment.SOCKET_IO_PATH
    });

    public scoreboardUpdate$ = new Observable((observer) => {
        this.socket.on("scoreboard_update", () => {
            observer.next();
        });
    });

    constructor(private apiService: ApiService) {
    }

    getInfo(): Observable<PuzzleHeroInfo> {
        return this.apiService.puzzleHero.getInfo();
    }

    getPuzzleHero(): Observable<PuzzleHero> {
        return this.apiService.puzzleHero.getPuzzleHero();
    }

    getTracks(): Observable<Track[]> {
        return this.apiService.puzzleHero.getPuzzleHero().pipe(
            map(puzzleHero => PuzzleHeroUtils.formatPuzzleHeroTracksIds(puzzleHero))
        );
    }

    getStarredTracks(): string[] {
        let starredTracks = [];
        const starredTracksContent = localStorage.getItem(STARRED_TRACKS);
        if (starredTracksContent) {
            starredTracks = JSON.parse(starredTracksContent);
        }
        return starredTracks;
    }

    toggleTrackStarred(track: Track) {
        const starredTracks = this.getStarredTracks();

        let newStarredTracks = [];
        if (starredTracks.includes(track._id)) {
            newStarredTracks = starredTracks.filter(t => t !== track._id);
        } else {
            newStarredTracks = [
                ...starredTracks,
                track._id
            ];
        }
        localStorage.setItem(STARRED_TRACKS, JSON.stringify(newStarredTracks));
    }

    isTrackStarred(track: Track): boolean {
        const starredTracks = this.getStarredTracks();
        return starredTracks.includes(track._id);
    }

    getScores(): Observable<Score[]> {
        return this.apiService.puzzleHero.getScoreboard();
    }

    getTeamsSeries(teams: string[]): Observable<TeamSeries[]> {
        return this.apiService.puzzleHero.getTeamsSeries(teams).pipe(
            map(ts => ts.map(t => {
                return {
                    ...t,
                    series: t.series.map(s => {
                        return {
                            ...s,
                            name: new Date(s.name)
                        };
                    })
                };
            }))
        );
    }

    validatePuzzleHero(puzzleId: string, answer: string): Observable<void> {
        return this.apiService.puzzleHero.validatePuzzleHero(puzzleId, answer);
    }

    createTrack(trackFormDto: TrackFormDto): Observable<Track> {
        return this.apiService.puzzleHero.createTrack(PuzzleAdminUtils.trackFormDtoToTrackDto(trackFormDto) as CreateTrackDto);
    }

    updateTrack(id: string, trackFormDto: TrackFormDto): Observable<void> {
        return this.apiService.puzzleHero.updateTrack(id, PuzzleAdminUtils.trackFormDtoToTrackDto(trackFormDto) as UpdateTrackDto);
    }

    updatePuzzleHero(puzzleHeroSettingsDto: PuzzleHeroSettingsDto): Observable<void> {
        return this.apiService.puzzleHero.updatePuzzleHero(PuzzleAdminUtils.puzzleHeroSettingsDtoToPuzzleHero(puzzleHeroSettingsDto));
    }

    createPuzzle(trackId: string, parentId: string, puzzleFormDto: PuzzleFormDto): Observable<PuzzleInfo> {
        return this.apiService.puzzleHero.createPuzzle(trackId, PuzzleAdminUtils.puzzleFormDtoToPuzzleDto(parentId, puzzleFormDto) as CreatePuzzleDto);
    }

    updatePuzzle(trackId: string, id: string, puzzleFormDto: PuzzleFormDto): Observable<void> {
        return this.apiService.puzzleHero.updatePuzzle(trackId, id, PuzzleAdminUtils.puzzleFormDtoToUpdateQuestionDto(puzzleFormDto));
    }
    
}
