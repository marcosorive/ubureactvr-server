"use strict";
import * as mongoose from "mongoose";

export interface IModel extends mongoose.Document {
    name: string;
    diskSize: number;
    dateUploaded: number;
    imageExtension: string;
}