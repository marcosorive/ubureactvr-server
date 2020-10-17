"use strict";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { Bootstrap} from "../Bootstrap";



export class ModelController {

    public static async getAllModels(req: Request, res: Response): Promise<void> {
        try {
            const models = await Bootstrap.modelService.getAll();
            res.send(models);
        } catch (error) {
            Bootstrap.logger.log("error", "ModelController: (getAllmodels) " + error);
            res.send({
                status: 500,
                error: error
            });
        }

    }

    public static async getModelById(req: Request, res: Response): Promise<void> {
        const modelId: string = req.params.id;
        try {
            let model = await Bootstrap.modelService.getById(modelId);
            res.json({
                status: 200,
                model: model
            });
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelController: (getModelById) " + error);
            res.json({
                status: 500,
                error: error
            });
        }
    }

    public static async deleteModelById(req: Request, res: Response): Promise<void> {
        const modelId: string = req.params.id;
        try {
            Bootstrap.imageService.deleteImagesByModelId(modelId);
            Bootstrap.fileModelService.deleteById(modelId);
            const model = await Bootstrap.modelService.deleteById(modelId);
            res.json({
                status: 200,
                model: model,
            });
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelController: (deleteModelById) " + error);
            res.json({
                status: 500,
                error: error
            });
        }
    }


    public static async uploadModel(req: Request, res: Response): Promise<void> {
        try {
            const modelName: string = req.body.modelName;
            const modelFile: UploadedFile = req.files.modelFile as UploadedFile;
            const textureFile: UploadedFile = req.files.textureFile as UploadedFile;
            const modelPicture: UploadedFile = req.files.modelPicture as UploadedFile;
            const model = await Bootstrap.modelService.addModel(modelName, modelFile.data.length);
            if (textureFile != null) {
                Bootstrap.fileModelService.add(model._id, modelFile, textureFile);
            } else {
                Bootstrap.fileModelService.add(model._id, modelFile);
            }
            if (modelPicture !== undefined) {
                Bootstrap.imageService.addImage(model._id, modelPicture);
            }
            res.json({
                status: 200,
                model: model,
            });
        } catch (error) {
            Bootstrap.logger.log("error", "ModelController: (uploadModel) " + error);
            res.status(500).json({
                status: 500,
                error: error.message
            });
        }

    }

    public static async getModelFileById(req: Request, res: Response): Promise<void> {
        const modelId: string = req.params.id;
        try {
            const file = await Bootstrap.fileModelService.getById(modelId);
            file.pipe(res);
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelController: (getModelFileById) " + error);
            res.status(500).json({
                status: 500,
                error: error.message });
        }
    }

    public static async getModelTextureById(req: Request, res: Response): Promise<void> {
        const modelId: string = req.params.id;
        try {
            const file = await Bootstrap.fileModelService.getTextureById(modelId);
            file.pipe(res);
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelController: (getModelTextureById) " + error);
            res.status(500).json({
                status: 500,
                error: error.message });
        }
    }


    public static async getModelImageById(req: Request, res: Response): Promise<void> {
        const modelId: string = req.params.id;
        try {
            const imageFile = await Bootstrap.imageService.getImagesByModelId(modelId);
            imageFile.pipe(res);
        }
        catch (error) {
            Bootstrap.logger.log("error", "ModelController: (getModelImageById) " + error);
            res.status(500).json({
                status: 500,
                error: error.message });

        }
    }
}