"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const start = () => {
    //pasamos el puerto si no será 3000
    const app = new app_1.App();
    app.listen();
};
start();
