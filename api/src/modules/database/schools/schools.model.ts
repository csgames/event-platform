import * as mongoose from "mongoose";

export interface Schools extends mongoose.Document {
   name: string;
   website: string;
   countryCode: string;
}

export const SchoolsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    }
});
