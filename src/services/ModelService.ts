"use strict;";
import { Bootstrap } from "../Bootstrap";
import { ModelRepository } from "../repository/ModelRepository";

export class ModelService {

    constructor(private modelRepository: ModelRepository) {}

    public getAll(): Promise<any> {
        try {
            return this.modelRepository.getAll();
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelService: (getAll) " + error);
            throw new Error(error.message);
        }
    }

    public getById(modelId: string) {
        try {
            return this.modelRepository.getById(modelId);
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelService: (getById) " + error);
            throw new Error(error.message);
        }
    }

    public deleteById(modelId: string) {
        try {
            return this.modelRepository.deleteById(modelId);
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelService: (deleteById) " + error);
            throw new Error(error.message);
        }
    }

    public addModel( modelName: string, modelDiskSize: number): Promise<any> {
        try {
            return this.modelRepository.add(modelName, modelDiskSize, Date.now());
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelService: (addModel) " + error);
            throw new Error(error.message);
        }
    }
}