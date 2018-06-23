import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { connectionType, getConnectionType } from "connectivity";
import { securityService } from "../security.service";
import { idp } from "../model/idp.model"

@Injectable()
export class standbytologinService {

    idp: idp;
    token = "a27cf250553d383da99d35260807f4bd2";
    headers = new Headers({ "apikey": "df0yViaSjdLqNRhvjBQw2R634w08IzPX" });
    options = new RequestOptions({ headers: this.headers });

    getDataPatient (): Observable<any> {
        this.idp = new idp();
        console.log(securityService.getIdp);
        this.idp = JSON.parse(securityService.getIdp);
        console.log(this.idp.username);
        let url = "https://apis.cpa.go.th/patient/" + this.idp.username;
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