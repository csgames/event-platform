import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ApiService } from "../api/api.service";
import { Track } from "../api/models/puzzle-hero";
import { delay } from "rxjs/operators";
import { Score } from "../features/puzzle-hero/scoreboard/models/score";
import { TeamSeries } from "../features/puzzle-hero/scoreboard/models/team-series";

const STARRED_TRACKS = "STARRED_TRACKS";

@Injectable()
export class PuzzleHeroService {
    constructor(private apiService: ApiService) {}

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
        return of([
            {
                teamId: "1",
                teamName: "TEAM 1",
                schoolName: "Polytechnique Montréal",
                score: 3000
            },
            {
                teamId: "2",
                teamName: "TEAM 2",
                schoolName: "Polytechnique Montréal",
                score: 2050
            },
            {
                teamId: "3",
                teamName: "TEAM 3",
                schoolName: "Polytechnique Montréal",
                score: 2000
            },
            {
                teamId: "4",
                teamName: "TEAM 4",
                schoolName: "Polytechnique Montréal",
                score: 1900
            },
            {
                teamId: "5",
                teamName: "TEAM 5",
                schoolName: "Polytechnique Montréal",
                score: 1800
            },
            {
                teamId: "6",
                teamName: "TEAM 6",
                schoolName: "Polytechnique Montréal",
                score: 1700
            },
            {
                teamId: "7",
                teamName: "TEAM 7",
                schoolName: "Polytechnique Montréal",
                score: 1600
            },
            {
                teamId: "8",
                teamName: "TEAM 8",
                schoolName: "Polytechnique Montréal",
                score: 1500
            },
            {
                teamId: "9",
                teamName: "TEAM 9",
                schoolName: "Polytechnique Montréal",
                score: 1400
            },
            {
                teamId: "10",
                teamName: "TEAM 10",
                schoolName: "Polytechnique Montréal",
                score: 1300
            },
            {
                teamId: "11",
                teamName: "TEAM 11",
                schoolName: "Polytechnique Montréal",
                score: 1200
            },
            {
                teamId: "12",
                teamName: "TEAM 12",
                schoolName: "Polytechnique Montréal",
                score: 1100
            },
            {
                teamId: "13",
                teamName: "TEAM 13",
                schoolName: "Polytechnique Montréal",
                score: 1000
            }
        ]).pipe(delay(1000));
    }

    getTeamsSeries(teams: string[]): Observable<TeamSeries[]> {
        const now = Date.now();
        return of(teams.map(t => {
            let lastValue = 0;
            let lastTime = now;
            return {
                name: "TEAM AVEC UN ESTI DE NOM TROP LONG NUMÉRO " + t,
                series: Array(50).fill(0).map((_, index) => {
                    lastValue += (Math.random() * 100 > 80) ? Math.random() * 100 : Math.random() * 10;
                    lastTime += Math.random() * 60 * 1000;
                    return {
                        value: lastValue,
                        name: new Date(lastTime)
                    };
                })
            };
        })).pipe(delay(500));
    }
}
