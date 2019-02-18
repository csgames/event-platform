import { Injectable } from "@angular/core";
import { Track } from "../features/puzzle-hero/models/track";
import { PuzzleTypes } from "../features/puzzle-hero/models/puzzle";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

const STARRED_TRACKS = "STARRED_TRACKS";

@Injectable()
export class PuzzleHeroService {

    getTracks(): Observable<Track[]> {
        return of([
            {
                id: "1",
                label: "Crypto track #1",
                type: PuzzleTypes.Crypto,
                puzzles: [
                    {
                        id: "1",
                        completed: true,
                        locked: false,
                        label: "Puzzle #1",
                        type: PuzzleTypes.Crypto
                    },
                    {
                        id: "2",
                        completed: false,
                        locked: false,
                        label: "Puzzle #2",
                        dependsOn: "1",
                        type: PuzzleTypes.Crypto
                    },
                    {
                        id: "3",
                        completed: false,
                        locked: false,
                        label: "Puzzle #3",
                        dependsOn: "1",
                        type: PuzzleTypes.Crypto
                    },
                    {
                        id: "4",
                        completed: false,
                        locked: true,
                        label: "Puzzle #4",
                        dependsOn: "2",
                        type: PuzzleTypes.Crypto
                    },
                    {
                        id: "5",
                        completed: false,
                        locked: false,
                        label: "Puzzle #5",
                        dependsOn: "1",
                        type: PuzzleTypes.Crypto
                    }
                ]
            },
            {
                id: "2",
                label: "Gaming track #1",
                type: PuzzleTypes.Gaming,
                puzzles: [
                    {
                        id: "1",
                        completed: true,
                        locked: false,
                        label: "Puzzle #1",
                        type: PuzzleTypes.Gaming
                    },
                    {
                        id: "2",
                        completed: false,
                        locked: false,
                        label: "Puzzle #2",
                        dependsOn: "1",
                        type: PuzzleTypes.Gaming
                    },
                    {
                        id: "3",
                        completed: false,
                        locked: false,
                        label: "Puzzle #3",
                        dependsOn: "1",
                        type: PuzzleTypes.Gaming
                    },
                    {
                        id: "4",
                        completed: false,
                        locked: true,
                        label: "Puzzle #4",
                        dependsOn: "2",
                        type: PuzzleTypes.Gaming
                    },
                    {
                        id: "5",
                        completed: false,
                        locked: false,
                        label: "Puzzle #5",
                        dependsOn: "1",
                        type: PuzzleTypes.Gaming
                    }
                ]
            }
        ]).pipe(delay(1000));
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
        if (starredTracks.includes(track.id)) {
            newStarredTracks = starredTracks.filter(t => t !== track.id);
        } else {
            newStarredTracks = [
                ...starredTracks,
                track.id
            ];
        }
        localStorage.setItem(STARRED_TRACKS, JSON.stringify(newStarredTracks));
    }

    isTrackStarred(track: Track): boolean {
        const starredTracks = this.getStarredTracks();
        return starredTracks.includes(track.id);
    }
}
