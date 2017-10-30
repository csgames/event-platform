import * as mongoose from "mongoose";

export interface Template extends mongoose.Document {
    name: string;
    description: string;
    template: string;
}

export const TemplatesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    template: {
        type: String,
        required: true
    },
    description: String
});
