import { Injectable } from "@angular/core";

// @Injectable({providedIn: 'root'})
export class LoggingService {

    private lastlog : string; 

    printLog(message: string)
    {
        console.log(message);
        console.log(this.lastlog);
        this.lastlog = message; 
    }

}