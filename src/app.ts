"use strict";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as fileUpload from "express-fileupload";
import * as mongoose from "mongoose";
import { config } from "../config/config";
import { Bootstrap } from "./Bootstrap";


export class App {

    private readonly app: express.Application;
    private static readonly db: string = config.mongoURI;

    constructor(private readonly port: number) {
        this.port = port;
        this.app = express();
    }

    public startApp(): void {
        // This process.env.PORT is so the app works correctly in Heroku.
        // That reads the port from enviorment variables insetead of the one hardcorded here.
        this.app.listen(process.env.PORT || this.port, () => {
            new Bootstrap().setup();
            this.config();
        });
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json({ limit: "10mb" }));
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));
        this.app.use(fileUpload());
        // Serving static files
        this.app.use(express.static("public"));
        // Setting the routes
        this.app.use("/api/models", Bootstrap.modelRoutes);
        // Connecting DB
        mongoose.connect(App.db, { useNewUrlParser: true, useCreateIndex: true })
            .then(() => console.log("MongoDB Connected!"))

            .catch((error) => console.log("Error connecting MongoDB: " + error));
    }
}