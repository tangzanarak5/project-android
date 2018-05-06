import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { connectionType, getConnectionType } from "connectivity";
import { securityService } from "../security.service";
import { checkRegister } from "../model/checkRegister.model"

@Injectable()
export class registerAccountService {
    
    checkRegister: checkRegister;
    token = "a27cf250553d383da99d35260807f4bd2";
    headers = new Headers({ "apikey": "df0yViaSjdLqNRhvjBQw2R634w08IzPX" });
    options = new RequestOptions({ headers: this.headers });

    getDataPatient (): Observable<any> {
        this.checkRegister = new checkRegister();
        console.log(securityService.getCheckRegister);
        this.checkRegister = JSON.parse(securityService.getCheckRegister);
        console.log(this.checkRegister.idCard);
        let url = "http://apis.cpa.go.th/patient/" + this.checkRegister.idCard ;
        return this.http.get(url, this.options).map(response => response.json())
        .catch(this.handleErrors);
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