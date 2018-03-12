import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { verifyHnService } from "./verifyHn.service";
import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions } from '@angular/http'
import { connectionType, getConnectionType } from "connectivity";
import { action } from "ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { securityService } from "../security.service";
import { checkHn } from "../model/checkHn.model"
import { ActivityIndicator } from "ui/activity-indicator";
import {LoadingIndicator} from "nativescript-loading-indicator";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';

@Component({
    selector: "verifyHn",
    templateUrl: "verifyHn.component.html",
    styleUrls: ['verifyHn.component.css'],
    moduleId: module.id
})

export class VerifyHnComponent implements OnInit {

    checkHn: checkHn;
    hospitalNumber ;
    res ;
    loader = new LoadingIndicator();
    approved = "ยืนยันการลงทะเบียน"
    
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

    constructor(
        page: Page,
        private router: Router,
        private route: ActivatedRoute,
        private verifyHnService: verifyHnService,
        private fonticon: TNSFontIconService
    ) {
        
        route.url.subscribe((s:UrlSegment[]) => {
            console.log("url", s);
        });
    }

    ngOnInit(): void {
        this.checkHn = new checkHn();
        this.checkHn.idCard = "" ;
        securityService.setCheckHn = JSON.stringify(this.checkHn);
        console.log(securityService.getCheckHn);
        console.log("yes");
        this.checkHn = JSON.parse(securityService.getCheckHn);
        console.log(this.checkHn.idCard);
    }
   
    getHospitalNumber (hn) {

        let nts = this ;
        
        this.verifyHnService.getDataPatient(hn)
        .subscribe(
            (Response) => {
                if (Response.dataset.cid == hn) {
                    if(Response.dataset.status == "approved"){
                    this.loader.hide();
                    console.log('yes');
                    this.hospitalNumberActionDialogPreregister();
                    this.checkHn.idCard = "";
                    securityService.setUserData = JSON.stringify(this.checkHn);
                    }

                else {
                        let noData = {
                        title: "ยืนยันลงทะเบียน",
                        cancelButtonText: "ตกลง",
                        actions: ["ไม่สำเร็จ รอการยืนยันจากเจ้าหน้าที่"]
                    };
                    this.loader.hide();
                        console.log('no'); action(noData)}
                }
                else {
                    this.verifyHnService.getDataPatientReal(hn)
                    .subscribe(
                        (Response) => {
                            if (Response.dataset.cid == hn) {
                                
                                this.loader.hide();
                                console.log('yes');
                                this.hospitalNumberActionDialog(Response.dataset.hn.toString());
                                this.checkHn.idCard = "";
                                securityService.setUserData = JSON.stringify(this.checkHn);
                            }
                            else {
                                let noData = {
                                    title: "ยืนยันลงทะเบียน",
                                    cancelButtonText: "ตกลง",
                                    actions: ["ไม่สำเร็จ รอการยืนยันจากเจ้าหน้าที่"]
                                };
                                this.loader.hide();
                                    console.log('no'); action(noData)
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
    hospitalNumberActionDialog(hn) {
        let options = {
            title: "ลงทะเบียนสำเร็จ",
            cancelButtonText: "ตกลง",
            actions: ["หมายเลขประจำตัวผู้ป่วย คือ " + hn]
        };
        action(options)
    }
    hospitalNumberActionDialogPreregister() {
        let options = {
            title: "ยืนยันลงทะเบียน",
            cancelButtonText: "ตกลง",
            actions: ["สำเร็จ รอรับหมายเลขประจำตัวผู้ป่วย"]
        };
        action(options)
    }

    checkIdCard () {
        this.loader.show(this.options);

        console.log(this.checkHn.idCard);
        
        let test = this.checkHn.idCard.length
        
        if (test != 13) {
            alert("กรุณากรอกหมายเลขบัตรประชาชนให้ครบ 13 หลัก");
            this.loader.hide();
        }
        if (test == 13) {
        this.res = this.checkHn.idCard.split("");
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
                securityService.setUserData = JSON.stringify(this.checkHn);
                //console.log(JSON.stringify(this.checkHn.idCard))
                this.getHospitalNumber(this.checkHn.idCard);
                
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
                securityService.setCheckHn = JSON.stringify(this.checkHn);
                this.getHospitalNumber(this.checkHn.idCard);
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