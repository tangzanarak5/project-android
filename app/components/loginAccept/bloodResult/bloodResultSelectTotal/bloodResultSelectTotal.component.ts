import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { loginProfileService } from "../../loginProfile/loginProfile.service";
import * as wrapLayoutModule from "tns-core-modules/ui/layouts/wrap-layout";
import * as dialogs from "ui/dialogs";
import { ActivityIndicator } from "ui/activity-indicator";
import * as utils from "utils/utils";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {LoadingIndicator} from "nativescript-loading-indicator";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as frameModule from "tns-core-modules/ui/frame";
import {Input, ChangeDetectionStrategy} from '@angular/core';
import { selectBloodResult } from "../../../security/model/selectBloodResult.model"
import { standard } from "../../../security/model/standard.model"
import { showStandardComponent } from "./showStandard/showStandard.component";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";
import { sideBarComponent } from "../../loginProfile/sideBar/sideBar.component";
import { bloodChartService } from "../bloodChart/bloodChart.service";
import { selectBlood } from "../../../security/model/selectBlood.model"
import { bloodResultService } from "../bloodResult.service";
import { showInfoComponent } from "../bloodResultSelect/showInfo/showInfo.component";
import { info } from "../../../security/model/info.model";
import { SetupItemViewArgs } from "nativescript-angular/directives";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "bloodResultSelectTotal",
    templateUrl: "bloodResultSelectTotal.component.html",
    styleUrls: ['bloodResultSelectTotal.component.css'],
    moduleId: module.id
})


export class bloodResultSelectTotalComponent implements OnInit {
    selectBlood: selectBlood ;
    standard: standard ;
    public myItems: Array<DataItem>;
    private counter: number;
    bloodResult;
    resultTotal = [] ;
    unit = "" ;
    dataUser ;
    dayVisit ;
    hospitalnumber ;
    loader = new LoadingIndicator();
    count ;
    dataTotal = [] ;
    dataLab ;
    temp= [] ;
    dataTotalShow = [] ;
    heart ;
    gender ;
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
            namee : "BUN",
            namet : "ไนโตรเจนในกระแสเลือด"
        },
        {
            namee : "Cholesterol",
            namet : "คอเลสเตอรอลในเลือด"
        },
        {
            namee : "Creatinine",
            namet : "ของเสียจากกล้ามเนื้อ"
        }
    ] ;
    day ;
    info: info ;
    isChart = false ;
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
        this.loader.show(this.options) ;
        console.log("------------------------ ItemTapped: " + this.dataTotalShow[args.index].namee) ;
        console.log("------------------------ ItemTapped: " + this.dataTotalShow[args.index].namet) ;
        this.selectBlood.numberIndex = this.dataTotalShow[args.index].namee ;
        this.selectBlood.name = this.dataTotalShow[args.index].namet ;
        securityService.setSelectBlood = JSON.stringify(this.selectBlood) ;
        this.selectBlood = JSON.parse(securityService.getSelectBlood);
        console.log(securityService.getSelectBlood);
        this.router.navigate(["/bloodResultSelect"]) ;
        this.demoLoader() ;
    }
   
    ngOnInit(): void {
        this.selectBlood = new selectBlood ;
        this.selectBlood.numberIndex = "" ;
        this.selectBlood.name = "" ;
        securityService.setSelectBlood = JSON.stringify(this.selectBlood);
        console.log(securityService.getSelectBlood);
        this.selectBlood = JSON.parse(securityService.getSelectBlood);
        this.dataUser = JSON.parse(securityService.getDataUser) ;
        this.hospitalnumber = this.dataUser.dataset.hn ;
        this.gender = this.dataUser.dataset.gender ;
        console.log(this.hospitalnumber) ;
        this.dayVisit = JSON.parse(securityService.getDayVisit) ;
        console.log(this.dayVisit) ;
        this.day = this.dayVisit.dayDate;
        this.info = new info ;
        this.info.name = "" ;
        this.info.numberIndex = "" ;
        securityService.setInfo = JSON.stringify(this.info) ;

        this.bloodResultService.getDataLab(this.hospitalnumber)
                    .subscribe(
                        (Response) => {
                            this.dataLab = Response.dataset ;
                            if (this.dataLab != "") {
                            for (let i = 0 ; i < this.dataLab.length ; i++) {
                                this.temp = this.dataLab[i].datetime.split(" ") ;
                                this.dataLab[i].datetime = this.temp[0] ;

                                if (this.dayVisit.dayDate == this.dataLab[i].datetime) {
                                    this.dataTotal.push(this.dataLab[i]) ;
                                }
                            }
                        // console.log(this.dataTotal) ;
                            for (let i = 0 ; i < this.dataTotal.length ; i++) {
                                if (this.dataTotal[i].test == "HDL" || this.dataTotal[i].test == "BUN" || this.dataTotal[i].test == "LDL" || 
                                this.dataTotal[i].test == "HbA1C" || this.dataTotal[i].test == "Glucose" || this.dataTotal[i].test == "Triglycerides" || 
                                this.dataTotal[i].test == "Cholesterol" || this.dataTotal[i].test == "Creatinine") {
                                    let test = {
                                        namee: "",
                                        namet: "",
                                        result: "",
                                        type: ""
                                    }
                                    test.namee = this.dataTotal[i].test ;
                                    test.result = this.dataTotal[i].result ;
                                    if (test.namee == "HbA1C") {
                                        test.type = "mg%" ;
                                        test.namet = "ระดับน้ำตาลเฉลี่ยในเลือด" ;
                                    }
                                    else {test.type = "mg/dl" ;}

                                    if (test.namee == "HDL") {
                                        test.namet = "ไขมันดี" ;
                                    }
                                    else if (test.namee == "LDL") {
                                        test.namet = "ไขมันไม่ดี" ;
                                    }
                                    else if (test.namee == "Glucose") {
                                        test.namet = "ระดับน้ำตาลในเลือด" ;
                                    }
                                    else if (test.namee == "Triglycerides") {
                                        test.namet = "สารอาหารประเภทไขมัน" ;
                                    }
                                    else if (test.namee == "BUN") {
                                        test.namet = "ไนโตรเจนในกระแสเลือด" ;
                                    }
                                    else if (test.namee == "Cholesterol") {
                                        test.namet = "คอเลสเตอรอลในเลือด" ;
                                    }
                                    else if (test.namee == "Creatinine") {
                                        test.namet = "ของเสียจากกล้ามเนื้อ" ;
                                    }
                                    
                                    this.dataTotalShow.push(test) ;
                                }
                            }
                        }
                        else {alert("ไม่มีข้อมูลผลแลป") ; this.router.navigate(["/bloodResult"]);}
                        console.log(this.dataTotalShow) ;
                        },
                        (error) => {
                            console.log("data error") ;
                            alert("กรุณาลองอีกครั้ง") ;
                            this.router.navigate(["/bloodResult"]) ;
                        }
                    )
                    setTimeout(() => {
                        this.isChart = true ;
                        this.loader.hide() ;
                      }, 5000) ;
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
                this.loader.show(this.options) ;
                console.log("url", s) ;
            });
    }
    getFormatDate (dateStr) {
        let date = new Date(dateStr);
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
        console.log("connect") ;
        this.router.navigate(["/bloodResult"]);
    }

    private demoLoader() {
        setTimeout(() => {
          this.loader.hide() ;
        }, 2000);
      }

      showInfo (i) {
        console.log(i) ;
        this.info.numberIndex = i ;
        this.info.name = i
        securityService.setInfo = JSON.stringify(this.info);
        console.log(securityService.getInfo) ;
        let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(showInfoComponent, options).then(res => {
        });
    }

      checkDataLab (i, name) {

        if (name == "HbA1C") {
            if (parseFloat(i) < 5.7) {
                this.heart = "~/images/gh.png" ;
                return true ;
            }
            else if (parseFloat(i) >= 5.7 && parseFloat(i) <= 6.4) {
                this.heart = "~/images/yh.png" ;
                return true ;
            }
            else if (parseFloat(i) > 6.4) {
                this.heart = "~/images/rh.png" ;
                return true ;
            }
        }
        else if (name == "Glucose") {
            if (parseInt(i) >= 70 && parseInt(i) <= 100) {
                this.heart = "~/images/gh.png" ;
                return true ;
            }
            else if (parseInt(i) < 70) {
                this.heart = "~/images/yh.png" ;
                return true ;
            }
            else if (parseInt(i) > 100 && parseInt(i) <= 125) {
                this.heart = "~/images/yh.png" ;
                return true ;
            }
            else if (parseInt(i) > 125) {
                this.heart = "~/images/rh.png" ;
                return true ;
            }
        }
        else if (name == "HDL") {
            if (this.gender == "ชาย") {
            if (i >= 60) {
                this.heart = "~/images/rh.png" ;
                return true ;
            }
            if (i >= 40 && i <= 50) {
                this.heart = "~/images/gh.png" ;
                return true ;
            }
            if (i < 40 || (i > 50 && i < 60)) {
                this.heart = "~/images/yh.png" ;
                return true ;
            }
        }
        else if (this.gender == "หญิง") {
            if (i >= 60) {
                this.heart = "~/images/rh.png" ;
                return true ;
            }
            if (i >= 50 && i <= 59) {
                this.heart = "~/images/gh.png" ;
                return true ;
            }
            if (i < 50) {
                this.heart = "~/images/yh.png" ;
                return true ;
            }
        }
        }
        else if (name == "LDL") {
            if (i <= 100) {
                this.heart = "~/images/gh.png" ;
                return true ;
            }
            if (i > 100 && i < 160) {
                this.heart = "~/images/yh.png" ;
                return true ;
            }
            if (i >= 160) {
                this.heart = "~/images/rh.png" ;
                return true ;
            }
        }
        else if (name == "Triglycerides") {
            if (i < 150) {
                this.heart = "~/images/gh.png" ;
                return true ;
            }
            if (i >= 150 && i <= 200) {
                this.heart = "~/images/yh.png" ;
                return true ;
            }
            if (i > 200) {
                this.heart = "~/images/rh.png" ;
                return true ;
            }
        }
        else if (name == "BUN") {
            if (i >= 5 && i <= 20) {
                this.heart = "~/images/gh.png" ;
                return true ;
            }
            if (i < 5 || i > 20){
                this.heart = "~/images/yh.png" ;
                return true ;
            }

        }
        else if (name == "Cholesterol") {
            if (i <= 200) {
                this.heart = "~/images/gh.png" ;
                return true ;
            }
            else if (i >= 201 && i <= 240) {
                this.heart = "~/images/yh.png" ;
                return true ;
            }
            else if (i > 240) {
                this.heart = "~/images/rh.png" ;
                return true ;
            }
        }
        else if (name == "Creatinine") {
            if (parseFloat(i) >= 0.7 && parseFloat(i) <= 1.3) {
                this.heart = "~/images/gh.png" ;
                return true ;
            }
            else if (parseFloat(i) < 0.7 || parseFloat(i) > 1.3) {
                this.heart = "~/images/yh.png" ;
                return true ;
            }
        }
        // else if (this.selectBlood.numberIndex == "RBC") {
        //     if (parseFloat(i) < 4.2) {
        //         this.heart = "~/images/yh.png" ;
        //         return true ;
        //     }
        //     if (parseFloat(i) >= 4.2 && parseFloat(i) <= 5.4) {
        //         this.heart = "~/images/gh.png" ;
        //         return true ;
        //     }
        //     if (parseFloat(i) > 5.4) {
        //         this.heart = "~/images/yh.png" ;
        //         return true ;
        //     }
        // }
        // else if (this.selectBlood.numberIndex == "Hb") {
        //     if (this.gender == "ชาย") {
        //         if (parseFloat(i) < 14) {
        //             this.heart = "~/images/yh.png" ;
        //             return true ;
        //         }
        //         if (parseFloat(i) >= 14 && parseFloat(i) <= 18) {
        //             this.heart = "~/images/gh.png" ;
        //             return true ;
        //         }
        //         if (parseFloat(i) > 18) {
        //             this.heart = "~/images/yh.png" ;
        //             return true ;
        //         }
        //     }
        //     if (this.gender == "หญิง") {
        //         if (parseFloat(i) < 12) {
        //             this.heart = "~/images/yh.png" ;
        //             return true ;
        //         }
        //         if (parseFloat(i) >= 12 && parseFloat(i) <= 16) {
        //             this.heart = "~/images/gh.png" ;
        //             return true ;
        //         }
        //         if (parseFloat(i) > 16) {
        //             this.heart = "~/images/yh.png" ;
        //             return true ;
        //         }
        //     }
        // }
        // else if (this.selectBlood.numberIndex == "Hct") {
        //     if (this.gender == "ชาย") {
        //         if (i < 42) {
        //             this.heart = "~/images/yh.png" ;
        //             return true ;
        //         }
        //         if (i >= 42 && parseFloat(i) <= 52) {
        //             this.heart = "~/images/gh.png" ;
        //             return true ;
        //         }
        //         if (i > 52) {
        //             this.heart = "~/images/yh.png" ;
        //             return true ;
        //         }
        //     }
        //     else if (this.gender == "หญิง") {
        //         if (i < 36) {
        //             this.heart = "~/images/yh.png" ;
        //             return true ;
        //         }
        //         if (i >= 36 && parseFloat(i) <= 48) {
        //             this.heart = "~/images/gh.png" ;
        //             return true ;
        //         }
        //         if (i > 48) {
        //             this.heart = "~/images/yh.png" ;
        //             return true ;
        //         }
        //     }
        // }
        // else if (this.selectBlood.numberIndex == "MCV") {
        //     if (i < 78) {
        //         this.heart = "~/images/yh.png" ;
        //         return true ;
        //     }
        //     if (i >= 78 && parseFloat(i) <= 98) {
        //         this.heart = "~/images/gh.png" ;
        //         return true ;
        //     }
        //     if (i > 98) {
        //         this.heart = "~/images/yh.png" ;
        //         return true ;
        //     }
        // }
        // else if (this.selectBlood.numberIndex == "Urobilinogen") {
        //     if (parseFloat(i) < 0.3) {
        //         this.heart = "~/images/yh.png" ;
        //         return true ;
        //     }
        //     if (parseFloat(i) >= 0.3 && parseFloat(i) <= 1.0) {
        //         this.heart = "~/images/gh.png" ;
        //         return true ;
        //     }
        //     if (parseFloat(i) > 1.0) {
        //         this.heart = "~/images/yh.png" ;
        //         return true ;
        //     }
        // }
        // else if (this.selectBlood.numberIndex == "pH") {
        //     if (parseFloat(i) < 4.6) {
        //         this.heart = "~/images/yh.png" ;
        //         return true ;
        //     }
        //     if (parseFloat(i) >= 4.6 && parseFloat(i) <= 8.0) {
        //         this.heart = "~/images/gh.png" ;
        //         return true ;
        //     }
        //     if (parseFloat(i) > 8.0) {
        //         this.heart = "~/images/yh.png" ;
        //         return true ;
        //     }
        // }
        // else if (this.selectBlood.numberIndex == "Protein") {
        //     if (parseFloat(i) < 6.4) {
        //         this.heart = "~/images/yh.png" ;
        //         return true ;
        //     }
        //     if (parseFloat(i) >= 6.4 && parseFloat(i) <= 8.3) {
        //         this.heart = "~/images/gh.png" ;
        //         return true ;
        //     }
        //     if (parseFloat(i) > 8.3) {
        //         this.heart = "~/images/yh.png" ;
        //         return true ;
        //     }
        // }
        // else if (this.selectBlood.numberIndex == "Ketone") {
        //     if (i < 3) {
        //         this.heart = "~/images/yh.png" ;
        //         return true ;
        //     }
        //     if (i >= 3 && parseFloat(i) <= 3) {
        //         this.heart = "~/images/gh.png" ;
        //         return true ;
        //     }
        //     if (i > 15) {
        //         this.heart = "~/images/yh.png" ;
        //         return true ;
        //     }
        // }
    }
  
 }