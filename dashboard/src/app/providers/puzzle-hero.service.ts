import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiService } from "../api/api.service";
import { PuzzleHeroInfo, Score, TeamSeries, Track } from "../api/models/puzzle-hero";

const STARRED_TRACKS = "STARRED_TRACKS";

@Injectable()
export class PuzzleHeroService {

    constructor(private apiService: ApiService) {
    }

    getInfo(): Observable<PuzzleHeroInfo> {
        return this.apiService.puzzleHero.getInfo();
    }

    getTracks(): Observable<Track[]> {
        return this.apiService.puzzleHero.getPuzzleHero().pipe(
            map(x => x.tracks),
            map(x => x.map(track => {
                return {
                    ...track,
                    puzzles: track.puzzles.map(puzzle => {
                        return {
                            ...puzzle,
                            id: (puzzle as any)._id
                        };
                    })
                };
            }))
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
}
