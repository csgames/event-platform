import * as mongoose from "mongoose";
import { DateUtils } from "../../../utils/date.utils";
import { Events } from "../events/events.model";
import { TracksAnswers, TracksAnswersSchema } from "./tracks/tracks-answers.model";
import { Tracks, TracksSchema } from "./tracks/tracks.model";

export interface PuzzleHeroes extends mongoose.Document {
    event: Events | mongoose.Types.ObjectId | string;
    tracks: Tracks[];
    answers: TracksAnswers[];
    releaseDate: Date | string;
    endDate: Date | string;
    scoreboardEndDate: Date | string;
    open: boolean;
}

export const PuzzleHeroesSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
        required: true
    },
    tracks: {
        type: [TracksSchema],
        default: []
    },
    answers: {
        type: [TracksAnswersSchema],
        default: []
    },
    releaseDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    scoreboardEndDate: {
        type: Date,
        required: true
    },
    open: {
        type: Boolean,
        default: true
    }
});

export class PuzzleHeroesUtils {
    public static isAvailable(puzzleHero: PuzzleHeroes): boolean {
        const now = DateUtils.nowUTC();
        return now > puzzleHero.releaseDate && now < puzzleHero.endDate && puzzleHero.open;
    }

    public static isScoreboardAvailable(puzzleHero: PuzzleHeroes): boolean {
        const now = DateUtils.nowUTC();
        return now > puzzleHero.releaseDate && now < puzzleHero.scoreboardEndDate && puzzleHero.open;
    }
}
