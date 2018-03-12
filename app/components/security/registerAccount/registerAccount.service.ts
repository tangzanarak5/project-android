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

    getDataPatient (): Observable<any> {
        this.checkRegister = new checkRegister();
        console.log(securityService.getCheckRegister);
        this.checkRegister = JSON.parse(securityService.getCheckRegister);
        console.log(this.checkRegister.idCard);
        let url = "https://cpa.go.th/api/patient.php?request=get&cid=" + this.checkRegister.idCard + "&token=" + this.token;
        return this.http.get(url).map(response => response.json())
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