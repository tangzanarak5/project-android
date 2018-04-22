import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { connectionType, getConnectionType } from "connectivity";
import { securityService } from "../../../security/security.service";
import { idp } from "../../../security/model/idp.model"

@Injectable()
export class bloodChartService {

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

    getFBS () {
        return [
            { DateCount: "14 Jan 2017", dataResult: 140, count: 1 },
            { DateCount: "02 Mar 2017", dataResult: 135, count: 2 },
            { DateCount: "26 May 2017", dataResult: 125, count: 3 },
            { DateCount: "05 Jul 2017", dataResult: 120, count: 4 },
            { DateCount: "18 Sep 2017", dataResult: 115, count: 5 },
            { DateCount: "20 Nov 2017", dataResult: 110, count: 6 },
            { DateCount: "28 Jan 2018", dataResult: 100, count: 7 }
        ];
    }

    getHBAONEC () {
        return [
            { DateCount : "14 May 2017", dataResult : 8, count : 1 },
            { DateCount : "02 Dec 2017", dataResult : 7, count : 2 },
            { DateCount : "26 Feb 2017", dataResult : 6.5, count : 3 },
            { DateCount : "28 Mar 2017", dataResult : 6, count : 4 },
            { DateCount : "28 Apr 2017", dataResult : 5.7, count : 5 },
            { DateCount : "28 May 2017", dataResult : 5.5, count : 6 },
            { DateCount : "28 Jan 2018", dataResult : 5, count : 7 }
        ] ;
    }

    getLDL () {
        return [
            { DateCount : "14 May 2017", dataResult : 180, count : 1 },
            { DateCount : "02 Dec 2017", dataResult : 160, count : 2 },
            { DateCount : "26 Feb 2017", dataResult : 120, count : 3 },
            { DateCount : "05 Mar 2017", dataResult : 110, count : 4 },
            { DateCount : "28 Mar 2017", dataResult : 100, count : 5 },
            { DateCount : "28 Apr 2017", dataResult : 95, count : 6 },
            { DateCount : "28 May 2018", dataResult : 90, count : 7 },
            { DateCount : "28 Jun 2018", dataResult : 95, count : 8 }
        ] ;
    }

    getHDL () {
        return [
            { DateCount : "14 May 2017", dataResult : 80, count : 1 },
            { DateCount : "02 Dec 2017", dataResult : 80, count : 2 },
            { DateCount : "26 Feb 2017", dataResult : 70, count : 3 },
            { DateCount : "05 Mar 2017", dataResult : 60, count : 4 },
            { DateCount : "28 Mar 2017", dataResult : 50, count : 5 },
            { DateCount : "28 Apr 2017", dataResult : 45, count : 6 },
            { DateCount : "28 May 2018", dataResult : 56, count : 7 },
            { DateCount : "28 Jun 2018", dataResult : 50, count : 8 }
        ] ;
    }

    getP () {
        return [
            { DateCount : "14 May 2017", dataResult : 145, count : 1},
            { DateCount : "02 Dec 2017", dataResult : 120, count : 2},
            { DateCount : "26 Feb 2017", dataResult : 105, count : 3},
            { DateCount : "05 Mar 2017", dataResult : 90, count : 4},
            { DateCount : "28 Mar 2017", dataResult : 80, count : 5}
        ] ;
    }

    getBP () {
        return [
            { DateCount : "14 May 2017", dataResult : 160, count : 1},
            { DateCount : "02 Dec 2017", dataResult : 160, count : 2},
            { DateCount : "26 Feb 2017", dataResult : 140, count : 3},
            { DateCount : "05 Mar 2017", dataResult : 120, count : 4},
            { DateCount : "28 Mar 2017", dataResult : 90, count : 5}
        ] ;
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