import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { connectionType, getConnectionType } from "connectivity";
import { securityService } from "../../security/security.service";
import { idp } from "../../security/model/idp.model"

@Injectable()
export class loginProfileService {

    idp: idp;
    dataUser ;
    token = "a27cf250553d383da99d35260807f4bd2";

    getDataPatient (): Observable<any> {
        this.idp = new idp();
        console.log(securityService.getIdp);
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.idp = JSON.parse(securityService.getIdp);
        console.log(this.dataUser.hn);
        let url = "http://api.cpa.go.th/patient.php?request=get&cid=" + this.dataUser.hn + "&token=" + this.token;
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