"use strict";
import { App } from "./app";

try {
    const DEFTAULT_PORT = 5000;
    new App(DEFTAULT_PORT).startApp();
} catch (error) {
    console.log("Error in server.js: " + error);
}

