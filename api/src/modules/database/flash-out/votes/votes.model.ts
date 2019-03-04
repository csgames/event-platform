import * as mongoose from "mongoose"; 
import { Attendees } from "../../attendees/attendees.model";

export interface Votes extends mongoose.Document {
    attendee: Attendees | mongoose.Types.ObjectId | string;
    rating: number;
}

export const VotesSchema = new mongoose.Schema({
    attendee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "attendees",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});
