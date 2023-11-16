"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
class HttpResponse {
    constructor(statusCode, httpstatus, message, data) {
        this.statusCode = statusCode;
        this.httpstatus = httpstatus;
        this.message = message;
        this.data = data;
        this.timesStamp = new Date().toLocaleString();
        this.statusCode = statusCode;
        this.httpstatus = httpstatus;
        this.message = message;
        this.data = data;
    }
}
exports.HttpResponse = HttpResponse;
