import * as mongoose from "mongoose";
import { Events } from "../events/events.model";
import { Schools } from "../schools/schools.model";
import { Votes, VotesSchema } from "./votes/votes.model";

export interface FlashOut extends mongoose.Document {
    event: Events | mongoose.Types.ObjectId | string;
    school: Schools | mongoose.Types.ObjectId | string;
    videoId: string;
    votes: Votes[];
    averageRating: Number;
}

export const FlashOutSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "schools"
    },
    videoId: {
        type: String,
        required: true
    },
    votes: {
        type: [VotesSchema],
        required: true
    },
    averageRating: {
        type: Number
    }
});
