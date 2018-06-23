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
import { bloodChartService } from "./bloodChart.service";
import { selectBlood } from "../../../security/model/selectBlood.model";
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
    private _categoricalSource: ObservableArray<any> ;
    private _categoricalSource2: ObservableArray<any> ;
    private _categoricalSource3: ObservableArray<any> ;
    private _categoricalSource4: ObservableArray<any> ;
    selectBloodResult: selectBloodResult ;
    selectBlood: selectBlood ;
    public myItems: Array<DataItem> ;
    private counter: number ;
    bloodResult ;
    resultTotal = [] ;
    isChart = false ;
    testone = 1 ;
    dataUser ;
    hospitalnumber ;
    loader = new LoadingIndicator() ;
    count ;
    dataGender ;
    gender ;
    dataLab0 ;
    dataLab1 ;
    dataLab2 ;
    dataLab3 ;
    dataLabtest0 = [] ;
    dataLabtest1 = [] ;
    dataLabtest2 = [] ;
    datashow0 = [] ;
    datashow1 = [] ;
    datashow2 = [] ;
    datashow3 = [] ;
    temp = [] ;
    temp2 = [] ;
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

    ngOnInit(): void {
        this.dataUser = JSON.parse(securityService.getDataUser) ;
        this.selectBlood = JSON.parse(securityService.getSelectBlood) ;
        console.log(securityService.getSelectBlood) ;
        this.hospitalnumber = this.dataUser.dataset.hn ;
        this.gender = this.dataUser.dataset.gender ;
        console.log("connect");
        if (this.selectBlood.numberIndex == "HbA1C") {
         this.bloodChartService.getDataLab(this.hospitalnumber)
        .subscribe(
            (Response) => {
                this.dataLab0 = Response.dataset ;
                this.dataLab0.forEach ((element, index) => {
                    if (element.test == this.selectBlood.numberIndex) {
                        this.temp = element.datetime.split(" ") ;
                        element.datetime = this.temp[0]  ;
                        element.result = parseFloat(element.result) ;
                        this.datashow1.push(element) ;
                    }
                })
                this._categoricalSource = new ObservableArray(this.datashow1) ;
            },
            (error) => {
                console.log("data error") ;
                alert("กรุณาลองอีกครั้ง") ;
                this.router.navigate(["/bloodResultSelect"]) ;
            }
        )
        this.bloodChartService.getDataLab(this.hospitalnumber)
        .subscribe(
            (Response) => {
                this.dataLab2 = Response.dataset ;
                this.dataLab2.forEach ((element, index) => {
                    if (element.test == this.selectBlood.numberIndex) {
                        this.dataLabtest1.push(element);
                    }
                })
                this.dataLabtest1.forEach ((element, index) => {
                    if (element.test == this.selectBlood.numberIndex) {
                    if (parseFloat(element.result) >= 5.7 && parseFloat(element.result) <= 6.4) {
                        this.temp = element.datetime.split(" ") ;
                        element.datetime = this.temp[0] ;
                        element.result = parseFloat(element.result) ;
                        this.datashow2.push(element) ;
                    }
                }
                })
                this._categoricalSource2 = new ObservableArray(this.datashow2) ;
            },
            (error) => {
                console.log("data error") ;
                alert("กรุณาลองอีกครั้ง") ;
                this.router.navigate(["/bloodResultSelect"]) ;
            }
        )
        this.bloodChartService.getDataLab(this.hospitalnumber)
        .subscribe(
            (Response) => {
                this.dataLab3 = Response.dataset ;
                this.dataLab3.forEach ((element, index) => {
                    if (element.test == this.selectBlood.numberIndex) {
                        this.dataLabtest2.push(element) ;
                    }
                })
                this.dataLabtest2.forEach ((element, index) => {
                    if (parseFloat(element.result) > 6.4) {
                        this.temp = element.datetime.split(" ") ;
                        element.datetime = this.temp[0] ;
                        element.result = parseFloat(element.result) ;
                        this.datashow3.push(element) ;
                        }
                })
                this._categoricalSource3 = new ObservableArray(this.datashow3) ;
            },
            (error) => {
                console.log("data error") ;
                alert("กรุณาลองอีกครั้ง") ;
                this.router.navigate(["/bloodResultSelect"]) ;
            }
        )
        setTimeout(() => {
            this.isChart = true ;
            this.loader.hide() ;
          }, 5000) ;
    }
    else if (this.selectBlood.numberIndex == "Glucose") {
        this.bloodChartService.getDataLab(this.hospitalnumber)
       .subscribe(
           (Response) => {
               this.dataLab0 = Response.dataset ;
               this.dataLab0.forEach ((element, index) => {
                   if (element.test == this.selectBlood.numberIndex) {
                       this.temp = element.datetime.split(" ") ;
                       element.datetime = this.temp[0]  ;
                       element.result = parseFloat(element.result) ;
                       this.datashow1.push(element) ;
                   }
               })
               this._categoricalSource = new ObservableArray(this.datashow1) ;
           },
           (error) => {
               console.log("data error") ;
               alert("กรุณาลองอีกครั้ง") ;
               this.router.navigate(["/bloodResultSelect"]) ;
           }
       )
       this.bloodChartService.getDataLab(this.hospitalnumber)
        .subscribe(
            (Response) => {
                this.dataLab1 = Response.dataset ;
                this.dataLab1.forEach ((element, index) => {
                    if (element.test == this.selectBlood.numberIndex) {
                        this.dataLabtest0.push(element);
                    }
                })
                this.dataLabtest0.forEach ((element, index) => {
                    if (element.test == this.selectBlood.numberIndex) {
                    if (parseFloat(element.result) < 70) {
                        this.temp = element.datetime.split(" ") ;
                        element.datetime = this.temp[0] ;
                        element.result = parseFloat(element.result) ;
                        this.datashow0.push(element)  ;
                    }
                }
                })
                this._categoricalSource4 = new ObservableArray(this.datashow0) ;
            },
            (error) => {
                console.log("data error") ;
                alert("กรุณาลองอีกครั้ง") ;
                this.router.navigate(["/bloodResultSelect"]) ;
            }
        )

       this.bloodChartService.getDataLab(this.hospitalnumber)
       .subscribe(
           (Response) => {
               this.dataLab2 = Response.dataset ;
               this.dataLab2.forEach ((element, index) => {
                   if (element.test == this.selectBlood.numberIndex) {
                       this.dataLabtest1.push(element);
                   }
               })
               this.dataLabtest1.forEach ((element, index) => {
                   if (element.test == this.selectBlood.numberIndex) {
                   if (parseFloat(element.result) >= 100 && parseFloat(element.result) <= 125) {
                       this.temp = element.datetime.split(" ") ;
                       element.datetime = this.temp[0] ;
                       element.result = parseFloat(element.result) ;
                       this.datashow2.push(element) ;
                   }
               }
               })
               this._categoricalSource2 = new ObservableArray(this.datashow2) ;
           },
           (error) => {
               console.log("data error") ;
               alert("กรุณาลองอีกครั้ง") ;
               this.router.navigate(["/bloodResultSelect"]) ;
           }
       )
       this.bloodChartService.getDataLab(this.hospitalnumber)
       .subscribe(
           (Response) => {
               this.dataLab3 = Response.dataset ;
               this.dataLab3.forEach ((element, index) => {
                   if (element.test == this.selectBlood.numberIndex) {
                       this.dataLabtest2.push(element) ;
                   }
               })
               this.dataLabtest2.forEach ((element, index) => {
                   if (parseFloat(element.result) > 125) {
                       this.temp = element.datetime.split(" ") ;
                       element.datetime = this.temp[0] ;
                       element.result = parseFloat(element.result) ;
                       this.datashow3.push(element) ;
                       }
               })
               this._categoricalSource3 = new ObservableArray(this.datashow3) ;
           },
           (error) => {
               console.log("data error") ;
               alert("กรุณาลองอีกครั้ง") ;
               this.router.navigate(["/bloodResultSelect"]) ;
           }
       )
       setTimeout(() => {
           this.isChart = true ;
           this.loader.hide() ;
         }, 5000) ;
   }
   else if (this.selectBlood.numberIndex == "HDL") {

    this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab0 = Response.dataset ;
           this.dataLab0.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0]  ;
                   element.result = parseFloat(element.result) ;
                   this.datashow1.push(element);
               }
           })
           this._categoricalSource = new ObservableArray(this.datashow1) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )
   if (this.gender == "ชาย") {
    console.log("gender : " + this.gender + "connect") ;
   this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab2 = Response.dataset ;
           this.dataLab2.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.dataLabtest1.push(element) ;
               }
           })
           this.dataLabtest1.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
               if (parseFloat(element.result) < 40 || (parseFloat(element.result) > 50 && parseFloat(element.result) < 60)) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0] ;
                   element.result = parseFloat(element.result) ;
                   this.datashow2.push(element) ;
               }
           }
           })
           this._categoricalSource2 = new ObservableArray(this.datashow2) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )
   this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab3 = Response.dataset ;
           this.dataLab3.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.dataLabtest2.push(element) ;
               }
           })
           this.dataLabtest2.forEach ((element, index) => {
               if (parseFloat(element.result) >= 60) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0] ;
                   element.result = parseFloat(element.result) ;
                   this.datashow3.push(element) ;
                   }
           })
           this._categoricalSource3 = new ObservableArray(this.datashow3) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )
}
else if (this.gender == "หญิง") {
    this.bloodChartService.getDataLab(this.hospitalnumber)
    .subscribe(
        (Response) => {
            this.dataLab2 = Response.dataset ;
            this.dataLab2.forEach ((element, index) => {
                if (element.test == this.selectBlood.numberIndex) {
                    this.dataLabtest1.push(element) ;
                }
            })
            this.dataLabtest1.forEach ((element, index) => {
                if (element.test == this.selectBlood.numberIndex) {
                if (parseFloat(element.result) < 50) {
                    this.temp = element.datetime.split(" ") ;
                    element.datetime = this.temp[0] ;
                    element.result = parseFloat(element.result) ;
                    this.datashow2.push(element) ;
                }
            }
            })
            this._categoricalSource2 = new ObservableArray(this.datashow2) ;
        },
        (error) => {
            console.log("data error") ;
            alert("กรุณาลองอีกครั้ง") ;
            this.router.navigate(["/bloodResultSelect"]) ;
        }
    )
    this.bloodChartService.getDataLab(this.hospitalnumber)
    .subscribe(
        (Response) => {
            this.dataLab3 = Response.dataset ;
            this.dataLab3.forEach ((element, index) => {
                if (element.test == this.selectBlood.numberIndex) {
                    this.dataLabtest2.push(element) ;
                }
            })
            this.dataLabtest2.forEach ((element, index) => {
                if (parseFloat(element.result) >= 60) {
                    this.temp = element.datetime.split(" ") ;
                    element.datetime = this.temp[0] ;
                    element.result = parseFloat(element.result) ;
                    this.datashow3.push(element) ;
                    }
            })
            this._categoricalSource3 = new ObservableArray(this.datashow3) ;
        },
        (error) => {
            console.log("data error") ;
            alert("กรุณาลองอีกครั้ง") ;
            this.router.navigate(["/bloodResultSelect"]) ;
        }
    )
 }
 
   setTimeout(() => {
       this.isChart = true ;
       this.loader.hide() ;
     }, 5000) ;
}
else if (this.selectBlood.numberIndex == "LDL") {

    this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab0 = Response.dataset ;
           this.dataLab0.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0]  ;
                   element.result = parseFloat(element.result) ;
                   this.datashow1.push(element);
               }
           })
           this._categoricalSource = new ObservableArray(this.datashow1) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )

   this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab2 = Response.dataset ;
           this.dataLab2.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.dataLabtest1.push(element) ;
               }
           })
           this.dataLabtest1.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
               if (parseFloat(element.result) > 100 && parseFloat(element.result) < 160) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0] ;
                   element.result = parseFloat(element.result) ;
                   this.datashow2.push(element) ;
               }
           }
           })
           this._categoricalSource2 = new ObservableArray(this.datashow2) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )
   this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab3 = Response.dataset ;
           this.dataLab3.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.dataLabtest2.push(element) ;
               }
           })
           this.dataLabtest2.forEach ((element, index) => {
               if (parseFloat(element.result) >= 160) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0] ;
                   element.result = parseFloat(element.result) ;
                   this.datashow3.push(element) ;
                   }
           })
           this._categoricalSource3 = new ObservableArray(this.datashow3) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )
 
   setTimeout(() => {
       this.isChart = true ;
       this.loader.hide() ;
     }, 5000) ;
}
else if (this.selectBlood.numberIndex == "Triglycerides") {

    this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab0 = Response.dataset ;
           this.dataLab0.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0]  ;
                   element.result = parseFloat(element.result) ;
                   this.datashow1.push(element);
               }
           })
           this._categoricalSource = new ObservableArray(this.datashow1) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )

   this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab2 = Response.dataset ;
           this.dataLab2.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.dataLabtest1.push(element) ;
               }
           })
           this.dataLabtest1.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
               if (parseFloat(element.result) >= 150 && parseFloat(element.result) <= 200) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0] ;
                   element.result = parseFloat(element.result) ;
                   this.datashow2.push(element) ;
               }
           }
           })
           this._categoricalSource2 = new ObservableArray(this.datashow2) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )
   this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab3 = Response.dataset ;
           this.dataLab3.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.dataLabtest2.push(element) ;
               }
           })
           this.dataLabtest2.forEach ((element, index) => {
               if (parseFloat(element.result) > 200) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0] ;
                   element.result = parseFloat(element.result) ;
                   this.datashow3.push(element);
                   }
           })
           this._categoricalSource3 = new ObservableArray(this.datashow3) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )
 
   setTimeout(() => {
       this.isChart = true ;
       this.loader.hide() ;
     }, 5000) ;
}
else if (this.selectBlood.numberIndex == "BUN") {
    this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab0 = Response.dataset ;
           this.dataLab0.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0]  ;
                   element.result = parseFloat(element.result) ;
                   this.datashow1.push(element);
               }
           })
           this._categoricalSource = new ObservableArray(this.datashow1) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )

   this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab2 = Response.dataset ;
           this.dataLab2.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.dataLabtest1.push(element) ;
               }
           })
           this.dataLabtest1.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
               if (parseFloat(element.result) > 20 || parseFloat(element.result) < 5) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0] ;
                   element.result = parseFloat(element.result) ;
                   this.datashow2.push(element) ;
               }
           }
           })
           this._categoricalSource2 = new ObservableArray(this.datashow2) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )
 
   setTimeout(() => {
       this.isChart = true ;
       this.loader.hide() ;
     }, 5000) ;
}
else if (this.selectBlood.numberIndex == "Cholesterol") {
    this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab0 = Response.dataset ;
           this.dataLab0.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0]  ;
                   element.result = parseFloat(element.result) ;
                   this.datashow1.push(element);
               }
           })
           this._categoricalSource = new ObservableArray(this.datashow1) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )

   this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab2 = Response.dataset ;
           this.dataLab2.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.dataLabtest1.push(element) ;
               }
           })
           this.dataLabtest1.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
               if (parseFloat(element.result) >= 201 || parseFloat(element.result) <= 240) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0] ;
                   element.result = parseFloat(element.result) ;
                   this.datashow2.push(element) ;
               }
           }
           })
           this._categoricalSource2 = new ObservableArray(this.datashow2) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )
   this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab3 = Response.dataset ;
           this.dataLab3.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.dataLabtest2.push(element) ;
               }
           })
           this.dataLabtest2.forEach ((element, index) => {
               if (parseFloat(element.result) > 240) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0] ;
                   element.result = parseFloat(element.result) ;
                   this.datashow3.push(element);
                   }
           })
           this._categoricalSource3 = new ObservableArray(this.datashow3) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )
 
   setTimeout(() => {
       this.isChart = true ;
       this.loader.hide() ;
     }, 5000) ;
}
else if (this.selectBlood.numberIndex == "Creatinine") {
    this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab0 = Response.dataset ;
           this.dataLab0.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0]  ;
                   element.result = parseFloat(element.result) ;
                   this.datashow1.push(element);
               }
           })
           this._categoricalSource = new ObservableArray(this.datashow1) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )

   this.bloodChartService.getDataLab(this.hospitalnumber)
   .subscribe(
       (Response) => {
           this.dataLab2 = Response.dataset ;
           this.dataLab2.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
                   this.dataLabtest1.push(element) ;
               }
           })
           this.dataLabtest1.forEach ((element, index) => {
               if (element.test == this.selectBlood.numberIndex) {
               if (parseFloat(element.result) > 1.3 || parseFloat(element.result) < 0.7) {
                   this.temp = element.datetime.split(" ") ;
                   element.datetime = this.temp[0] ;
                   element.result = parseFloat(element.result) ;
                   this.datashow2.push(element) ;
               }
           }
           })
           this._categoricalSource2 = new ObservableArray(this.datashow2) ;
       },
       (error) => {
           console.log("data error") ;
           alert("กรุณาลองอีกครั้ง") ;
           this.router.navigate(["/bloodResultSelect"]) ;
       }
   )
 
   setTimeout(() => {
       this.isChart = true ;
       this.loader.hide() ;
     }, 5000) ;
}
// else if (this.selectBlood.numberIndex == "RBC") {

//     this.bloodChartService.getDataLab(this.hospitalnumber)
//    .subscribe(
//        (Response) => {
//            this.dataLab0 = Response.dataset ;
//            this.dataLab0.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                    if (parseFloat(element.result) < 10) {
//                    this.temp = element.datetime.split(" ") ;
//                    element.datetime = this.temp[0] ;
//                    element.result = parseFloat(element.result) ;
//                    this.datashow1.push(element) ;
//                    }
//                }
//            })
//            this._categoricalSource = new ObservableArray(this.datashow1.reverse()) ;
//        },
//        (error) => {
//            console.log("data error") ;
//            alert("กรุณาลองอีกครั้ง") ;
//            this.router.navigate(["/bloodResultSelect"]) ;
//        }
//    )

//    this.bloodChartService.getDataLab(this.hospitalnumber)
//    .subscribe(
//        (Response) => {
//            this.dataLab2 = Response.dataset ;
//            this.dataLab2.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                 if (parseFloat(element.result) < 10) {
//                    this.dataLabtest1.push(element) ;
//                 }
//                }
//            })
//            this.dataLabtest1.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                if (parseFloat(element.result) > 5.4 && parseFloat(element.result) < 4.2) {
//                    this.temp = element.datetime.split(" ") ;
//                    element.datetime = this.temp[0] ;
//                    element.result = parseFloat(element.result) ;
//                    this.datashow2.push(element) ;
//                }
//            }
//            })
//            this._categoricalSource2 = new ObservableArray(this.datashow2.reverse()) ;
//        },
//        (error) => {
//            console.log("data error") ;
//            alert("กรุณาลองอีกครั้ง") ;
//            this.router.navigate(["/bloodResultSelect"]) ;
//        }
//    )
 
//    setTimeout(() => {
//        this.isChart = true ;
//        this.loader.hide() ;
//      }, 8000) ;
// }
// else if (this.selectBlood.numberIndex == "Hb") {

//     this.bloodChartService.getDataLab(this.hospitalnumber)
//    .subscribe(
//        (Response) => {
//            this.dataLab0 = Response.dataset ;
//            this.dataLab0.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                    this.temp = element.datetime.split(" ") ;
//                    element.datetime = this.temp[0]  ;
//                    element.result = parseFloat(element.result) ;
//                    this.datashow1.push(element);
//                }
//            })
//            this._categoricalSource = new ObservableArray(this.datashow1.reverse()) ;
//        },
//        (error) => {
//            console.log("data error") ;
//            alert("กรุณาลองอีกครั้ง") ;
//            this.router.navigate(["/bloodResultSelect"]) ;
//        }
//    )
//    if (this.gender == "ชาย") {
//     console.log("gender : " + this.gender + "connect") ;
//    this.bloodChartService.getDataLab(this.hospitalnumber)
//    .subscribe(
//        (Response) => {
//            this.dataLab2 = Response.dataset ;
//            this.dataLab2.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                    this.dataLabtest1.push(element) ;
//                }
//            })
//            this.dataLabtest1.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                if (parseFloat(element.result) < 14 && parseFloat(element.result) > 18) {
//                    this.temp = element.datetime.split(" ") ;
//                    element.datetime = this.temp[0] ;
//                    element.result = parseFloat(element.result) ;
//                    this.datashow2.push(element) ;
//                }
//            }
//            })
//            this._categoricalSource2 = new ObservableArray(this.datashow2.reverse()) ;
//        },
//        (error) => {
//            console.log("data error") ;
//            alert("กรุณาลองอีกครั้ง") ;
//            this.router.navigate(["/bloodResultSelect"]) ;
//        }
//    )
// }
// else if (this.gender == "หญิง") {
//     this.bloodChartService.getDataLab(this.hospitalnumber)
//     .subscribe(
//         (Response) => {
//             this.dataLab2 = Response.dataset ;
//             this.dataLab2.forEach ((element, index) => {
//                 if (element.test == this.selectBlood.numberIndex) {
//                     this.dataLabtest1.push(element) ;
//                 }
//             })
//             this.dataLabtest1.forEach ((element, index) => {
//                 if (element.test == this.selectBlood.numberIndex) {
//                 if (parseFloat(element.result) < 12 && parseFloat(element.result) > 16) {
//                     this.temp = element.datetime.split(" ") ;
//                     element.datetime = this.temp[0] ;
//                     element.result = parseFloat(element.result) ;
//                     this.datashow2.push(element) ;
//                 }
//             }
//             })
//             this._categoricalSource2 = new ObservableArray(this.datashow2.reverse()) ;
//         },
//         (error) => {
//             console.log("data error") ;
//             alert("กรุณาลองอีกครั้ง") ;
//             this.router.navigate(["/bloodResultSelect"]) ;
//         }
//     )
//  }
 
//    setTimeout(() => {
//        this.isChart = true ;
//        this.loader.hide() ;
//      }, 8000) ;
// }
// else if (this.selectBlood.numberIndex == "Hct") {

//     this.bloodChartService.getDataLab(this.hospitalnumber)
//    .subscribe(
//        (Response) => {
//            this.dataLab0 = Response.dataset ;
//            this.dataLab0.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                    this.temp = element.datetime.split(" ") ;
//                    element.datetime = this.temp[0]  ;
//                    element.result = parseFloat(element.result) ;
//                    this.datashow1.push(element);
//                }
//            })
//            this._categoricalSource = new ObservableArray(this.datashow1.reverse()) ;
//        },
//        (error) => {
//            console.log("data error") ;
//            alert("กรุณาลองอีกครั้ง") ;
//            this.router.navigate(["/bloodResultSelect"]) ;
//        }
//    )
//    if (this.gender == "ชาย") {
//     console.log("gender : " + this.gender + "connect") ;
//    this.bloodChartService.getDataLab(this.hospitalnumber)
//    .subscribe(
//        (Response) => {
//            this.dataLab2 = Response.dataset ;
//            this.dataLab2.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                    this.dataLabtest1.push(element) ;
//                }
//            })
//            this.dataLabtest1.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                if (parseFloat(element.result) < 42 && parseFloat(element.result) > 52) {
//                    this.temp = element.datetime.split(" ") ;
//                    element.datetime = this.temp[0] ;
//                    element.result = parseFloat(element.result) ;
//                    this.datashow2.push(element) ;
//                }
//            }
//            })
//            this._categoricalSource2 = new ObservableArray(this.datashow2.reverse()) ;
//        },
//        (error) => {
//            console.log("data error") ;
//            alert("กรุณาลองอีกครั้ง") ;
//            this.router.navigate(["/bloodResultSelect"]) ;
//        }
//    )
// }
// else if (this.gender == "หญิง") {
//     this.bloodChartService.getDataLab(this.hospitalnumber)
//     .subscribe(
//         (Response) => {
//             this.dataLab2 = Response.dataset ;
//             this.dataLab2.forEach ((element, index) => {
//                 if (element.test == this.selectBlood.numberIndex) {
//                     this.dataLabtest1.push(element) ;
//                 }
//             })
//             this.dataLabtest1.forEach ((element, index) => {
//                 if (element.test == this.selectBlood.numberIndex) {
//                 if (parseFloat(element.result) < 36 && parseFloat(element.result) > 48) {
//                     this.temp = element.datetime.split(" ") ;
//                     element.datetime = this.temp[0] ;
//                     element.result = parseFloat(element.result) ;
//                     this.datashow2.push(element) ;
//                 }
//             }
//             })
//             this._categoricalSource2 = new ObservableArray(this.datashow2.reverse()) ;
//         },
//         (error) => {
//             console.log("data error") ;
//             alert("กรุณาลองอีกครั้ง") ;
//             this.router.navigate(["/bloodResultSelect"]) ;
//         }
//     )
//  }
 
//    setTimeout(() => {
//        this.isChart = true ;
//        this.loader.hide() ;
//      }, 8000) ;
// }
// else if (this.selectBlood.numberIndex == "MCV") {

//     this.bloodChartService.getDataLab(this.hospitalnumber)
//    .subscribe(
//        (Response) => {
//            this.dataLab0 = Response.dataset ;
//            this.dataLab0.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                    this.temp = element.datetime.split(" ") ;
//                    element.datetime = this.temp[0]  ;
//                    element.result = parseFloat(element.result) ;
//                    this.datashow1.push(element);
//                }
//            })
//            this._categoricalSource = new ObservableArray(this.datashow1.reverse()) ;
//        },
//        (error) => {
//            console.log("data error") ;
//            alert("กรุณาลองอีกครั้ง") ;
//            this.router.navigate(["/bloodResultSelect"]) ;
//        }
//    )
//    this.bloodChartService.getDataLab(this.hospitalnumber)
//    .subscribe(
//        (Response) => {
//            this.dataLab2 = Response.dataset ;
//            this.dataLab2.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                    this.dataLabtest1.push(element) ;
//                }
//            })
//            this.dataLabtest1.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                if (parseFloat(element.result) < 78 && parseFloat(element.result) > 98) {
//                    this.temp = element.datetime.split(" ") ;
//                    element.datetime = this.temp[0] ;
//                    element.result = parseFloat(element.result) ;
//                    this.datashow2.push(element) ;
//                }
//            }
//            })
//            this._categoricalSource2 = new ObservableArray(this.datashow2.reverse()) ;
//        },
//        (error) => {
//            console.log("data error") ;
//            alert("กรุณาลองอีกครั้ง") ;
//            this.router.navigate(["/bloodResultSelect"]) ;
//        }
//    )
 
//    setTimeout(() => {
//        this.isChart = true ;
//        this.loader.hide() ;
//      }, 8000) ;
// }
// else if (this.selectBlood.numberIndex == "pH") {

//     this.bloodChartService.getDataLab(this.hospitalnumber)
//    .subscribe(
//        (Response) => {
//            this.dataLab0 = Response.dataset ;
//            this.dataLab0.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                    this.temp = element.datetime.split(" ") ;
//                    element.datetime = this.temp[0]  ;
//                    element.result = parseFloat(element.result) ;
//                    this.datashow1.push(element);
//                }
//            })
//            this._categoricalSource = new ObservableArray(this.datashow1.reverse()) ;
//        },
//        (error) => {
//            console.log("data error") ;
//            alert("กรุณาลองอีกครั้ง") ;
//            this.router.navigate(["/bloodResultSelect"]) ;
//        }
//    )
//    this.bloodChartService.getDataLab(this.hospitalnumber)
//    .subscribe(
//        (Response) => {
//            this.dataLab2 = Response.dataset ;
//            this.dataLab2.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                    this.dataLabtest1.push(element) ;
//                }
//            })
//            this.dataLabtest1.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                if (parseFloat(element.result) < 4.6 && parseFloat(element.result) > 8.0) {
//                    this.temp = element.datetime.split(" ") ;
//                    element.datetime = this.temp[0] ;
//                    element.result = parseFloat(element.result) ;
//                    this.datashow2.push(element) ;
//                }
//            }
//            })
//            this._categoricalSource2 = new ObservableArray(this.datashow2.reverse()) ;
//        },
//        (error) => {
//            console.log("data error") ;
//            alert("กรุณาลองอีกครั้ง") ;
//            this.router.navigate(["/bloodResultSelect"]) ;
//        }
//    )
 
//    setTimeout(() => {
//        this.isChart = true ;
//        this.loader.hide() ;
//      }, 8000) ;
// }
// else if (this.selectBlood.numberIndex == "Protein") {

//     this.bloodChartService.getDataLab(this.hospitalnumber)
//    .subscribe(
//        (Response) => {
//            this.dataLab0 = Response.dataset ;
//            this.dataLab0.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                    this.temp = element.datetime.split(" ") ;
//                    element.datetime = this.temp[0]  ;
//                    element.result = parseFloat(element.result) ;
//                    this.datashow1.push(element);
//                }
//            })
//            this._categoricalSource = new ObservableArray(this.datashow1.reverse()) ;
//        },
//        (error) => {
//            console.log("data error") ;
//            alert("กรุณาลองอีกครั้ง") ;
//            this.router.navigate(["/bloodResultSelect"]) ;
//        }
//    )
//    this.bloodChartService.getDataLab(this.hospitalnumber)
//    .subscribe(
//        (Response) => {
//            this.dataLab2 = Response.dataset ;
//            this.dataLab2.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                    this.dataLabtest1.push(element) ;
//                }
//            })
//            this.dataLabtest1.forEach ((element, index) => {
//                if (element.test == this.selectBlood.numberIndex) {
//                if (parseFloat(element.result) < 6.4 && parseFloat(element.result) > 8.3) {
//                    this.temp = element.datetime.split(" ") ;
//                    element.datetime = this.temp[0] ;
//                    element.result = parseFloat(element.result) ;
//                    this.datashow2.push(element) ;
//                }
//            }
//            })
//            this._categoricalSource2 = new ObservableArray(this.datashow2.reverse()) ;
//        },
//        (error) => {
//            console.log("data error") ;
//            alert("กรุณาลองอีกครั้ง") ;
//            this.router.navigate(["/bloodResultSelect"]) ;
//        }
//    )
 
//    setTimeout(() => {
//        this.isChart = true ;
//        this.loader.hide() ;
//      }, 8000) ;
// }

    else {this.loader.hide() ; alert("ไม่พบข้อมูล") ; this.router.navigate(["/bloodResultSelect"]);}

    }

    constructor(
        private fonticon: TNSFontIconService,
        private _changeDetectionRef: ChangeDetectorRef,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        private bloodChartService: bloodChartService,
        page: Page) {
            this.loader.show(this.options) ;
            route.url.subscribe((s:UrlSegment[]) => {
                console.log("url", s) ;
            });
    }

    openDrawer () {
        this.sideBar.openDrawer() ;
    }

    get categoricalSource(): ObservableArray<any> {
      return this._categoricalSource ;
    }
    get categoricalSource2(): ObservableArray<any> {
        return this._categoricalSource2 ;
    }
    get categoricalSource3(): ObservableArray<any> {
        return this._categoricalSource3 ;
    }
    get categoricalSource4(): ObservableArray<any> {
        return this._categoricalSource4 ;
    }

    toBack () {
        console.log("connect") ;
        this.router.navigate(["/bloodResultSelect"]) ;
    }
  
 }