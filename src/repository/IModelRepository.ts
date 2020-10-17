"use strict;";

export interface IModelRepository {
    getAll(): Promise<any>;

    getById(modelId: string): Promise<any>;

    add(modelName: string, modelDiskSize: number, modelDateUploaded: number ): Promise<any>;

    addImageExtenstion(modelId: string,  modelImageExtension: string): Promise<any>;
}