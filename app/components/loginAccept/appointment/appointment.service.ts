import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { connectionType, getConnectionType } from "connectivity";

@Injectable()
export class appointmentService {
    dataPost = [{
        timeShow: "",
        docterWorkingTime: "",
        appoint_id: "",
        docterWorkingDay: "",
        appoint_day: "",
        appoint_time: ""
    }]
    getAppointment (): Observable<any> {
        let url = "http://192.168.1.37:8080/appointment";
        return this.http.get(url).map(response => response.json())
        .catch(this.handleErrors);
    }
    
    getDocterworking (): Observable<any> {
        let url = "http://192.168.1.37:8080/docterworking";
        return this.http.get(url).map(response => response.json())
        .catch(this.handleErrors);
    }

    postAppoint (timeShow, docterWorkingTime, appoint_id, docterWorkingDay, appoint_day, appoint_time) {
        console.log("connect");
        this.dataPost[0].timeShow = timeShow
        this.dataPost[0].docterWorkingTime = docterWorkingTime
        this.dataPost[0].appoint_id = appoint_id
        this.dataPost[0].docterWorkingDay = docterWorkingDay
        this.dataPost[0].appoint_day = appoint_day
        this.dataPost[0].appoint_time = appoint_time
        let url = "http://192.168.1.37:8080/postAppoint";
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });  
        
        return this.http.post(url,this.dataPost[0], options)      
        .subscribe(result => 
            {
               console.log("response : " + result);
            }, error => 
            {
            console.dir(error);
            });
    }
  
  
    constructor(
        private router: Router,
        private http: Http
    ) { }
handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
}
}