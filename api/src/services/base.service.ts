import { Model, Document, ModelPopulateOptions } from "mongoose";
import { HttpException } from "@nestjs/core";
import { HttpStatus } from "@nestjs/common";
import { MongoError } from "mongodb";
import { async } from "rxjs/scheduler/async";

export class BaseService<T extends Document, Dto> {
    constructor(private readonly model: Model<T>) { }

    async create(object: Partial<T>): Promise<T> {
        const instance = new this.model(<T>object);
        try {
            return instance.save();
        } catch (e) {
            // Catch mongo errors like required, unique, min, max, etc...
            if (e instanceof MongoError) {
                throw new HttpException({
                    message: e.message,
                    code: e.code
                }, HttpStatus.PRECONDITION_FAILED);
            } else {
                throw e;
            }
        }
    }

    async findAll(populate?: ModelPopulateOptions | string): Promise<T[]> {
        if (!populate) {
            return this.model.find().exec();
        } else {
            return this.model.find().populate(populate).exec();
        }
    }

    async find(conditions: any, populate?: ModelPopulateOptions | string): Promise<T[]> {
        if (!populate) {
            return this.model.find(conditions).exec();
        } else {
            return this.model.find(conditions).populate(populate).exec();
        }
    }

    async findOne(condition: Object, populate?: ModelPopulateOptions | string): Promise<T> {
        if (!populate) {
            return this.model.findOne(condition).exec();
        } else {
            return this.model.findOne(condition).populate(populate).exec();
        }
    }

    async findOneLean(condition: Object, populate?: ModelPopulateOptions | string): Promise<T> {
        if (!populate) {
            return this.model.findOne(condition).lean().exec() as Promise<T>;
        } else {
            return this.model.findOne(condition).populate(populate).lean().exec() as Promise<T>;
        }
    }

    async findById(id: Object | string | number, populate?: ModelPopulateOptions | string): Promise<T> {
        if (!populate) {
            return this.model.findById(id).exec();
        } else {
            return this.model.findById(id).populate(populate).exec();
        }
    }

    async update(condition: Object, data: Partial<T>): Promise<any> {
        return this.model.update(condition, <T>data).exec();
    }

    async remove(condition: Object): Promise<void> {
        return this.model.remove(condition).exec();
    }
}
