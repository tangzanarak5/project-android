import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { connectionType, getConnectionType } from "connectivity";
import { securityService } from "../security.service";
import { user } from "../model/user.model"

@Injectable()
export class formPicAndAcceptService {
    
    user = new user();
    token = "a27cf250553d383da99d35260807f4bd2";
    preregister = "preregister";

    dataSend = {
        token: "a27cf250553d383da99d35260807f4bd2",
        request:"preregister",
        cid: "",
        prename: "",
        fname: "",
        lname: "",
        gender: "",
        birthday: "",
        nation: "",
        religion: "",
        address: "",
        phone: "",
        rightname: "",
        parent_type: "",
        parent_fname: "",
        parent_lname: "",
        parent_phone: "",
        avatar: "",
        symptom: ""
    }
    
    postDataPatient () {
        console.log("connect");
        this.user = JSON.parse(securityService.getUserData);
        console.log(this.user.idCard);
        console.log(this.user);

        let url = "http://api.cpa.go.th/patient.php";
        //let url = "http://192.168.1.12:7777/send";
        // let headers = new Headers();
        // headers.set('Content-Type', 'application/json');
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        // var formData = new FormData();
        

        this.dataSend.cid = this.user.idCard ;
        this.dataSend.prename = this.user.nameTitle ;
        this.dataSend.fname = this.user.name;
        this.dataSend.lname = this.user.surname;
        this.dataSend.gender = this.user.gender;
        this.dataSend.birthday = this.user.birthDay;
        this.dataSend.nation = this.user.nation;
        this.dataSend.religion = this.user.religion;
        this.dataSend.address = this.user.address;
        this.dataSend.phone = this.user.telephone;
        this.dataSend.rightname = this.user.medicalEligibilityVerification;
        this.dataSend.parent_type = this.user.contact;
        this.dataSend.parent_fname = this.user.nameRelative;
        this.dataSend.parent_lname = this.user.surnameRelative;
        this.dataSend.parent_phone = this.user.telephoneRelative;
        this.dataSend.avatar = this.user.pic;
        this.dataSend.symptom = this.user.symptom;
        
        return this.http.post(url, this.dataSend, options)      
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