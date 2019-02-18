import * as mongoose from "mongoose";
import { Tracks, TracksSchema } from './tracks/tracks.model';
import { TracksAnswers, TracksAnswersSchema } from './tracks/tracks-answers.model';
import { Events } from '../events/events.model';

export interface PuzzleHeroes extends mongoose.Document {
    event: Events | mongoose.Types.ObjectId | string;
    tracks: Tracks[];
    answers: TracksAnswers[];
    releaseDate: Date | string;
    endDate: Date | string;
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
    }
});
