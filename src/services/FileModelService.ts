"use strict";
import { UploadedFile } from "express-fileupload";
import * as fse from  "fs-extra";
import { Bootstrap } from "../Bootstrap";
import { ModelRepository } from "../repository/ModelRepository";
import { modelDir, textureDir } from "../utils/constants";

export class FileModelService {

    constructor (private modelRepository: ModelRepository) {}

    public async getById(modelId: string): Promise<any> {
        try {
            const path: any = __dirname + "/" + modelDir + modelId + ".obj";
            if (fse.existsSync(path)) {
                const modelFile = fse.createReadStream(path);
                return modelFile;
            } else {
                throw new Error("Error reading file with id " + modelId);
            }
        } catch (error) {
            Bootstrap.logger.log("error", "FileModelService: (getById) " + error);
            throw new Error(error.message);
        }
    }

    public async getTextureById(modelId: string): Promise<any> {
        try {
            const path: any = __dirname + "/" + textureDir + modelId + ".mtl";
            if (fse.existsSync(path)) {
                const modelFile = fse.createReadStream(path);
                return modelFile;
            } else {
                throw new Error("Error reading file with id " + modelId);
            }
        } catch (error) {
            Bootstrap.logger.log("error", "FileModelService: (getTextureById) " + error);
            throw new Error(error.message);
        }
    }

    public async deleteById(modelId: string): Promise<any> {
        try {
            const path: any = __dirname + "/" + modelDir + modelId + ".obj";
            if (fse.existsSync(path)) {
                await fse.unlink(path);
            } else {
                throw new Error("Error deleting file with id " + modelId);
            }
        } catch (error) {
            Bootstrap.logger.log("error", "FileModelService: (deleteById) " + error);
            throw new Error(error.message);
        }
    }

    public async add(modelId: string, modelFile: UploadedFile, textureFile: UploadedFile = null): Promise<any> {
        try {
            const extensionRegex = /(?:\.([^.]+))?$/;
            const modelExtension = extensionRegex.exec(modelFile.name)[0];
            if (textureFile != null) {
                const textureExtension = extensionRegex.exec(textureFile.name)[0];
                textureFile.mv(__dirname + "/" + textureDir + modelId + textureExtension);
            }
            return modelFile.mv(__dirname + "/" + modelDir + modelId + modelExtension);
        } catch (error) {
            Bootstrap.logger.log("error", "FileModelService: (add) " + error);
            throw new Error(error.message);
        }

    }
}