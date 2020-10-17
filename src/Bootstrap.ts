"use strict";

import { Router } from "express";
import {Logger} from "winston";
import { ModelRepository } from "./repository/ModelRepository";
import { getModelRoutes } from "./routes/ModelRoutes";
import { FileModelService } from "./services/FileModelService";
import { ImageService } from "./services/ImageService";
import { ModelService } from "./services/ModelService";
import {logger} from "./utils/logger";


export class Bootstrap {

    // Builder patter for mongooseModel instantiation

    public static modelRoutes: Router;
    public static modelService: ModelService;
    public static fileModelService: FileModelService;
    public static imageService: ImageService;
    public static logger: Logger;

    constructor() { }

    public setup(): void {

        const modelRepository = new ModelRepository();
        const fileModelService = new FileModelService(modelRepository);
        const imageService =  new ImageService(modelRepository);
        const modelService =  new ModelService(modelRepository);

        const modelRoutes = getModelRoutes();

        Bootstrap.modelRoutes = modelRoutes;
        Bootstrap.modelService = modelService;
        Bootstrap.fileModelService = fileModelService;
        Bootstrap.imageService = imageService;
        Bootstrap.logger = logger;

    }
}