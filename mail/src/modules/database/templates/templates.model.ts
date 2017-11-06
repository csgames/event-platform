import * as mongoose from "mongoose";

export interface Template extends mongoose.Document {
    name: string;
    description: string;
    html: string;
}

export const TemplatesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    html: {
        type: String,
        required: true
    },
    description: String
});
