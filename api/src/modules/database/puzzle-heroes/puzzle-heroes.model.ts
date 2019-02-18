import * as mongoose from "mongoose";
import { Tracks } from './tracks/tracks.model';
import { TracksAnswers } from './tracks/tracks-answers.model';

export interface PuzzleHeroes extends mongoose.Document {
    tracks: Tracks[];
    answers: TracksAnswers[];
    releaseDate: Date | string;
    endDate: Date | string;
}

export const PuzzleHeroesSchema = new mongoose.Schema({
    tracks: {
        type: [Object],
        required: true
    },
    answers: {
        type: [Object],
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
