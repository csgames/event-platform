import * as mongoose from "mongoose";
import { Attendees } from "../../attendees/attendees.model";
import { Teams } from "../../teams/teams.model";

export interface Members extends mongoose.Document {
    team: Teams | mongoose.Types.ObjectId | string;
    attendees: (Attendees | mongoose.Types.ObjectId | string)[];
}

export const MembersSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teams",
        required: true
    },
    attendees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "attendees",
        required: true
    }
});
