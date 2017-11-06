import { Model, Document, ModelPopulateOptions } from "mongoose";

export class BaseService<T extends Document, Dto> {
    constructor(private readonly model: Model<T>) { }

    async create(object: Partial<T>): Promise<T> {
        const instance = new this.model(<T>object);
        return instance.save();
    }

    async findAll(populate?: ModelPopulateOptions): Promise<T[]> {
        if (!populate) {
            return this.model.find().exec();
        } else {
            return this.model.find().populate(populate).exec();
        }
    }

    async findOne(condition: Object, populate?: ModelPopulateOptions): Promise<T> {
        if (!populate) {
            return this.model.findOne(condition).exec();
        } else {
            return this.model.findOne(condition).populate(populate).exec();
        }
    }
}
