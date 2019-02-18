import { Questions } from '../../questions/questions.model';
import * as mongoose from 'mongoose';

export interface PuzzleGraphNodes {
    questionId: (Questions | mongoose.Types.ObjectId | string);
    depends: (Questions | mongoose.Types.ObjectId | string);
}
