"use strict;";
import { Bootstrap } from "../Bootstrap";
import { ModelRepository } from "../repository/ModelRepository";

export class ModelService {

    constructor(private modelRepository: ModelRepository) {}

    public async getAll(): Promise<any> {
        try {
            return await this.modelRepository.getAll();
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelService: (getAll) " + error);
            throw new Error(error.message);
        }
    }

    public async getById(modelId: string) {
        try {
            return await this.modelRepository.getById(modelId);
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelService: (getById) " + error);
            throw new Error(error.message);
        }
    }

    public async deleteById(modelId: string) {
        try {
            return await this.modelRepository.deleteById(modelId);
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelService: (deleteById) " + error);
            throw new Error(error.message);
        }
    }

    public async addModel( modelName: string, modelDiskSize: number): Promise<any> {
        try {
            return await this.modelRepository.add(modelName, modelDiskSize, Date.now());
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelService: (addModel) " + error);
            throw new Error(error.message);
        }
    }
}