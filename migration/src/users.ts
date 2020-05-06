import { Model, Document } from "mongoose";
import * as mongoose from "mongoose";

export interface Users extends Document {
    Username: string;
    Password: string;
}

export const UsersSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

export class UserService {
    public repository: Model<Users>;

    constructor() {
        mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.repository = mongoose.model("User", UsersSchema, "User");
    }

    public async findAll(): Promise<Users[]> {
        return this.repository.find({});
    }
}
