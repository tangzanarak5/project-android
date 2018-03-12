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
import { showStandardComponent } from "../bloodResultSelectTotal/showStandard/showStandard.component";
import { sideBarComponent } from "../../loginProfile/sideBar/sideBar.component";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "bloodChart",
    templateUrl: "bloodChart.component.html",
    styleUrls: ['bloodChart.component.css'],
    moduleId: module.id
})


export class bloodChartComponent implements OnInit {

    selectBloodResult: selectBloodResult ;
    standard: standard ;
    public myItems: Array<DataItem>;
    private counter: number;
    bloodResult ;
    resultTotal = [] ;
    unit = "" ;
    url;
    sizes = "" ;
    isChart = false;
    chd = "";
    xx = "150";
    chxl = ["0:|", "1:|", "2:|"];
    month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    resultFBS = [
        {
            date : "Mon Jan 14 2017 03:17:38 GMT+0700 ",
            dataResult : "140",
            count : "1"
        },
        {
            date : "Mon Mar 02 2017 03:17:38 GMT+0700 ",
            dataResult : "135",
            count : "2"
        },
        {
            date : "Mon May 26 2017 03:17:38 GMT+0700 ",
            dataResult : "125",
            count : "3"
        },
        {
            date : "Mon Jul 05 2017 03:17:38 GMT+0700 ",
            dataResult : "120",
            count : "4"
        },
        {
            date : "Mon Sep 18 2017 03:17:38 GMT+0700 ",
            dataResult : "115",
            count : "5"
        },
        {
            date : "Mon Nov 20 2017 03:17:38 GMT+0700 ",
            dataResult : "110",
            count : "6"
        },
        {
            date : "Mon Jan 28 2018 03:17:38 GMT+0700 ",
            dataResult : "100",
            count : "7"
        }
    ] ;

    HBAONEC = [
        {
            date : "Mon May 14 2017 03:17:38 GMT+0700 ",
            dataResult : "8",
            count : "1"
        },
        {
            date : "Mon Dec 02 2017 03:17:38 GMT+0700 ",
            dataResult : "7",
            count : "2"
        },
        {
            date : "Mon Feb 26 2017 03:17:38 GMT+0700 ",
            dataResult : "6.5",
            count : "3"
        },
        {
            date : "Mon Mar 28 2017 03:17:38 GMT+0700 ",
            dataResult : "6",
            count : "4"
        },
        {
            date : "Mon Apr 28 2017 03:17:38 GMT+0700 ",
            dataResult : "5.7",
            count : "5"
        },
        {
            date : "Mon May 28 2017 03:17:38 GMT+0700 ",
            dataResult : "5.5",
            count : "6"
        },
        {
            date : "Mon Jan 28 2018 03:17:38 GMT+0700 ",
            dataResult : "5",
            count : "7"
        }
    ] ;

    HDL = [
        {
            date : "Mon May 14 2017 03:17:38 GMT+0700 ",
            dataResult : "80",
            count : "1"
        },
        {
            date : "Mon Dec 02 2017 03:17:38 GMT+0700 ",
            dataResult : "80",
            count : "2"
        },
        {
            date : "Mon Feb 26 2017 03:17:38 GMT+0700 ",
            dataResult : "70",
            count : "3"
        },
        {
            date : "Mon Mar 05 2017 03:17:38 GMT+0700 ",
            dataResult : "60",
            count : "4"
        },
        {
            date : "Mon Mar 28 2017 03:17:38 GMT+0700 ",
            dataResult : "50",
            count : "5"
        },
        {
            date : "Mon Apr 28 2017 03:17:38 GMT+0700 ",
            dataResult : "45",
            count : "6"
        },
        {
            date : "Mon May 28 2018 03:17:38 GMT+0700 ",
            dataResult : "56",
            count : "7"
        },
        {
            date : "Mon Jun 28 2018 03:17:38 GMT+0700 ",
            dataResult : "50",
            count : "8"
        }
    ] ;

    LDL = [
        {
            date : "Mon May 14 2017 03:17:38 GMT+0700 ",
            dataResult : "190",
            count : "1"
        },
        {
            date : "Mon Dec 02 2017 03:17:38 GMT+0700 ",
            dataResult : "160",
            count : "2"
        },
        {
            date : "Mon Feb 26 2017 03:17:38 GMT+0700 ",
            dataResult : "120",
            count : "3"
        },
        {
            date : "Mon Mar 05 2017 03:17:38 GMT+0700 ",
            dataResult : "110",
            count : "4"
        },
        {
            date : "Mon Mar 28 2017 03:17:38 GMT+0700 ",
            dataResult : "100",
            count : "5"
        },
        {
            date : "Mon Apr 28 2017 03:17:38 GMT+0700 ",
            dataResult : "95",
            count : "6"
        },
        {
            date : "Mon May 28 2018 03:17:38 GMT+0700 ",
            dataResult : "90",
            count : "7"
        },
        {
            date : "Mon Jun 28 2018 03:17:38 GMT+0700 ",
            dataResult : "95",
            count : "8"
        }
    ] ;

    BP = [
        {
            date : "Mon May 14 2017 03:17:38 GMT+0700 ",
            dataResult : "160",
            count : "1"
        },
        {
            date : "Mon Dec 02 2017 03:17:38 GMT+0700 ",
            dataResult : "160",
            count : "2"
        },
        {
            date : "Mon Feb 26 2017 03:17:38 GMT+0700 ",
            dataResult : "140",
            count : "3"
        },
        {
            date : "Mon Mar 05 2017 03:17:38 GMT+0700 ",
            dataResult : "120",
            count : "4"
        },
        {
            date : "Mon Mar 28 2017 03:17:38 GMT+0700 ",
            dataResult : "90",
            count : "5"
        }
    ] ;

    P = [
        {
            date : "Mon May 14 2017 03:17:38 GMT+0700 ",
            dataResult : "145",
            count : "1"
        },
        {
            date : "Mon Dec 02 2017 03:17:38 GMT+0700 ",
            dataResult : "120",
            count : "2"
        },
        {
            date : "Mon Feb 26 2017 03:17:38 GMT+0700 ",
            dataResult : "105",
            count : "3"
        },
        {
            date : "Mon Mar 05 2017 03:17:38 GMT+0700 ",
            dataResult : "90",
            count : "4"
        },
        {
            date : "Mon Mar 28 2017 03:17:38 GMT+0700 ",
            dataResult : "80",
            count : "5"
        }
    ] ;

    dataUser ;
    hospitalnumber ;
    loader = new LoadingIndicator();
    count ;
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
          this.sideBar.openDrawer();
      }
   
    ngOnInit(): void {
        this.loader.hide();
        setTimeout(() => {
            this.isChart = true;
          }, 1000);
        this.selectBloodResult = JSON.parse(securityService.getSelectBloodResult);
        console.log(securityService.getSelectBloodResult);
        this.standard = new standard ;
        this.standard.name = this.selectBloodResult.name ;
        this.standard.numberIndex = this.selectBloodResult.numberIndex ;
        securityService.setStandard = JSON.stringify(this.standard);
        console.log(securityService.getStandard);
        if (this.selectBloodResult.name == "ชีพจร") {
            // this.resultTotal = this.P ;
            // this.unit = " ครั้งต่อนาที" ;
            this.chd = "t:" ;
            this.sizes = "0,200" ;
            this.P.forEach(element => {
                
                this.chd += element.dataResult + ",";
                console.log(this.chd);
                let _date = new Date(element.date);

                // console.log(_date.getDate());
                // console.log(this.getNameMonth(_date.getMonth()) );
                // console.log(_date.getFullYear() +543);
                this.chxl[0] += _date.getDate() + "|" ;
                this.chxl[1] += this.getNameMonth(_date.getMonth()) + "|" ;
                this.chxl[2] += (_date.getFullYear() +543) + "|" ;
                console.log(this.chxl[0]);
                console.log(this.chxl[1]);
                console.log(this.chxl[2]);
                console.log(this.chd);
            });
            this.chd = this.chd.substring(0,(this.chd.length - 1));
            console.log(this.chd);
        }
        if (this.selectBloodResult.name == "ความดันโลหิต") {
            // this.resultTotal = this.BP ;
            // this.unit = " มม.ปรอท" ;
            this.chd = "t:" ;
            this.sizes = "0,200" ;
            this.BP.forEach(element => {
                
                this.chd += element.dataResult + ",";
                console.log(this.chd);
                let _date = new Date(element.date);

                // console.log(_date.getDate());
                // console.log(this.getNameMonth(_date.getMonth()) );
                // console.log(_date.getFullYear() +543);
                this.chxl[0] += _date.getDate() + "|" ;
                this.chxl[1] += this.getNameMonth(_date.getMonth()) + "|" ;
                this.chxl[2] += (_date.getFullYear() +543) + "|" ;
                console.log(this.chxl[0]);
                console.log(this.chxl[1]);
                console.log(this.chxl[2]);
                console.log(this.chd);
            });
            this.chd = this.chd.substring(0,(this.chd.length - 1));
            console.log(this.chd);
        }
        if (this.selectBloodResult.name == "คอเลสเตอรอลที่ดี") {
            // this.resultTotal = this.HDL ;
            // this.unit = " mg/dL" ;
            this.chd = "t:" ;
            this.sizes = "0,80" ;
            this.HDL.forEach(element => {
                
                this.chd += element.dataResult + ",";
                console.log(this.chd);
                let _date = new Date(element.date);

                // console.log(_date.getDate());
                // console.log(this.getNameMonth(_date.getMonth()) );
                // console.log(_date.getFullYear() +543);
                this.chxl[0] += _date.getDate() + "|" ;
                this.chxl[1] += this.getNameMonth(_date.getMonth()) + "|" ;
                this.chxl[2] += (_date.getFullYear() +543) + "|" ;
                console.log(this.chxl[0]);
                console.log(this.chxl[1]);
                console.log(this.chxl[2]);
                console.log(this.chd);
            });
            this.chd = this.chd.substring(0,(this.chd.length - 1));
            console.log(this.chd);
        }
        if (this.selectBloodResult.name == "ไขมันไม่ดี") {
            // this.resultTotal = this.LDL ;
            // this.unit = " mg/dL" ;
            this.chd = "t:" ;
            this.sizes = "0,200" ;
            this.LDL.forEach(element => {
                
                this.chd += element.dataResult + ",";
                console.log(this.chd);
                let _date = new Date(element.date);

                // console.log(_date.getDate());
                // console.log(this.getNameMonth(_date.getMonth()) );
                // console.log(_date.getFullYear() +543);
                this.chxl[0] += _date.getDate() + "|" ;
                this.chxl[1] += this.getNameMonth(_date.getMonth()) + "|" ;
                this.chxl[2] += (_date.getFullYear() +543) + "|" ;
                console.log(this.chxl[0]);
                console.log(this.chxl[1]);
                console.log(this.chxl[2]);
                console.log(this.chd);
            });
            this.chd = this.chd.substring(0,(this.chd.length - 1));
            console.log(this.chd);
        }
        if (this.selectBloodResult.name == "ระดับน้ำตาลในเลือด") {
            // this.resultTotal = this.resultFBS ;
            // this.unit = " mg/dL" ;
            this.chd = "t:" ;
            this.sizes = "0,160" ;
            this.resultFBS.forEach(element => {
                
                this.chd += element.dataResult + ",";
                console.log(this.chd);
                let _date = new Date(element.date);

                // console.log(_date.getDate());
                // console.log(this.getNameMonth(_date.getMonth()) );
                // console.log(_date.getFullYear() +543);
                this.chxl[0] += _date.getDate() + "|" ;
                this.chxl[1] += this.getNameMonth(_date.getMonth()) + "|" ;
                this.chxl[2] += (_date.getFullYear() +543) + "|" ;
                console.log(this.chxl[0]);
                console.log(this.chxl[1]);
                console.log(this.chxl[2]);
                console.log(this.chd);
            });
            this.chd = this.chd.substring(0,(this.chd.length - 1));
            console.log(this.chd);
        }
        if (this.selectBloodResult.name == "ระดับน้ำตาลเฉลี่ยในเลือด") {
            // this.resultTotal = this.HBAONEC ;
            // this.unit = " mg %" ;
            this.chd = "t:" ;
            this.sizes = "5,7" ;
            this.HBAONEC.forEach(element => {
                
                this.chd += element.dataResult + ",";
                console.log(this.chd);
                let _date = new Date(element.date);

                // console.log(_date.getDate());
                // console.log(this.getNameMonth(_date.getMonth()) );
                // console.log(_date.getFullYear() +543);
                this.chxl[0] += _date.getDate() + "|" ;
                this.chxl[1] += this.getNameMonth(_date.getMonth()) + "|" ;
                this.chxl[2] += (_date.getFullYear() +543) + "|" ;
                console.log(this.chxl[0]);
                console.log(this.chxl[1]);
                console.log(this.chxl[2]);
                console.log(this.chd);
            });
            this.chd = this.chd.substring(0,(this.chd.length - 1));
            console.log(this.chd);
        }
        
    }

    constructor(
        private fonticon: TNSFontIconService,
        private _changeDetectionRef: ChangeDetectorRef,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        private loginProfileService: loginProfileService,
        page: Page) {
            this.loader.show(this.options);
            route.url.subscribe((s:UrlSegment[]) => {
                console.log("url", s);
            });
            // this.chd = "t:"
            // this.resultFBS.forEach(element => {
                
            //     this.chd += element.dataResult + ",";
            //     console.log(this.chd);
            //     let _date = new Date(element.date);

            //     // console.log(_date.getDate());
            //     // console.log(this.getNameMonth(_date.getMonth()) );
            //     // console.log(_date.getFullYear() +543);
            //     this.chxl[0] += _date.getDate() + "|" ;
            //     this.chxl[1] += this.getNameMonth(_date.getMonth()) + "|" ;
            //     this.chxl[2] += (_date.getFullYear() +543) + "|" ;
            //     console.log(this.chxl[0]);
            //     console.log(this.chxl[1]);
            //     console.log(this.chxl[2]);
            //     console.log(this.chd);
            // });
            // this.chd = this.chd.substring(0,(this.chd.length - 1));
            // console.log(this.chd);
            // this.url = "https://chart.googleapis.com/chart?chs=280x300&amp;chd=" + this.chd + "&amp;chds=0,150&amp;cht=bvs&amp;chxl=" + this.chxl[0] + this.chxl[1] + this.chxl[2] + "&amp;chtt=text&amp;chxt=x,x,x,y&amp;chds=a";

            
    }
    getNameMonth(month){
        return this.month[month];
    }
    toBack () {
        console.log("connect");
        this.router.navigate(["/bloodResultSelectTotal"]);
    }
    showStandard () {
        console.log("ok");
        let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(showStandardComponent, options).then(res => {
        });
    }
    checkBloodResult (i) {
// ***********************************************************************************************************
        if (this.selectBloodResult.name == "ชีพจร") {
            if (i > 140 || i < 30) {
                this.bloodResult = "~/images/red.png" ;
                return true ;
            }
            else if (i > 100 && i > 60) {
                this.bloodResult = "~/images/yellow.png" ;
                return true ;
            }
            else if (i >= 60 && i <= 100) {
                this.bloodResult = "~/images/green.png" ;
                return true ;
            }
        }
// ********************************************************************************************************
        if (this.selectBloodResult.name == "ความดันโลหิต") {
            if (i.substring(2,3) == " ") {
                    if (i.substring(4,5) == " ") {
                        if (parseInt(i.substring(0,2)) <= 99 && parseInt(i.substring(5,7)) <= 79) {
                            this.bloodResult = "~/images/green.png" ;
                            return true ;
                    }
                }
            }
            if (i.substring(3,4) == " ") {
                if (i.substring(5,6) == " ") {
                    if (parseInt(i.substring(0,3)) <= 120 && parseInt(i.substring(5,7)) <= 79) {
                        this.bloodResult = "~/images/green.png" ;
                        return true ;
                    }
                    if (parseInt(i.substring(0,3)) <= 160 && parseInt(i.substring(5,8)) <= 100) {
                        this.bloodResult = "~/images/yellow.png" ;
                        return true ;
                    }
                    if (parseInt(i.substring(0,3)) >= 180 && parseInt(i.substring(5,8)) >= 110) {
                        this.bloodResult = "~/images/red.png" ;
                        return true ;
                    }
                }
            }  
        }
// *************************************************************************************************************
        if (this.selectBloodResult.name == "คอเลสเตอรอลที่ดี") {
            if (i < 40 || i > 60) {
                this.bloodResult = "~/images/red.png" ;
                return true ;
            }
            if (i >= 45 && i <= 55) {
                this.bloodResult = "~/images/green.png" ;
                return true ;
            }
            if (i > 45 && i > 55) {
                this.bloodResult = "~/images/yellow.png" ;
                return true ;
            }
        }
 // ****************************************************************************************************
        if (this.selectBloodResult.name == "ไขมันไม่ดี") {
            if (i <= 100) {
                this.bloodResult = "~/images/green.png" ;
                return true ;
            }
            if (i > 100 && i < 160) {
                this.bloodResult = "~/images/yellow.png" ;
                return true ;
            }
            if (i >= 160) {
                this.bloodResult = "~/images/red.png" ;
                return true ;
            }
        }
// **************************************************************************************************
        if (this.selectBloodResult.name == "ระดับน้ำตาลในเลือด") {
            if (i <= 100 && i >= 70) {
                this.bloodResult = "~/images/green.png" ;
                return true ;
            }
            if (i > 100 && i <= 125) {
                this.bloodResult = "~/images/yellow.png" ;
                return true ;
            }
            if (i > 125) {
                this.bloodResult = "~/images/red.png" ;
                return true ;
            }
        }
    // ***********************************************************************************************
        if (this.selectBloodResult.name == "ระดับน้ำตาลเฉลี่ยในเลือด") {
            if (parseFloat(i) < 5.7) {
                this.bloodResult = "~/images/green.png" ;
                return true ;
            }
            if (parseFloat(i) >= 5.7 && parseFloat(i) <= 6.4) {
                this.bloodResult = "~/images/yellow.png" ;
                return true ;
            }
            if (parseFloat(i) > 6.4) {
                this.bloodResult = "~/images/red.png" ;
                return true ;
            }
        }
    }
  
 }