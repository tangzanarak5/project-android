import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { verifyidcardService } from "./verifyidcard.service";
import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions } from '@angular/http'
import { connectionType, getConnectionType } from "connectivity";
import { Page } from "tns-core-modules/ui/page";
import { user } from "../model/user.model"
import { securityService } from "../security.service";
import { ActivityIndicator } from "ui/activity-indicator";
import {LoadingIndicator} from "nativescript-loading-indicator";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';

@Component({
    selector: "verifyidcard",
    templateUrl: "verifyidcard.component.html",
    styleUrls: ['verifyidcard.component.css'],
    moduleId: module.id
})

export class verifyidcardComponent implements OnInit {
    
    idCard = "";
    res;
    user: user ;
    loader = new LoadingIndicator();

     options = {
        message: 'Loading...',
        progress: 0.65,
        android: {
          indeterminate: true,
          cancelable: true,
          cancelListener: function(dialog) { console.log("Loading cancelled") },
          max: 100,
          progressNumberFormat: "%1d/%2d",
          progressPercentFormat: 0.53,
          progressStyle: 1,
          secondaryProgress: 1
        },
        ios: {
          details: "Additional detail note!",
          margin: 10,
          dimBackground: true,
          color: "#4B9ED6", // color of indicator and labels
          // background box around indicator
          // hideBezel will override this if true
          backgroundColor: "yellow",
          userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
          hideBezel: true, // default false, can hide the surrounding bezel
        }
      };

    ngOnInit(): void {
        this.user = new user();
        this.user.idCard = "";
        this.user.nameTitle = "";
        this.user.name = "";
        this.user.surname = "" ;
        this.user.gender = "" ;
        this.user.birthDay = "";
        this.user.nation = "" ;
        this.user.religion = "" ;
        this.user.address = "" ;
        this.user.telephone = "" ;
        this.user.medicalEligibilityVerification = "" ;
        this.user.symptom = "" ;
        this.user.nameRelative = "" ;
        this.user.surnameRelative = "" ;
        this.user.contact = "" ;
        this.user.telephoneRelative = "" ;
        this.user.pic = "";
        securityService.setUserData = JSON.stringify(this.user);
        console.log(securityService.getUserData);
        this.user = JSON.parse(securityService.getUserData);
    }

    getDataPeople () {
        let nts = this ;
        this.verifyidcardService.getDataPatient()
        .subscribe(
            (Response) => {

                //let resultUserData = Response.dataset.find(item => item.cid === vm.idCard);
                
                if (Response.dataset.cid == nts.user.idCard) {
                    console.log('yes');
                    alert("หมายเลขบัตรประชาชนนี้ลงทะเบียนแล้ว");
                    this.loader.hide();
                }
                    else {
                        this.verifyidcardService.getDataPatientRegister().subscribe(
                            (Response) => {
                
                                //let resultUserData = Response.dataset.find(item => item.cid === vm.idCard);
                                
                                if (Response.dataset.cid == nts.user.idCard) {
                                    console.log('yes');
                                    alert("หมายเลขบัตรประชาชนนี้ลงทะเบียนแล้ว");
                                    this.loader.hide();
                                }
                                    else {
                                            console.log('no');
                                            this.router.navigate(["/security/formProfileRecord"]);
                                            this.loader.hide();
                                        }
                            },
                            (error) => {
                                alert("Get Error");
                                this.loader.hide();
                            }
                        )
                        }
            },
            (error) => {
                alert("Get Error");
                this.loader.hide();
            }
        )
        
    } 
 constructor(
    page: Page,
    private router: Router,
    private route: ActivatedRoute,
    private verifyidcardService: verifyidcardService,
    private fonticon: TNSFontIconService
) {
    route.url.subscribe((s:UrlSegment[]) => {
        console.log("url", s);
    });
}
 
    checkIdCard () {
        this.loader.show(this.options);
        let test = this.user.idCard.length
        
        if (test != 13) {
            alert("กรุณากรอกหมายเลขบัตรประชาชนให้ครบ 13 หลัก");
            this.loader.hide();
        }
        if (test == 13) {
        this.res = this.user.idCard.split("");
        console.log(this.res);
        let r = 13;
        let result=[];
        let total=0;
        let sum=0;
        let CheckDigit=0;
        let SumDigit=0;
        for(let i = 0;i<12;i++){
           result[i] = this.res[i] * r;
            r--;
            total = total + result[i];
            console.log(result[i] + "\n");
        }
        console.log(total);
        sum = sum + (total%11);
        console.log(sum);
        CheckDigit = 11-sum;
        console.log(CheckDigit);

        if(CheckDigit >= 10){
           SumDigit = CheckDigit%10;
           if(SumDigit == this.res[12]){
                console.log("หมายเลขบัตรประชาชนถูกต้อง");
                // this.user.idCard = this.idCard ;
                securityService.setUserData = JSON.stringify(this.user);
                //console.log(JSON.stringify(this.user));
                this.getDataPeople();
                
           }
           else{
                console.log("หมายเลขบัตรประชาชนไม่ถูกต้อง");
                alert("หมายเลขบัตรประชาชนไม่ถูกต้อง");
                this.loader.hide();
           }
        }
        if(CheckDigit < 10){
            if(CheckDigit == this.res[12]){
                console.log("หมายเลขบัตรประชาชนถูกต้อง");
                // this.user.idCard = this.idCard ;
                securityService.setUserData = JSON.stringify(this.user);
                //console.log(JSON.stringify(this.user))
                this.getDataPeople();
           }
           else{
                console.log("หมายเลขบัตรประชาชนไม่ถูกต้อง");
                alert("หมายเลขบัตรประชาชนไม่ถูกต้อง");
                this.loader.hide();
           }
        }
    }
    }
 }