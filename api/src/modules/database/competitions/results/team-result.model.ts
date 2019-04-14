import * as mongoose from "mongoose";
import { Teams } from "../../teams/teams.model";

export interface TeamResults extends mongoose.Document {
    score: number;
    teamId: Teams | mongoose.Types.ObjectId | string;
}

export const TeamResultsSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teams",
        required: true
    }
});
