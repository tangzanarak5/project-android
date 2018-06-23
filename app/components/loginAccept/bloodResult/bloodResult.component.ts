import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { loginProfileService } from "../loginProfile/loginProfile.service";
import * as wrapLayoutModule from "tns-core-modules/ui/layouts/wrap-layout";
import * as dialogs from "ui/dialogs";
import { ActivityIndicator } from "ui/activity-indicator";
import * as utils from "utils/utils";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { sideBarComponent } from "../loginProfile/sideBar/sideBar.component";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {LoadingIndicator} from "nativescript-loading-indicator";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as frameModule from "tns-core-modules/ui/frame";
import {Input, ChangeDetectionStrategy} from '@angular/core';
import { selectBlood } from "../../security/model/selectBlood.model"
import { loginProfileComponent } from "../loginProfile/loginProfile.component";
import { RouterExtensions, SetupItemViewArgs } from "nativescript-angular";
import { bloodResultService } from "./bloodResult.service";
import { info } from "../../security/model/info.model"
import { showInfoComponent } from "./bloodResultSelect/showInfo/showInfo.component";
import { dayVisit } from "../../security/model/dayVisit.model";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "bloodResult",
    templateUrl: "bloodResult.component.html",
    styleUrls: ['bloodResult.component.css'],
    moduleId: module.id
})


export class bloodResultComponent implements OnInit {
    selectBlood: selectBlood ;
    dayVisit: dayVisit ;
    public myItems: Array<DataItem>;
    private counter: number;
    bloodResult ;

    disease = [
        {
            namee : "HbA1C",
            namet : "ระดับน้ำตาลเฉลี่ยในเลือด"
        },
        {
            namee : "Glucose",
            namet : "ระดับน้ำตาลในเลือด"
        },
        {
            namee : "HDL",
            namet : "ไขมันดี"
        },
        {
            namee : "LDL",
            namet : "ไขมันไม่ดี"
        },
        {
            namee : "Triglycerides",
            namet : "ไตรกลีเซอไรด์สารอาหารประเภทไขมัน"
        },
        {
            namee : "RBC",
            namet : "ปริมาณเซลล์เม็ดเลือดแดง"
        },
        {
            namee : "Bilirubin",
            namet : "การสลายตัวของเม็ดเลือดแดง"
        },
        {
            namee : "Hb",
            namet : "ฮีโมโกลบินโปรตีนภายในเซลล์เม็ดเลือดแดง"
        },
        {
            namee : "Hct",
            namet : "เฮมาโตคริตความเข้มข้นของเลือด"
        },
        {
            namee : "MCV ",
            namet : "ปริมาตรของเซลล์เม็ดเลือดแดง"
        },
        {
            namee : "Urobilinogen",
            namet : "สารในปัสสาวะ"
        },
        {
            namee : "pH",
            namet : "ความเป็นกรด–ด่าง"
        },
        {
            namee : "Protein",
            namet : "โปรตีน"
        },
        {
            namee : "Ketone",
            namet : "สารคีโตนในปัสสาวะ"
        }
    ] ;
    info: info ;
    dataLab ;
    dataUser ;
    hospitalnumber ;
    loader = new LoadingIndicator();
    count ;
    dataTotal ;
    dataTotalShow = []
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

    @ViewChild('sidebar') sideBar: sideBarComponent

    openDrawer () {
        this.sideBar.openDrawer() ;
    }

    public onItemTap(args) {
        this.loader.show(this.options);
        console.log(this.dataTotal[args.index].visitdate) ;
        this.dayVisit.dayDate = this.dataTotal[args.index].visitdate ;
        securityService.setDayVisit = JSON.stringify(this.dayVisit) ;
        this.dayVisit = JSON.parse(securityService.getDayVisit);
        console.log(securityService.getDayVisit);
        this.router.navigate(["/bloodResultSelectTotal"]) ;
        this.demoLoader() ;
    }

    ngOnInit(): void {
        this.dataUser = JSON.parse(securityService.getDataUser) ;
        this.hospitalnumber = this.dataUser.dataset.hn ;
        console.log(this.hospitalnumber) ;
        this.dayVisit = new dayVisit ;
        this.dayVisit.dayDate = "" ;
        securityService.setDayVisit = JSON.stringify(this.dayVisit);
        console.log(securityService.getDayVisit);
        this.dayVisit = JSON.parse(securityService.getDayVisit) ;

        this.bloodResultService.getDataDayLab(this.hospitalnumber)
                    .subscribe(
                        (Response) => {
                            this.dataTotal = Response.dataset ;
                            for (let i = 0 ; i < this.dataTotal.length ; i++) {
                            if(this.dataTotal[i].operation_pay != "0") {
                                this.dataTotalShow.push(this.dataTotal[i]) ;
                                console.log(this.dataTotalShow) ;
                            }
                        }
                        },
                        (error) => {
                            console.log("data error") ;
                            alert("กรุณาลองอีกครั้ง") ;
                            this.router.navigate(["/loginProfile"]) ;
                        }
                    )
                    setTimeout(() => {
                        this.loader.hide() ;
                      }, 1000) ;
        
        // this.dataUser = JSON.parse(securityService.getDataUser) ;
        // this.hospitalnumber = this.dataUser.dataset.hn
        // this.info = new info ;
        // this.info.name = "" ;
        // this.info.numberIndex = "" ;
        // securityService.setInfo = JSON.stringify(this.info);
        // console.log(securityService.getInfo) ;

    }

    constructor(
        private fonticon: TNSFontIconService,
        private _changeDetectionRef: ChangeDetectorRef,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        private bloodResultService: bloodResultService,
        private routerExtensions: RouterExtensions,
        page: Page) {
            route.url.subscribe((s:UrlSegment[]) => {
            this.loader.show(this.options);
            console.log("url", s) ;
            });
    }
    showInfo (i) {
        console.log(i) ;
        this.info.numberIndex = i ;
        this.info.name = this.disease[i].namet
        securityService.setInfo = JSON.stringify(this.info);
        console.log(securityService.getInfo);
        let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(showInfoComponent, options).then(res => {
        });
    }
    getFormatDate (dateStr) {
        let date = new Date(dateStr)
        let month
        if(date.getMonth() == 0){
            month = "มกราคม"
        }
        else if(date.getMonth() == 1){
            month = "กุมภาพันธ์"
        }
        else if(date.getMonth() == 2){
            month = "มีนาคม"
        }
        else if(date.getMonth() == 3){
            month = "เมษายน"
        }
        else if(date.getMonth() == 4){
            month = "พฤษภาคม"
        }
        else if(date.getMonth() == 5){
            month = "มิถุนายน"
        }
        else if(date.getMonth() == 6){
            month = "กรกฎาคม"
        }
        else if(date.getMonth() == 7){
            month = "สิงหาคม"
        }
        else if(date.getMonth() == 8){
            month = "กันยายน"
        }
        else if(date.getMonth() == 9){
            month = "ตุลาคม"
        }
        else if(date.getMonth() == 10){
            month = "พฤษจิกายน"
        }
        else if(date.getMonth() == 11){
            month = "ธันวาคม"
        }
    
        let str = date.getDate() + " " + month + " " + (date.getFullYear() + 543)
        // console.log("eieiei", date.getDate)
        return str
    }
    toBack () {
        // this.routerExtensions.backToPreviousPage();
        this.loader.show(this.options) ;
        console.log("connect") ;
        this.router.navigate(["/loginProfile"]);
        this.demoLoader();
    }
    private demoLoader() {
        setTimeout(() => {
          this.loader.hide();
        }, 2000);
      }
      onSetupItemView(args: SetupItemViewArgs) {
        args.view.context.odd = (args.index === 0) ;
        args.view.context.even = (args.index !== 0) ;
    }
 }