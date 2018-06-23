import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import * as dialogs from "ui/dialogs";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {LoadingIndicator} from "nativescript-loading-indicator";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import {Input, ChangeDetectionStrategy} from '@angular/core';
import { sideBarComponent } from "../../loginProfile/sideBar/sideBar.component";
import { hyperSelectOne } from "../../../security/model/hyperSelectOne.model";
import { hyperSelectChart } from "../../../security/model/hyperSelectChart.model";
import { hyperSelectService } from "./hyperSelect.service";
import { hyperModalComponent } from "./hyperModal.component";
import {SetupItemViewArgs} from "nativescript-angular/directives";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "hyperSelect",
    templateUrl: "hyperSelect.component.html",
    styleUrls: ['hyperSelect.component.css'],
    moduleId: module.id
})


export class hyperSelectComponent implements OnInit {
    public myItems: Array<DataItem>;
    private counter: number;
    hyperSelectOne: hyperSelectOne ;
    hyperSelectChart: hyperSelectChart ;
    dataUser ;
    dataHyper = [] ;
    checkHyper1 = false ;
    checkHyper2 = false ;
    checkHyper3 = false ;
    checkHyper4 = false ;
    checkHyper5 = false ;
    checkChart = true ;
    checkStandard = true ;
    perSen = "85%" ;
    heart ;
    type;
    isChart = false ;
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

      openDrawer () {
          this.sideBar.openDrawer();
      }

      onSetupItemView(args: SetupItemViewArgs) {
        args.view.context.odd = (args.index === 0) ;
        args.view.context.even = (args.index !== 0) ;
    }
    
    ngOnInit(): void {
        console.log("connect hyperSelect");
        this.hyperSelectChart = new hyperSelectChart ;
        this.hyperSelectChart.name = "" ;
        securityService.setHyperSelectChart = JSON.stringify(this.hyperSelectChart);
        console.log(securityService.getHyperSelectChart);
        this.hyperSelectOne = JSON.parse(securityService.getHyperSelectOne);
        console.log(securityService.getHyperSelectOne);
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
            this.perSen = "100%"
            this.checkHyper5 = true ;
        }
        this.dataUser = JSON.parse(securityService.getDataUser);
        console.log(this.dataUser.dataset.hn);
        this.hyperSelectService.getDataVitalsign(this.dataUser.dataset.hn)
                    .subscribe(
                        (Response) => {
                            this.dataHyper = Response.dataset ;
                            // console.log(JSON.stringify(this.dataHyper));
                        },
                        (error) => {
                            console.log("data error");
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/hyper"]);
                        }
                    )
            
                    if(this.hyperSelectOne.nameIndex == "0"){
                        this.type = " BMI"
                    }
                    else if(this.hyperSelectOne.nameIndex == "1"){
                        this.type = " mmHg"
                    }
                    else if(this.hyperSelectOne.nameIndex == "2"){
                        this.type = " per/minute"
                    }
                    else if(this.hyperSelectOne.nameIndex == "3"){
                        this.type = " kg"
                    }
                    else if(this.hyperSelectOne.nameIndex == "4"){
                        this.type = " cm"
                    }
                    setTimeout(() => {
                        this.isChart = true ;
                        this.loader.hide() ;
                      }, 3000) ;
    }

    constructor(
        private fonticon: TNSFontIconService,
        private _changeDetectionRef: ChangeDetectorRef,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        private hyperSelectService: hyperSelectService,
        page: Page) {
            this.loader.show(this.options) ;
            route.url.subscribe((s:UrlSegment[]) => {
                console.log("url", s);
            });
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
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
        console.log("connect");
        this.router.navigate(["/hyper"]);
    }

    toHyperChart (num) {
        console.log("connect");
        if (num == "0") {
            this.loader.show(this.options);
            this.hyperSelectChart.name = "ดัชนีมวลกาย" ;
            securityService.setHyperSelectChart = JSON.stringify(this.hyperSelectChart);
            console.log(securityService.getHyperSelectChart);
            this.router.navigate(["/hyperChart"]);
            this.demoLoader();
        }
        else if (num == "1") {
            this.loader.show(this.options);
            this.hyperSelectChart.name = "ความดันโลหิต" ;
            securityService.setHyperSelectChart = JSON.stringify(this.hyperSelectChart);
            console.log(securityService.getHyperSelectChart);
            this.router.navigate(["/hyperChart"]);
            this.demoLoader();
        }
        else if (num == "2") {
            this.loader.show(this.options);
            this.hyperSelectChart.name = "ชีพจร" ;
            securityService.setHyperSelectChart = JSON.stringify(this.hyperSelectChart);
            console.log(securityService.getHyperSelectChart);
            this.router.navigate(["/hyperChart"]);
            this.demoLoader();
        }
        else if (num == "3") {
            this.loader.show(this.options);
            this.hyperSelectChart.name = "น้ำหนัก" ;
            securityService.setHyperSelectChart = JSON.stringify(this.hyperSelectChart);
            console.log(securityService.getHyperSelectChart);
            this.router.navigate(["/hyperChart"]);
            this.demoLoader();
        }
        else if (num == "4") {
            this.loader.show(this.options);
            this.hyperSelectChart.name = "ส่วนสูง" ;
            securityService.setHyperSelectChart = JSON.stringify(this.hyperSelectChart);
            console.log(securityService.getHyperSelectChart);
            this.router.navigate(["/hyperChart"]);
            this.demoLoader();
        }
    
    }

    checkIndex (number) {
        if (number == "0") {
            return true ;
        }
        else if (number == "1") {
            return true ;
        }
        else if (number == "2") {
            return true ;
        }
        else if (number == "3") {
            this.checkStandard = false ;
            return true ;
        }
        else if (number == "4") {
            this.checkChart = false ;
            this.checkStandard = false ;
            return true ;
        }
    }

    showHyperSelectOne () {
        console.log("ok");
        let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(hyperModalComponent, options).then(res => {
        });
    }

    checkDataHyper (i) {
            if (this.hyperSelectOne.nameIndex == "0") {
                if (parseFloat(i) >= 18.6 && parseFloat(i) <= 22.9) {
                    this.heart = "~/images/gh.png" ;
                    return true ;
                }
                else if (parseFloat(i) <= 18.5) {
                    this.heart = "~/images/yh.png" ;
                    return true ;
                }
                else if (parseFloat(i) >= 23.0 && parseFloat(i) <= 24.9) {
                    this.heart = "~/images/yh.png" ;
                    return true ;
                }
                else if (parseFloat(i) >= 25.0) {
                    this.heart = "~/images/rh.png" ;
                    return true ;
                }
            }

            else if (this.hyperSelectOne.nameIndex == "1") {
                if ((parseInt(i.substring(0,3)) >= 90 && parseInt(i.substring(0,3)) <= 119) && (parseInt(i.substring(4,6)) >= 60 && parseInt(i.substring(4,6)) <= 79)) {
                    this.heart = "~/images/rh.png" ;
                    return true ;
                }
                else if ((parseInt(i.substring(0,3)) >= 120 && parseInt(i.substring(0,3)) <= 179) || (parseInt(i.substring(4,6)) >= 60 && parseInt(i.substring(4,6)) <= 79)) {
                    this.heart = "~/images/yh.png" ;
                    return true ;
                }
                else if ((parseInt(i.substring(0,3)) >= 90 && parseInt(i.substring(0,3)) <= 119) || (parseInt(i.substring(4,6)) >= 80 && parseInt(i.substring(4,6)) <= 109)) {
                    this.heart = "~/images/yh.png" ;
                    return true ;
                }
                else if ((parseInt(i.substring(0,3)) >= 120 && parseInt(i.substring(0,3)) <= 179) || (parseInt(i.substring(4,6)) >= 80 && parseInt(i.substring(4,6)) <= 109)) {
                    this.heart = "~/images/yh.png" ;
                    return true ;
                }
                else if (parseInt(i.substring(0,3)) >= 180 || parseInt(i.substring(4,6)) >= 110) {
                    this.heart = "~/images/rh.png" ;
                    return true ;
                }
            }
            else if (this.hyperSelectOne.nameIndex == "2") {
                console.log(i);
                if (parseInt(i) >= 60 && parseInt(i) <= 100) {
                    this.heart = "~/images/gh.png" ;
                    return true ;
                }
                else if (parseInt(i) >= 101 && parseInt(i) <= 139) {
                    this.heart = "~/images/yh.png" ;
                    return true ;
                }
                else if (parseInt(i) >= 140) {
                    this.heart = "~/images/rh.png" ;
                    return true ;
                }
            }
    }
   
    private demoLoader() {
        setTimeout(() => {
          this.loader.hide();
        }, 1000);
      }
  
 }