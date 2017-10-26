import * as mongoose from "mongoose";

export interface Attendees extends mongoose.Document {
    readonly email: string;
    readonly github: string;
}

export const AttendeesSchema = new mongoose.Schema({
    email: String,
    github: {
        type: String,
        required: true
    }
});
