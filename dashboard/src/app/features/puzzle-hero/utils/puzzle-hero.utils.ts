import { PuzzleHero, PuzzleInfo, Track } from "../../../api/models/puzzle-hero";

export namespace PuzzleHeroUtils {
    export function formatPuzzleHeroTracksIds(puzzleHero: PuzzleHero): Track[] {
        return puzzleHero.tracks.map(track => {
            return {
                ...track,
                puzzles: track.puzzles.map(puzzle => {
                    return {
                        ...puzzle,
                        id: (puzzle as any)._id
                    };
                })
            };
        });
    }

    export function formatPuzzleNode(puzzle: PuzzleInfo): PuzzleInfo {
        return {
            ...puzzle,
            label: puzzle.question.label,
            description: puzzle.question.description,
            type: puzzle.question.type
        };
    }
}
