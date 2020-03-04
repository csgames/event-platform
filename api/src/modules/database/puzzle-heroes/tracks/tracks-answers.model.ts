import * as mongoose from "mongoose";
import { Teams } from "../../teams/teams.model";
import { PuzzleGraphNodes } from "../puzzle-graph-nodes/puzzle-graph.nodes.model";

export interface AnswerData {
    value?: string;
    file?: { type: string, url: string };
}

export interface TracksAnswers extends mongoose.Document {
    puzzle: mongoose.Types.ObjectId | string;
    teamId: Teams | mongoose.Types.ObjectId | string;
    timestamp: Date | string;
    validated: boolean;
    refused?: boolean;
    answer?: AnswerData;
}

export const TracksAnswersSchema = new mongoose.Schema({
    puzzle: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teams",
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    validated: {
        type: Boolean,
        default: true
    },
    refused: {
        type: Boolean,
        required: false
    },
    answer: {
        type: Object,
        required: false
    }
});

export class TracksAnswersUtils {
    public static find(puzzle: PuzzleGraphNodes, teamId: string) {
        return (answer: TracksAnswers) => {
            return (answer.teamId as Teams)._id.toHexString() === teamId &&
                (answer.puzzle as mongoose.Types.ObjectId).toHexString() === (puzzle._id as mongoose.Types.ObjectId).toHexString();
        };
    }

    public static findById(puzzle: PuzzleGraphNodes) {
        return (answer: TracksAnswers) => {
            return (answer.puzzle as mongoose.Types.ObjectId).toHexString() === (puzzle._id as mongoose.Types.ObjectId).toHexString();
        };
    }

    public static findDepends(puzzle: PuzzleGraphNodes, teamId: string) {
        return (answer: TracksAnswers) => {
            return (answer.teamId as Teams)._id.toHexString() === teamId && puzzle.dependsOn &&
                (answer.puzzle as mongoose.Types.ObjectId).toHexString() === (puzzle.dependsOn as mongoose.Types.ObjectId).toHexString();
        };
    }
}
