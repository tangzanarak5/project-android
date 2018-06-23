import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { connectionType, getConnectionType } from "connectivity";
import { securityService } from "../../security/security.service";
import { idp } from "../../security/model/idp.model"

@Injectable()
export class medicineService {

    idp: idp;
    dataUser ;
    token = "a27cf250553d383da99d35260807f4bd2";

    getDataDayMedicine (hn): Observable<any> {
        let headers = new Headers({ "apikey": "df0yViaSjdLqNRhvjBQw2R634w08IzPX" });
        let options = new RequestOptions({ headers: headers });
        let url = "https://apis.cpa.go.th/finance/" + hn ;
        return this.http.get(url, options).map(response => response.json())
        .catch(this.handleErrors);
    }

    getDataMedicine (hn): Observable<any> {
        let headers = new Headers({ "apikey": "df0yViaSjdLqNRhvjBQw2R634w08IzPX" });
        let options = new RequestOptions({ headers: headers });
        let url = "https://apis.cpa.go.th/drug/" + hn ;
        console.log(url);
        return this.http.get(url, options).map(response => response.json())
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