"use strict;";
import { UploadedFile } from "express-fileupload";
import * as fse from  "fs-extra";
import { Bootstrap } from "../Bootstrap";
import { ModelRepository } from "../repository/ModelRepository";
import { pictureDir } from "../utils/constants";

export class ImageService {

    constructor(private modelRepository: ModelRepository) {}

    public async getImagesByModelId(modelId: string): Promise<fse.ReadStream> {
        try {
            const extension = await this.modelRepository.getImageExtenstionById(modelId);
            const path: string = __dirname + "/" + pictureDir + modelId + "." + extension;
            if (await fse.pathExists(path)) {
                return fse.createReadStream(path);
            } else {
                Bootstrap.logger.log("error", "Cannot find picture with id " + modelId + ". Returning placeholder.");
                return fse.createReadStream(__dirname + "/" + pictureDir + "404.jpg");
            }
        } catch (error) {
            Bootstrap.logger.log("error", "ImageService: (getImagesByModelId) " + error);
            throw new Error(error.message);
        }

    }

    public async addImage(modelId: string, modelPicture: UploadedFile): Promise<any> {
        try {
            const extensionRegex = /(?:\.([^.]+))?$/;
            const pictureExtension = extensionRegex.exec(modelPicture.name)[0];
            // Save the picture in local store system.
            await modelPicture.mv(__dirname + "/" + pictureDir + modelId + pictureExtension);
            // Add image extension to model in DB.
            return await this.modelRepository.addImageExtenstion(modelId, pictureExtension.substring(1, pictureExtension.length));
        } catch (error) {
            Bootstrap.logger.log("error", "ImageService: (getImage) " + error);
            throw new Error(error.message);
        }

    }

    public async deleteImagesByModelId(modelId: string): Promise<any> {
        try {
            const extension = await this.modelRepository.getImageExtenstionById(modelId);
            const path: string = __dirname + "/" + pictureDir + modelId + "." + extension;
            // We don't want to throw an error if the file does not exists.
            // That's because images are optional when uploading.
            if (await fse.pathExists(path)) {
                await fse.unlink(path);
            }
        } catch (error) {
            Bootstrap.logger.log("error", "ImageService: (deleteImagesByModelId) " + error);
            throw new Error(error.message);
        }
    }
}