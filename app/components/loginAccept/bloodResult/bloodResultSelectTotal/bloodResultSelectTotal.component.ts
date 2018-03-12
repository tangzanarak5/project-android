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
    selectBloodResult: selectBloodResult ;
    standard: standard ;
    public myItems: Array<DataItem>;
    private counter: number;
    bloodResult ;
    resultTotal = [] ;
    unit = "" ;
    resultFBS = [
        {
            date : "28/01/2561",
            dataResult : "100",
            count : "7"
        },
        {
            date : "20/011/2560",
            dataResult : "110",
            count : "6"
        },
        {
            date : "18/09/2560",
            dataResult : "115",
            count : "5"
        },
        {
            date : "05/07/2560",
            dataResult : "120",
            count : "4"
        },
        {
            date : "26/05/2560",
            dataResult : "125",
            count : "3"
        },
        {
            date : "02/03/2560",
            dataResult : "135",
            count : "2"
        },
        {
            date : "14/01/2560",
            dataResult : "140",
            count : "1"
        }
    ] ;

    HBAONEC = [
        {
            date : "28/05/2561",
            dataResult : "5",
            count : "7"
        },
        {
            date : "28/04/2561",
            dataResult : "5.5",
            count : "6"
        },
        {
            date : "28/03/2561",
            dataResult : "5.7",
            count : "5"
        },
        {
            date : "05/03/2561",
            dataResult : "6",
            count : "4"
        },
        {
            date : "26/02/2561",
            dataResult : "6.5",
            count : "3"
        },
        {
            date : "02/12/2560",
            dataResult : "7",
            count : "2"
        },
        {
            date : "14/05/2560",
            dataResult : "8",
            count : "1"
        }
    ] ;

    HDL = [
        {
            date : "28/06/2561",
            dataResult : "50",
            count : "8"
        },
        {
            date : "28/05/2561",
            dataResult : "56",
            count : "7"
        },
        {
            date : "28/04/2561",
            dataResult : "45",
            count : "6"
        },
        {
            date : "28/03/2561",
            dataResult : "50",
            count : "5"
        },
        {
            date : "05/03/2561",
            dataResult : "60",
            count : "4"
        },
        {
            date : "26/02/2561",
            dataResult : "70",
            count : "3"
        },
        {
            date : "2/12/2560",
            dataResult : "80",
            count : "2"
        },
        {
            date : "14/05/2560",
            dataResult : "80",
            count : "1"
        }
    ] ;

    LDL = [
        {
            date : "28/06/2561",
            dataResult : "95",
            count : "8"
        },
        {
            date : "28/05/2561",
            dataResult : "90",
            count : "7"
        },
        {
            date : "28/04/2561",
            dataResult : "95",
            count : "6"
        },
        {
            date : "28/03/2561",
            dataResult : "100",
            count : "5"
        },
        {
            date : "05/03/2561",
            dataResult : "110",
            count : "4"
        },
        {
            date : "26/02/2561",
            dataResult : "120",
            count : "3"
        },
        {
            date : "2/12/2560",
            dataResult : "160",
            count : "2"
        },
        {
            date : "14/05/2560",
            dataResult : "190",
            count : "1"
        }
    ] ;

    BP = [
        {
            date : "28/03/2561",
            dataResult : "90 / 60",
            count : "5"
        },
        {
            date : "05/03/2561",
            dataResult : "120 / 80",
            count : "4"
        },
        {
            date : "26/02/2561",
            dataResult : "140 / 90",
            count : "3"
        },
        {
            date : "2/12/2560",
            dataResult : "160 / 100",
            count : "2"
        },
        {
            date : "14/05/2560",
            dataResult : "160 / 100",
            count : "1"
        }
    ] ;

    P = [
        {
            date : "28/03/2561",
            dataResult : "80",
            count : "5"
        },
        {
            date : "05/03/2561",
            dataResult : "90",
            count : "4"
        },
        {
            date : "26/02/2561",
            dataResult : "105",
            count : "3"
        },
        {
            date : "2/12/2560",
            dataResult : "120",
            count : "2"
        },
        {
            date : "14/05/2560",
            dataResult : "145",
            count : "1"
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
        this.selectBloodResult = JSON.parse(securityService.getSelectBloodResult);
        console.log(securityService.getSelectBloodResult);
        this.standard = new standard ;
        this.standard.name = this.selectBloodResult.name ;
        this.standard.numberIndex = this.selectBloodResult.numberIndex ;
        securityService.setStandard = JSON.stringify(this.standard);
        console.log(securityService.getStandard);

        if (this.selectBloodResult.name == "ชีพจร") {
            this.resultTotal = this.P ;
            this.unit = " ครั้งต่อนาที" ;
        }
        if (this.selectBloodResult.name == "ความดันโลหิต") {
            this.resultTotal = this.BP ;
            this.unit = " มม.ปรอท" ;
        }
        if (this.selectBloodResult.name == "คอเลสเตอรอลที่ดี") {
            this.resultTotal = this.HDL ;
            this.unit = " mg/dL" ;
        }
        if (this.selectBloodResult.name == "ไขมันไม่ดี") {
            this.resultTotal = this.LDL ;
            this.unit = " mg/dL" ;
        }
        if (this.selectBloodResult.name == "ระดับน้ำตาลในเลือด") {
            this.resultTotal = this.resultFBS ;
            this.unit = " mg/dL" ;
        }
        if (this.selectBloodResult.name == "ระดับน้ำตาลเฉลี่ยในเลือด") {
            this.resultTotal = this.HBAONEC ;
            this.unit = " mg %" ;
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
            route.url.subscribe((s:UrlSegment[]) => {
                console.log("url", s);
            });
    }
    toBack () {
        console.log("connect");
        this.router.navigate(["/bloodResultSelect"]);
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
    toBloodChart () {
        console.log("connect");
        this.router.navigate(["/bloodChart"]);
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