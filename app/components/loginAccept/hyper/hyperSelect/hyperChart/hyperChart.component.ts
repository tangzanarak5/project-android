import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import * as dialogs from "ui/dialogs";
import { ActivityIndicator } from "ui/activity-indicator";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {LoadingIndicator} from "nativescript-loading-indicator";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as frameModule from "tns-core-modules/ui/frame";
import {Input, ChangeDetectionStrategy} from '@angular/core';
import { sideBarComponent } from "../../../loginProfile/sideBar/sideBar.component";
import { hyperChartService } from "./hyperChart.service";

@Component({
    selector: "hyperChart",
    templateUrl: "hyperChart.component.html",
    styleUrls: ['hyperChart.component.css'],
    moduleId: module.id
})


export class hyperChartComponent implements OnInit {
    isChart = false ;
    dataUser ;
    hyperSelectOne ;
    hyperSelectChart ;
    checkHyper1 = false ;
    checkHyper2 = false ;
    checkHyper3 = false ;
    checkHyper4 = false ;
    checkHyper5 = false ;
   public data1 = [] ;
   public data2 = [] ;
   public dataStard1 = [] ;
   public dataStard2 = [] ;
   public dataStard3 = [] ;
   public dataStard4 = [] ;
    allData = [
        {
            nameEng: "Body Mass",
            nameThai: "ดัชนีมวลกาย"
        },
        {
            nameEng: "Blood Pressure",
            nameThai: "ความดันโลหิต"
        },
        {
            nameEng: "Pulse",
            nameThai: "ชีพจร"
        },
        {
            nameEng: "Weight",
            nameThai: "น้ำหนัก"
        },
        {
            nameEng: "Height",
            nameThai: "ส่วนสูง"
        }
] ;
    private _categoricalSource: ObservableArray<any>;
    private _categoricalSource2: ObservableArray<any>;
    private _categoricalSource3: ObservableArray<any>;
    private _categoricalSource4: ObservableArray<any>;
    private _categoricalSource5: ObservableArray<any>;
    private _categoricalSource6: ObservableArray<any>;
    private _categoricalSource7: ObservableArray<any>;
    private _categoricalSource8: ObservableArray<any>;
    private _categoricalSource9: ObservableArray<any>;
    private _categoricalSource10: ObservableArray<any>;
    private _categoricalSource11: ObservableArray<any>;
    private _categoricalSource12: ObservableArray<any>;
    private _categoricalSource13: ObservableArray<any>;
    private _categoricalSource14: ObservableArray<any>;
    private _categoricalSource15: ObservableArray<any>;
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

      @ViewChild('sidebar') sideBar: sideBarComponent

      ngOnInit(): void {
        this.loader.hide();
        this.hyperSelectOne = JSON.parse(securityService.getHyperSelectOne);
        console.log(securityService.getHyperSelectOne);
        this.hyperSelectChart = JSON.parse(securityService.getHyperSelectChart);
        console.log(securityService.getHyperSelectChart);

        if (this.hyperSelectOne.nameIndex == "0") {
            this.checkHyper1 = true ;
        }
        else if (this.hyperSelectOne.nameIndex == "1") {
            this.checkHyper2 = true ;
        }
        else if (this.hyperSelectOne.nameIndex == "2") {
            this.checkHyper3 = true ;
        }
        else if (this.hyperSelectOne.nameIndex == "3") {
            this.checkHyper4 = true ;
        }
        else if (this.hyperSelectOne.nameIndex == "4") {
            this.checkHyper5 = true ;
        }

        this.dataUser = JSON.parse(securityService.getDataUser);

        if (this.hyperSelectOne.nameIndex == "0") {
            this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                .subscribe(
                    (Response) => {
                        this.data1 = Response.dataset ;
                        this._categoricalSource7 = new ObservableArray(this.data1.reverse());
                        },
                        (error) => {
                            console.log("data errorr");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )

                    this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                .subscribe(
                    (Response) => {

                        this.data1 = Response.dataset ;

                            for(let i = 0 ; i < this.data1.length ; i++) {
                                if (parseFloat(this.data1[i].bmi) <= 18.5) {
                                this.data1[i].bmi = parseFloat(this.data1[i].bmi) ;
                                console.log(this.data1[i].bmi);
                                }
                                else { this.data1[i].bmi = "" ; }
                            }
                            this._categoricalSource8 = new ObservableArray(this.data1.reverse());
                        },
                        (error) => {
                            console.log("data errorr");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )

                    this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                .subscribe(
                    (Response) => {

                        this.data1 = Response.dataset ;

                            for(let i = 0 ; i < this.data1.length ; i++) {
                                if (parseFloat(this.data1[i].bmi) >= 23.0 && parseFloat(this.data1[i].bmi) <= 29.9) {
                                this.data1[i].bmi = parseFloat(this.data1[i].bmi) ;
                                console.log(this.data1[i].bmi);
                                }
                                else { this.data1[i].bmi = "" ; }
                            }
                            this._categoricalSource9 = new ObservableArray(this.data1.reverse());
                        },
                        (error) => {
                            console.log("data errorr");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )

                    this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                .subscribe(
                    (Response) => {

                        this.data1 = Response.dataset ;

                            for(let i = 0 ; i < this.data1.length ; i++) {
                                if (parseFloat(this.data1[i].bmi) >= 30.0) {
                                this.data1[i].bmi = parseFloat(this.data1[i].bmi) ;
                                console.log(this.data1[i].bmi);
                                }
                                else { this.data1[i].bmi = "" ; }
                            }
                            this._categoricalSource10 = new ObservableArray(this.data1.reverse());
                        },
                        (error) => {
                            console.log("data errorr");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )
                    setTimeout(() => {
                        this.isChart = true;
                      }, 2000);
        }

        else if(this.hyperSelectOne.nameIndex == "1"){

            this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                .subscribe(
                    (Response) => {

                        let temp = [] ;
                        this.data1 = Response.dataset ;

                            for(let i = 0 ; i < this.data1.length ; i++) {
                                temp = this.data1[i].bp.split("/");
                                this.data1[i].bp = parseInt(temp[1]) ;
                                console.log(this.data1[i].bp);
                            }
                            this._categoricalSource = new ObservableArray(this.data1.reverse());
                        },
                        (error) => {
                            console.log("data errorr");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )
           
            this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                .subscribe(
                    (Response) => {

                        let temp = [] ;
                        this.data2 = Response.dataset ;
                                
                        for(let i = 0 ; i < this.data2.length ; i++) {
                            temp = this.data2[i].bp.split("/");
                            this.data2[i].bp = parseInt(temp[0]) ;
                            console.log(this.data2[i].bp);
                        }
                            this._categoricalSource2 = new ObservableArray(this.data2.reverse());
                    },
                        (error) => {
                            console.log("data error");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )
                    
                    this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                    .subscribe(
                        (Response) => {

                            let temp = [] ;
                            this.dataStard1 = Response.dataset ;

                            for(let i = 0 ; i < this.dataStard1.length ; i++) {
                                if (parseInt(this.dataStard1[i].bp.substring(0,3)) > 180) {
                                    temp = this.dataStard1[i].bp.split("/");
                                    this.dataStard1[i].bp = parseInt(temp[0]) ;
                                    console.log(this.dataStard1[i].bp);
                            }
                        }
                        this._categoricalSource3 = new ObservableArray(this.dataStard1.reverse());
                        },
                        (error) => {
                            console.log("data error");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )

                    this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                    .subscribe(
                        (Response) => {

                            let temp = [] ;
                            this.dataStard2 = Response.dataset ;

                            for(let i = 0 ; i < this.dataStard2.length ; i++) {
                                temp = this.dataStard2[i].bp.split("/");
                                if (parseInt(temp[0]) >= 120 && parseInt(temp[0]) <= 179) {
                                this.dataStard2[i].bp = parseInt(temp[0]) ;
                                console.log(this.dataStard2[i].bp);
                            }
                        }
                        this._categoricalSource4 = new ObservableArray(this.dataStard2.reverse());
                        },
                        (error) => {
                            console.log("data error");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )

                    this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                    .subscribe(
                        (Response) => {
                            
                            let temp = [] ;
                            this.dataStard3 = Response.dataset ;

                            for(let i = 0 ; i < this.dataStard3.length ; i++) {
                                temp = this.dataStard3[i].bp.split("/");
                                if (parseInt(temp[1]) >= 80 && parseInt(temp[1]) <= 109) {
                                this.dataStard3[i].bp = parseInt(temp[1]) ;
                                console.log(this.dataStard3[i].bp);
                            }
                        }
                        this._categoricalSource5 = new ObservableArray(this.dataStard3.reverse());
                        },
                        (error) => {
                            console.log("data error");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )

                    this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                    .subscribe(
                        (Response) => {

                            let temp = [] ;
                            this.dataStard4 = Response.dataset ;

                            for(let i = 0 ; i < this.dataStard4.length ; i++) {
                                temp = this.dataStard4[i].bp.split("/");
                                if (parseInt(temp[1]) >= 110) {
                                this.dataStard4[i].bp = parseInt(temp[1]) ;
                                console.log(this.dataStard4[i].bp);
                            }
                        }
                        this._categoricalSource6 = new ObservableArray(this.dataStard4.reverse());
                        },
                        (error) => {
                            console.log("data error");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )
                    setTimeout(() => {
                        this.isChart = true;
                      }, 2000);
                }    
    
                else if (this.hyperSelectOne.nameIndex == "2") {

                    this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                    .subscribe(
                    (Response) => {
                        this.data1 = Response.dataset ;
                        this._categoricalSource11 = new ObservableArray(this.data1.reverse());
                        },
                        (error) => {
                            console.log("data error");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )

                    this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                    .subscribe(
                    (Response) => {

                        this.data1 = Response.dataset ;

                            for(let i = 0 ; i < this.data1.length ; i++) {
                                if (parseInt(this.data1[i].pulse) <= 60) {
                                this.data1[i].pulse = parseInt(this.data1[i].pulse) ;
                                console.log(this.data1[i].pulse);
                                }
                                else { this.data1[i].pulse = "" ; }
                            }
                            this._categoricalSource12 = new ObservableArray(this.data1.reverse());
                        },
                        (error) => {
                            console.log("data error");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )

                    this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                    .subscribe(
                    (Response) => {

                        this.data1 = Response.dataset ;

                            for(let i = 0 ; i < this.data1.length ; i++) {
                                if (parseInt(this.data1[i].pulse) <= 139 && parseInt(this.data1[i].pulse) >= 101) {
                                this.data1[i].pulse = parseInt(this.data1[i].pulse) ;
                                console.log(this.data1[i].pulse);
                                }
                                else { this.data1[i].pulse = "" ; }
                            }
                            this._categoricalSource13 = new ObservableArray(this.data1.reverse());
                        },
                        (error) => {
                            console.log("data error");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )

                    this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                    .subscribe(
                    (Response) => {

                        this.data1 = Response.dataset ;

                            for(let i = 0 ; i < this.data1.length ; i++) {
                                if (parseInt(this.data1[i].pulse) >= 140) {
                                this.data1[i].pulse = parseInt(this.data1[i].pulse) ;
                                console.log(this.data1[i].pulse);
                                }
                                else { this.data1[i].pulse = "" ; }
                            }
                            this._categoricalSource14 = new ObservableArray(this.data1.reverse());
                        },
                        (error) => {
                            console.log("data error");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]);
                        }
                    )
                    setTimeout(() => {
                        this.isChart = true;
                      }, 2000);
                }

                else if (this.hyperSelectOne.nameIndex == "3") {
                    this.hyperChartService.getDataVitalsign(this.dataUser.dataset.hn)
                    .subscribe(
                    (Response) => {
                        this.data1 = Response.dataset ;
                        this._categoricalSource15 = new ObservableArray(this.data1.reverse());
                        },
                        (error) => {
                            console.log("data error");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyperSelect"]) ;
                        }
                    )
                    setTimeout(() => {
                        this.isChart = true;
                      }, 2000);
                }
            }

    constructor(
        private fonticon: TNSFontIconService,
        private _changeDetectionRef: ChangeDetectorRef,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        private hyperChartService: hyperChartService,
        page: Page) {
            this.loader.show(this.options);
            route.url.subscribe((s:UrlSegment[]) => {
                console.log("url", s);
            });
    }

    openDrawer () {
        this.sideBar.openDrawer();
    }

    get categoricalSource(): ObservableArray<any> {
      return this._categoricalSource;
    }
    get categoricalSource2(): ObservableArray<any> {
        return this._categoricalSource2;
    }
    get categoricalSource3(): ObservableArray<any> {
        return this._categoricalSource3;
    }
    get categoricalSource4(): ObservableArray<any> {
        return this._categoricalSource4;
    }
    get categoricalSource5(): ObservableArray<any> {
        return this._categoricalSource5;
    }
    get categoricalSource6(): ObservableArray<any> {
        return this._categoricalSource6;
    }
    get categoricalSource7(): ObservableArray<any> {
        return this._categoricalSource7;
    }
    get categoricalSource8(): ObservableArray<any> {
        return this._categoricalSource8;
    }
    get categoricalSource9(): ObservableArray<any> {
        return this._categoricalSource9;
    }
    get categoricalSource10(): ObservableArray<any> {
        return this._categoricalSource10;
    }
    get categoricalSource11(): ObservableArray<any> {
        return this._categoricalSource11;
    }
    get categoricalSource12(): ObservableArray<any> {
        return this._categoricalSource12;
    }
    get categoricalSource13(): ObservableArray<any> {
        return this._categoricalSource13;
    }
    get categoricalSource14(): ObservableArray<any> {
        return this._categoricalSource14;
    }
    get categoricalSource15(): ObservableArray<any> {
        return this._categoricalSource15;
    }

    toBack () {
        console.log("connect");
        this.router.navigate(["/hyperSelect"]);
    }
  
 }