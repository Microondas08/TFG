import cors from "cors";
import dotenv from 'dotenv';
import express, { Application, Request, Response } from "express";
import ip from "ip";
import { HttpResponse } from "./domain/response";
import { Code } from "./enum/code.enum";
import { Status } from "./enum/status.enum";
import userRoutes from "./routes/users.routes";

dotenv.config();
console.log(process.env.SERVER_PORT);

export class App{

    private readonly app: Application;
    private readonly APPLICATION_RUNNING = 'application is running on:';
    private readonly ROUTE_NOT_FOUND = 'Route does not exists on the server';



    constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 3000){

        this.app = express();
        this.middleWare();
        this.routes();
    }

    listen(): void {
        
        this.app.listen(this.port);
        console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
    }

    private routes(): void {
    
        this.app.use('/users', userRoutes);
        this.app.get('/', (req: Request,res: Response)=> res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Welcome to resilience API')));
        this.app.all('*', (req: Request,res: Response)=> res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));

    }
    private middleWare(): void {

        //other any application can talk to this backend application
        this.app.use(cors({ origin: '*' }));
        this.app.use(express.json());
    }
}