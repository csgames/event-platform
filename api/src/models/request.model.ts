import * as express from 'express';
import { UserModel } from './user.model';

export interface RequestModel extends express.Request {
    user: UserModel;
}
