import { App } from "./app";

const start = (): void => {

    //pasamos el puerto si no será 3000
    const app = new App();
    app.listen();
}

start();