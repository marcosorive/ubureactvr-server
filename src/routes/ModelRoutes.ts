"use strict";
import { Router } from "express";
import { ModelController } from "../controllers/ModelController";

export function getModelRoutes(): Router {
    const router: Router = Router();
    router.get("/", ModelController.getAllModels);
    router.get("/:id", ModelController.getModelById);
    router.delete("/:id", ModelController.deleteModelById);
    router.get("/:id/file", ModelController.getModelFileById);
    router.get("/:id/texture", ModelController.getModelTextureById);
    router.get("/:id/image", ModelController.getModelImageById);
    router.post("/upload", ModelController.uploadModel);
    return router;
}