"use strict";
import * as mongoose from "mongoose";
import {Bootstrap} from "../Bootstrap";
import { IModel } from "../interfaces/IModel";
import { IModelRepository } from "./IModelRepository";


const modelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    diskSize: { type: Number, required: true },
    userUploader: { type: String, required: true },
    dateUploaded: { type: Date, default: Date.now },
    imageExtension: {type: String},
});

const ModelMongoose = mongoose.model<IModel>("Model", modelSchema);

export class ModelRepository implements IModelRepository {

    constructor(private modelMongoose = ModelMongoose) {

    }

    public async getAll(): Promise<any> {
        try {
            return await this.modelMongoose.find().sort({dateUploaded: "desc"});
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelRepository: (getAll) " + error);
            throw new Error(error.message);
        }
    }

    public async getById(modelId: string): Promise<any> {
        try {
            return await this.modelMongoose.findOne({ _id: modelId });
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelRepository: (getById) " + error);
            throw new Error(error.message);
        }
    }

    public async deleteById(modelId: string): Promise<any> {
        try {
            return await this.modelMongoose.deleteOne({ _id: modelId });
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelRepository: (deleteById) " + error);
            throw new Error(error.message);
        }
    }


    public async add(modelName: string, modelDiskSize: number, modelDateUploaded: number): Promise<any> {
        try {
            const model: Partial<IModel> = {
                name: modelName,
                diskSize: modelDiskSize,
                dateUploaded: modelDateUploaded};
            return await this.modelMongoose.create(model as IModel);
        } catch (error) {
            Bootstrap.logger.log("error", "ModelRepository: (add) " + error);
            throw new Error(error.message);
        }

    }

    public async addImageExtenstion(modelId: string,  modelImageExtension: string): Promise<any> {
        try {
            const model = await this.getById(modelId);
            model.imageExtension = modelImageExtension;
            return await model.save();
        } catch (error) {
            Bootstrap.logger.log("error", "ModelRepository: (addImageExtension) " + error);
            throw new Error(error.message);
        }
    }

    public async getImageExtenstionById(modelId: string): Promise<string> {
        try {
            const model = await this.getById(modelId);
            return model.imageExtension;
        } catch (error) {
            Bootstrap.logger.log("error", "ModelRepository: (gerrImageExtensionById) " + error);
            throw new Error(error.message);
        }
    }
}


