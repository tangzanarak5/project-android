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
    selectBlood: selectBlood ;
    selectBloodResult: selectBloodResult ;
    info: info ;
    public myItems: Array<DataItem>;
    private counter: number;
    bloodResult ;

    DM = [
        {
            namet : "ระดับน้ำตาลในเลือด",
            namee : "Fasting Blood Sugar"
        },
        {
            namet : "ระดับน้ำตาลเฉลี่ยในเลือด",
            namee : "HbA1C"
        }
    ] ;

    HPC = [
        {
            namet : "คอเลสเตอรอลที่ดี",
            namee : "HDL Cholesterol"
        },
        {
            namet : "ไขมันไม่ดี",
            namee : "LDL Cholesterol"
        }
    ] ;

    HPT = [
        {
            namet : "ความดันโลหิต",
            namee : "Blood pressure"
        },
        {
            namet : "ชีพจร",
            namee : "Pulse"
        }
    ] ;

    dataUser ;
    hospitalnumber ;
    loader = new LoadingIndicator();
    count ;
    checkDM = false ;
    checkHPC = false ;
    checkHPT = false ;
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
        this.selectBloodResult = new selectBloodResult ;
        this.selectBloodResult.numberIndex = "" ;
        this.selectBloodResult.name = "" ;
        this.selectBloodResult.nameTotal = "" ;
        securityService.setSelectBloodResult = JSON.stringify(this.selectBloodResult);
        console.log(securityService.getSelectBloodResult);
        this.selectBlood = JSON.parse(securityService.getSelectBlood);
        this.info = new info ;
        this.info.name = "" ;
        this.info.numberIndex = "" ;
        securityService.setInfo = JSON.stringify(this.info);
        console.log(securityService.getInfo);

        if (this.selectBlood.numberIndex == "0") {
            this.checkDM = true ;
        }
        if (this.selectBlood.numberIndex == "1") {
            this.checkHPC = true ;
        }
        if (this.selectBlood.numberIndex == "2") {
            this.checkHPT = true ;
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
    public onItemTapDM(args) {
        this.loader.show(this.options);
        console.log("------------------------ ItemTapped: " + args.index);
        this.selectBloodResult.numberIndex = args.index ;
        this.selectBloodResult.nameTotal = this.DM[args.index].namee + " ( " + this.DM[args.index].namet + " )" ;
        this.selectBloodResult.name = this.DM[args.index].namet ;
        securityService.setSelectBloodResult = JSON.stringify(this.selectBloodResult);
        // this.selectBlood = JSON.parse(securityService.getSelectBlood);
        console.log(securityService.getSelectBloodResult);
        this.router.navigate(["/bloodResultSelectTotal"]);
        this.demoLoader();
    }
    public onItemTapHPC(args) {
        this.loader.show(this.options);
        console.log("------------------------ ItemTapped: " + args.index);
        this.selectBloodResult.numberIndex = args.index ;
        this.selectBloodResult.nameTotal = this.HPC[args.index].namee + " ( " + this.HPC[args.index].namet + " )" ;
        this.selectBloodResult.name = this.HPC[args.index].namet ;
        securityService.setSelectBloodResult = JSON.stringify(this.selectBloodResult);
        // this.selectBlood = JSON.parse(securityService.getSelectBlood);
        console.log(securityService.getSelectBloodResult);
        this.router.navigate(["/bloodResultSelectTotal"]);
        this.demoLoader();
    }
    public onItemTapHPT(args) {
        this.loader.show(this.options);
        console.log("------------------------ ItemTapped: " + args.index);
        this.selectBloodResult.numberIndex = args.index ;
        this.selectBloodResult.nameTotal = this.HPT[args.index].namee + " ( " + this.HPT[args.index].namet + " )" ;
        this.selectBloodResult.name = this.HPT[args.index].namet ;
        securityService.setSelectBloodResult = JSON.stringify(this.selectBloodResult);
        // this.selectBlood = JSON.parse(securityService.getSelectBlood);
        console.log(securityService.getSelectBloodResult);
        this.router.navigate(["/bloodResultSelectTotal"]);
        this.demoLoader();
    }
    toBack () {
        console.log("connect");
        this.router.navigate(["/bloodResult"]);
    }
    showInfo (i, n) {
        console.log(i) ;
        console.log(n) ;
        this.info.numberIndex = i ;
        this.info.name = n ;
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
    private demoLoader() {
        setTimeout(() => {
          this.loader.hide();
        }, 1000);
      }
  
 }