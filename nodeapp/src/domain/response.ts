import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";

export class HttpResponse {

    private timesStamp: string;
    constructor(private statusCode: Code, private httpstatus: Status, private message: string, private data?: {}){

        this.timesStamp = new Date().toLocaleString();
        this.statusCode = statusCode;
        this.httpstatus = httpstatus;
        this.message = message;
        this.data = data;
    }
}