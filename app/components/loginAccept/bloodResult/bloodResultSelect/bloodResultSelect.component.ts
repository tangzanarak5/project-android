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
import { selectBlood } from "../../../security/model/selectBlood.model"
import { selectBloodResult } from "../../../security/model/selectBloodResult.model"
import { info } from "../../../security/model/info.model"
import { showInfoComponent } from "./showInfo/showInfo.component";
import * as datePickerModule from "tns-core-modules/ui/date-picker";
import { sideBarComponent } from "../../loginProfile/sideBar/sideBar.component";
import { bloodResultService } from "../bloodResult.service";
import { showStandardComponent } from "../bloodResultSelectTotal/showStandard/showStandard.component";
import { SetupItemViewArgs } from "nativescript-angular/directives";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "bloodResultSelect",
    templateUrl: "bloodResultSelect.component.html",
    styleUrls: ['bloodResultSelect.component.css'],
    moduleId: module.id
})


export class bloodResultSelectComponent implements OnInit {
    heart ;
    isChart = false ;
    selectBlood: selectBlood ;
    selectBloodResult: selectBloodResult ;
    info: info ;
    public myItems: Array<DataItem>;
    private counter: number;
    bloodResult ;
    dataUser ;
    dataLab ;
    datashow = [] ;
    hospitalnumber ;
    loader = new LoadingIndicator();
    count ;
    checkDM = false ;
    checkHPC = false ;
    checkHPT = false ;
    temp = [] ;
    temp2 = [] ;
    gender ;
    type ;
    showChart = true ;
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

      onSetupItemView(args: SetupItemViewArgs) {
        args.view.context.odd = (args.index === 0) ;
        args.view.context.even = (args.index !== 0) ;
    }
    
    ngOnInit(): void {
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.hospitalnumber = this.dataUser.dataset.hn ;
        this.gender = this.dataUser.dataset.gender ;
        this.selectBlood = JSON.parse(securityService.getSelectBlood);

        this.bloodResultService.getDataLab(this.hospitalnumber)
        .subscribe(
            (Response) => {
                this.dataLab = Response.dataset ;
                // console.log(this.dataLab) ;
                // this.datashow = this.dataLab.fillter(element => {
                //     console.log(element) ;
                //     console.log(this.selectBlood.numberIndex);
                //     return element.test == this.selectBlood.numberIndex
                // })
                    for (let i = this.dataLab.length - 1 ; i >= 0 ; i--) {
                        if (this.dataLab[i].test == this.selectBlood.numberIndex) {
                            this.temp = this.dataLab[i].datetime.split(" ") ;
                            this.dataLab[i].datetime = this.temp[0] ;
                            this.datashow.push(this.dataLab[i]) ;
                        }
                    }
                     console.log("datashow : " + this.datashow) ;
                    if (this.datashow.length == this.temp2.length) {
                        alert("ไม่พบประวัติการรักษา") ;
                        this.router.navigate(["/bloodResult"]) ;
                    }
            },
            (error) => {
                console.log("data error") ;
                alert("กรุณาลองอีกครั้ง") ;
                this.router.navigate(["/bloodResult"]) ;
            }
        )

        if (this.selectBlood.numberIndex == "HbA1C") {
            this.type = " mg %" ;
        }
        else { this.type = " mg/dL" ;}
        // else if (this.selectBlood.numberIndex == "Glucose") {
        //     this.type = " mg/dL"
        // }
        // else if (this.selectBlood.numberIndex == "HDL") {
        //     this.type = " mg/dL"
        // }
        // else if (this.selectBlood.numberIndex == "LDL") {
        //     this.type = " mg/dL"
        // }
        // else if (this.selectBlood.numberIndex == "Triglycerides") {
        //     this.type = " mg/dL"
        // }
        // else if (this.selectBlood.numberIndex == "RBC") {
        //     this.type = " M/µL"
        // }
        // else if (this.selectBlood.numberIndex == "Bilirubin") {
        //     this.type = ""
        //     this.showChart = false ;
        // }
        // else if (this.selectBlood.numberIndex == "Hb") {
        //     this.type = " g/dL"
        // }
        // else if (this.selectBlood.numberIndex == "Hct") {
        //     this.type = " %"
        // }
        // else if (this.selectBlood.numberIndex == "MCV") {
        //     this.type = " fl"
        // }
        // else if (this.selectBlood.numberIndex == "Urobilinogen") {
        //     this.type = ""
        //     this.showChart = false ;
        // }
        // else if (this.selectBlood.numberIndex == "pH") {
        //     this.type = " pH"
        // }
        // else if (this.selectBlood.numberIndex == "Protein") {
        //     this.type = " gm/dL"
        // }
        // else if (this.selectBlood.numberIndex == "Ketone") {
        //     this.type = ""
        //     this.showChart = false ;
        // }

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
        page: Page) {
            this.loader.show(this.options) ;
            route.url.subscribe((s:UrlSegment[]) => {
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
    checkDataLab (i) {

        if (this.selectBlood.numberIndex == "HbA1C") {
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
        else if (this.selectBlood.numberIndex == "Glucose") {
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
        else if (this.selectBlood.numberIndex == "HDL") {
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
        else if (this.selectBlood.numberIndex == "LDL") {
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
        else if (this.selectBlood.numberIndex == "Triglycerides") {
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
        else if (this.selectBlood.numberIndex == "BUN") {
            if (i >= 5 && i <= 20) {
                this.heart = "~/images/gh.png" ;
                return true ;
            }
            if (i < 5 || i > 20){
                this.heart = "~/images/yh.png" ;
                return true ;
            }

        }
        else if (this.selectBlood.numberIndex == "Cholesterol") {
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
        else if (this.selectBlood.numberIndex == "Creatinine") {
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

    toBack () {
        console.log("connect") ;
        this.router.navigate(["/bloodResultSelectTotal"])  ;
    }
    toBloodChart () {
        console.log("connect");
        this.router.navigate(["/bloodChart"]) ;
    }
    showStandard () {
        console.log("ok") ;
        let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(showStandardComponent, options).then(res => {
        });
    }
    private demoLoader() {
        setTimeout(() => {
          this.loader.hide() ;
        }, 1000) ;
      }
  
 }